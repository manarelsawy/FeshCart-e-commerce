import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviuronments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 private readonly _HttpClient=inject(HttpClient)
 private readonly _Router = inject(Router)
 
userData:any;

 setRegisterForm(data:object):Observable<any>
 {
  
   return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`, data)
 }

 setLoginForm(data:object):Observable<any>
 {
  
   return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`, data)
 }

 saveUserData():void{

  if(localStorage.getItem('userToken') !== null){
      // let usertoken:any = localStorage.getItem('userToken')
     jwtDecode(localStorage.getItem('userToken')!)
  }
}
logout():void{
  localStorage.removeItem('userToken')
   this.userData=null;
    this._Router.navigate(['/login'])
}

setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data)
}
setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data)
}
setResetPass(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
}
}
