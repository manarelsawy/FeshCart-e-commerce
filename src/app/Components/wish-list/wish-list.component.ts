
import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../Core/services/wish-list.service';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NgIf , RouterLink , NgFor ,CurrencyPipe ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  constructor(
    private _WishlistService: WishListService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ){}

  wishlistData: Iproduct[] = [];
  
  isEmpty: boolean = true;

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        this.wishlistData = res.data ;
      
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (response) => {
        this._CartService.cartNum.set(response.numOfCartItems);
        this._ToastrService.success(response.message);
      },
    });
  }

  removeWish(id: string): void {
    this._WishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._WishlistService.getWishList().subscribe({
          next: ({ data }) => {
            if (data.length == 0) {
              this.isEmpty = true;
            } else {
              this.wishlistData = data;
              this.isEmpty = false;
            }
          },
        });

        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishlistService.wishCount.next(response.data.length);

        if (response.data.length == 0) {
          this.isEmpty = true;
        }
      },
    });
  }
}
