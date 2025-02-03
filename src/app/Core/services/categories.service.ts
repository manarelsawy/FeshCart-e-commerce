import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../enviuronments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient)
  
  getAllCategories():Observable<any>{
   return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }

  getSpecificCategory(id:string):Observable<any>{
   return this._HttpClient.get(`${environment.baseURL}/api/v1/categories/${id}`)
  }
}
