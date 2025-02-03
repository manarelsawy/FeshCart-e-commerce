import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviuronments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    private readonly _HttpClient = inject(HttpClient)
    
    myHeaders : any = {token : localStorage.getItem('userToken')};

    checkOut(idCart : string | null , shippingDetails : object ):Observable<any>{
      return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${idCart}?url=${environment.URLserver}` , 
        {
          "shippingAddress": shippingDetails
        }
      ) ; 
    }
}
