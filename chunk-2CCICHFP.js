import{s as n,x as e}from"./chunk-RR6JAF5F.js";import{W as r,aa as o}from"./chunk-FMPYM7VX.js";var m=(()=>{class t{constructor(){this._HttpClient=o(n)}getAllCategories(){return this._HttpClient.get(`${e.baseURL}/api/v1/categories`)}getSpecificCategory(i){return this._HttpClient.get(`${e.baseURL}/api/v1/categories/${i}`)}static{this.\u0275fac=function(a){return new(a||t)}}static{this.\u0275prov=r({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{m as a};
