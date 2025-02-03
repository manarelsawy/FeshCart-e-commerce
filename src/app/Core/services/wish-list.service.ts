import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../enviuronments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {


  constructor(private _HttpClient: HttpClient) {}

  wishCount: BehaviorSubject<any> = new BehaviorSubject(0);

  getWishList(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseURL}/api/v1/wishlist`
    );
  }

  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }

  removeFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseURL}/api/v1/wishlist/${id}`
    );
  }
}
