import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../enviuronments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartNum:WritableSignal<number> = signal(0) ;
  


    constructor(private  _HttpClient : HttpClient){
        effect(()=>{
          localStorage.setItem('cartItem' , this.cartNum().toString())
        })
    }  
   
  myHeaders : any = {token : localStorage.getItem('userToken')};

  addProductToCart(id:string):Observable<any>{
      
    let data = {
      "productId": id ,
    }

    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart` , data 
    );
  }

  getProductsCart():Observable<any>{
    
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart` 
    ) ;
  }
  
  deleteSpecificCartItem(id : string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${id}` 
    ) ;
  }

  UpdateCartProductQuantity(id: string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${id}` ,
      {
        "count" : newCount
      }
    ) ;
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart` 
    ) ;
  }
}
