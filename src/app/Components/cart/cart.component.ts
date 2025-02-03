

import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ICart } from '../../Core/interfaces/icart';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
    private readonly _CartService = inject(CartService)
    
    cartDetails  : ICart = {} as ICart ;


    ngOnInit(): void {
      this._CartService.getProductsCart().subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data
          
        },
        error:(err)=>{
          console.log(err)

        }
      })
    }

    removeItem(id:string):void{
      this._CartService.deleteSpecificCartItem(id).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data
          this._CartService.cartNum.set(res.numOfCartItems)
        },
        error:(err)=>{
        console.log(err)
          
        }
      })

    }

    updateCount(id:string , count:number):void{

      this._CartService.UpdateCartProductQuantity(id , count).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

    clearItems():void{
      this._CartService.clearCart().subscribe({
        next:(res)=>{
          console.log(res)
          if(res.message == 'success'){
            this.cartDetails = {} as ICart
            this._CartService.cartNum.set(0)
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
}
