
import { Component, inject, OnDestroy, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/services/categories.service';
import { ICategory } from '../../Core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../Core/pipes/term-text.pipe';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../Core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink , SearchPipe , FormsModule , TermTextPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit , OnDestroy {
    private readonly _ProductsService = inject(ProductsService)
    private readonly _CategoriesService = inject(CategoriesService)
    private readonly _CartService =inject(CartService)
    private readonly _ToastrService =inject(ToastrService)
    private readonly _NgxSpinnerService =inject(NgxSpinnerService)
    private readonly _WishListService =inject(WishListService)
    private readonly _Renderer2 =inject(Renderer2)



    ProductsList:WritableSignal<Iproduct[]> =signal([]);
    categoriesList:WritableSignal<ICategory[]> =signal([]);

    text : string = "";
    limit! : number ;


    getAllProductSub !:Subscription ;
    

    customOptionsMain: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      rtl:true,
      autoplayTimeout: 3000,
      autoplayHoverPause:true,
      autoplay:true,
      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: false
    }


    customOptionsCat: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      rtl:true,
      autoplayTimeout: 3000,
      autoplayHoverPause:true,
      autoplay:true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      items:1 ,
      nav: true
    }


    ngOnInit(): void {
        this._NgxSpinnerService.show('loading-3')
        this._CategoriesService.getAllCategories().subscribe({

          next:(res)=>{
            console.log(res.data)
            this.categoriesList.set(res.data)
            this._NgxSpinnerService.hide('loading-3')
          },
          error:(err)=>{
            console.log(err)
          }
        })

        this.getAllProductSub=  this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.ProductsList.set(res.data)
        },
        error:(err)=>{
          console.log(err)
        }

      })
      
    }

    ngOnDestroy(): void {
      this.getAllProductSub?.unsubscribe()
      

    }

    addCart(id:string):void{
      this._CartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res)
          this._ToastrService.success(res.message , 'Fresh Cart')
          this._CartService.cartNum.set(res.numOfCartItems)

          console.log(this._CartService.cartNum())
          
        
          
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }



    
  addWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._WishListService.wishCount.next(response.data.length);
        this._ToastrService.success(response.message);
        this._Renderer2.addClass(addWishBtn, 'd-none');
        this._Renderer2.removeClass(removeWishBtn, 'd-none');
      },
    });
  }

  removeWish(
    id: string,
    addWishBtn: HTMLDivElement,
    removeWishBtn: HTMLDivElement
  ): void {
    this._WishListService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(
          'Product removed successfully from your wishlist'
        );

        this._WishListService.wishCount.next(response.data.length);

        this._Renderer2.addClass(removeWishBtn, 'd-none');
        this._Renderer2.removeClass(addWishBtn, 'd-none');
      },
    });
  }
    

}
