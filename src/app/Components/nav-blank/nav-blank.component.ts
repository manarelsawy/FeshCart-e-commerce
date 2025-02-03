import { WishListService } from './../../Core/services/wish-list.service';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../Core/services/mytranslate.service';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
 readonly _AuthService = inject(AuthService)
 private readonly _MytranslateService = inject(MytranslateService)
  readonly _TranslateServic = inject(TranslateService)
  readonly _CartService = inject(CartService)
  readonly _WishListService = inject(WishListService)

  wishCountNumber: number = 0;


 countNum = computed(()=> this._CartService.cartNum())

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        console.log('cartItems',res)
        this._CartService.cartNum.set(res.numOfCartItems)
      }
    })

    this._WishListService.wishCount.subscribe({
      next: (count) => {
        this.wishCountNumber = count;
      },
    });




  //  this._CartService.cartNum.subscribe({
  //   next:(data)=>{
  //     this.countNum = data ;
  //   }
  //  }) ;
    
  }

 change(lang : string):void{
    this._MytranslateService.changeLang(lang)
 }


}

