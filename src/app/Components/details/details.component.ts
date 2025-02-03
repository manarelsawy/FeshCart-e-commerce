import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../Core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule , NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy {

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService =inject(ProductsService)

  detailsProduct : Iproduct | null  = null ;

  getSpecificSub ! : Subscription ;

 

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idProduct=  (p.get('id'))

         this.getSpecificSub = this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data)
            this.detailsProduct = res.data

          },
          error:(err)=>{
            console.log(err)
          }
        })

      }
    })
  }

  ngOnDestroy(): void {
    this.getSpecificSub?.unsubscribe()
  }

  productsSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true , 
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplayTimeout: 3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  
}

