import{s as n,x as e}from"./chunk-RR6JAF5F.js";import{$ as o,W as s,k as r}from"./chunk-FMPYM7VX.js";var m=(()=>{class i{constructor(t){this._HttpClient=t,this.wishCount=new r(0)}getWishList(){return this._HttpClient.get(`${e.baseURL}/api/v1/wishlist`)}addToWishList(t){return this._HttpClient.post(`${e.baseURL}/api/v1/wishlist`,{productId:t})}removeFromWishList(t){return this._HttpClient.delete(`${e.baseURL}/api/v1/wishlist/${t}`)}static{this.\u0275fac=function(a){return new(a||i)(o(n))}}static{this.\u0275prov=s({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{m as a};
