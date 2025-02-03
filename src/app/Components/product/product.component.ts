import { Component, computed, inject, NgModule, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { ProductsService } from '../../Core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule} from '@angular/forms';
import { TermTextPipe } from '../../Core/pipes/term-text.pipe';
import { CategoriesService } from '../../Core/services/categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICategory } from '../../Core/interfaces/icategory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink  , RouterLink , SearchPipe , FormsModule , TermTextPipe ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService)
      private readonly _CategoriesService = inject(CategoriesService)
      private readonly _CartService =inject(CartService)
      private readonly _ToastrService =inject(ToastrService)
      private readonly _NgxSpinnerService =inject(NgxSpinnerService)
  
  
      ProductsList:WritableSignal<Iproduct[]> =signal([]);
      categoriesList:WritableSignal<ICategory[]> =signal([]);
  
      text : string = "";
      limit! : number ;
  
  
      getAllProductSub !:Subscription ;

  // private readonly _CartService = inject(CartService)
  // private readonly _ProductsService = inject(ProductsService)
  // private readonly _ToastrService = inject(ToastrService)
  // private readonly _Renderer2 = inject(Renderer2)

  // ProductsList:WritableSignal<Iproduct[]> =signal([]);
  // inputTerm:WritableSignal<string> = signal('');
  // pageSize:WritableSignal<number> = signal(0);
  // page: WritableSignal<number> = signal(1);
  // total:WritableSignal<number> = signal(0);
  // text : string = "";


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

countNum = computed(()=> this._CartService.cartNum())

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


  // ngOnInit(): void {
  //   this._ProductsService.getAllProducts().subscribe({
  //     next: (response) => {
  //       this.ProductsList.set(response.data) ;
  //       this.pageSize.set(response.metadata.limit);
  //       this.page.set(response.metadata.currentPage) ;
  //       this.total.set(response.results) ;
  //     },
  //   });
  // }



  // pageChanged(): void {
  //   this._ProductsService.getAllProducts().subscribe({
  //     next: (response) => {
  //       this.ProductsList.set(response.data) ;
  //       this.pageSize.set(response.metadata.limit);
  //       this.page.set(response.metadata.currentPage) ;
  //       this.total.set(response.results) ;


  //       // this.productsData = response.data;
  //       // this.pageSize = response.metadata.limit;
  //       // this.page = response.metadata.currentPage;
  //       // this.total = response.results;
  //     },
  //   });
  // }


  // addCart(id: string): void {
  //   this._CartService.addProductToCart(id).subscribe({
  //     next: (response) => {
  //       this._CartService.cartNum.set(response.numOfCartItems);
  //       this._ToastrService.success(response.message);
  //     },
  //   });
  // }


}
