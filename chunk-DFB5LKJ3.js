import{a as T}from"./chunk-OHNC77NK.js";import{h as P}from"./chunk-6ZCYXRR4.js";import{m as D}from"./chunk-RR6JAF5F.js";import{Ab as u,Ib as c,Jb as y,Kb as _,Na as h,Pb as E,Ra as a,Rb as I,Vb as x,Xb as v,aa as b,da as g,ib as f,na as d,oa as p,ob as S,pb as k,qb as n,rb as r,sb as s,vb as w,zb as m}from"./chunk-FMPYM7VX.js";var F=(o,C)=>C._id,V=o=>["/orders",o];function $(o,C){if(o&1){let e=w();n(0,"div",5)(1,"div",7)(2,"div"),s(3,"img",8),r()(),n(4,"div",9)(5,"div")(6,"h3",10),c(7),r(),n(8,"p",11),c(9),x(10,"currency"),r(),n(11,"button",12),m("click",function(){let t=d(e).$implicit,l=u();return p(l.removeItem(t.product._id))}),s(12,"i",13),r()(),n(13,"div",14)(14,"span",15),m("click",function(){let t=d(e).$implicit,l=u();return p(l.updateCount(t.product._id,t.count+1))}),s(15,"i",16),r(),n(16,"span"),c(17),r(),n(18,"span",15),m("click",function(){let t=d(e).$implicit,l=u();return p(l.updateCount(t.product._id,t.count-1))}),s(19,"i",17),r()()()()}if(o&2){let e=C.$implicit;a(3),f("src",e.product.imageCover,h)("alt",e==null||e.product==null?null:e.product.title),a(4),_(" ",e.product.title,""),a(2),_("Price : ",v(10,5,e==null?null:e.price,"GBP"),""),a(8),y(e.count)}}var N=(()=>{class o{constructor(){this._CartService=b(T),this.cartDetails={}}ngOnInit(){this._CartService.getProductsCart().subscribe({next:e=>{console.log(e),this.cartDetails=e.data},error:e=>{console.log(e)}})}removeItem(e){this._CartService.deleteSpecificCartItem(e).subscribe({next:i=>{console.log(i),this.cartDetails=i.data,this._CartService.cartNum.set(i.numOfCartItems)},error:i=>{console.log(i)}})}updateCount(e,i){this._CartService.UpdateCartProductQuantity(e,i).subscribe({next:t=>{console.log(t),this.cartDetails=t.data},error:t=>{console.log(t)}})}clearItems(){this._CartService.clearCart().subscribe({next:e=>{console.log(e),e.message=="success"&&(this.cartDetails={},this._CartService.cartNum.set(0))},error:e=>{console.log(e)}})}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275cmp=g({type:o,selectors:[["app-cart"]],standalone:!0,features:[E],decls:13,vars:7,consts:[[1,"bg-main-light","rounded-4","shadow","p-4","my-2","w-75","mx-auto"],[1,"d-flex","justify-content-between","align-items-center"],[1,"h2"],[1,"btn","btn-outline-danger","btn-sm",3,"click"],[1,"text-main"],[1,"row","border-bottom","mb-1"],[1,"btn-main","mt-2",3,"routerLink"],[1,"col-md-1"],[1,"w-100",3,"src","alt"],[1,"col-md-11","d-flex","align-items-center","justify-content-between"],[1,"h5"],[1,"text-main","m-0"],[1,"text-danger","btn","p-0","cr",3,"click"],[1,"fa-solid","fa-trash-can"],[1,"d-flex","align-items-center","gap-2"],[1,"text-main","cr",3,"click"],[1,"fa-solid","fa-circle-plus","fa-2xl"],[1,"fa-solid","fa-circle-minus","fa-2xl"]],template:function(i,t){i&1&&(n(0,"section",0)(1,"div",1)(2,"h1",2),c(3,"Shop cart"),r(),n(4,"button",3),m("click",function(){return t.clearItems()}),c(5,"Clear Cart"),r()(),n(6,"p",4),c(7),x(8,"currency"),r(),S(9,$,20,8,"div",5,F),n(11,"button",6),c(12,"Orders"),r()()),i&2&&(a(7),_("Total Cart Price : ",v(8,2,t.cartDetails.totalCartPrice,"GBP"),""),a(2),k(t.cartDetails.products),a(2),f("routerLink",I(5,V,t.cartDetails._id)))},dependencies:[D,P]})}}return o})();export{N as CartComponent};
