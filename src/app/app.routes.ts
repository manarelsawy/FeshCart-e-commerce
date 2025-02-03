import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './Core/guards/auth.guard';
import { logedGuard } from './Core/guards/loged.guard';
export const routes: Routes = [
    {path:'' , component:AuthLayoutComponent , canActivate:[logedGuard] ,
        children:[
        {path:'' , redirectTo:'login' , pathMatch:'full'},
        {path:'login', loadComponent:()=> import('./Components/login/login.component').then((c)=> c.LoginComponent)},
        {path:'register', loadComponent:()=> import('./Components/register/register.component').then((c)=> c.RegisterComponent)},
        {path:'forgot', loadComponent:()=> import('./Components/forgotpassword/forgotpassword.component').then((c)=> c.ForgotpasswordComponent)}
    ]},
    {path:'' , component:BlankLayoutComponent , canActivate:[authGuard] ,
        children:[
        {path:'' , redirectTo:'home' , pathMatch:'full'},
        {path:'home', loadComponent:()=> import('./Components/home/home.component').then((c)=> c.HomeComponent) },

        {path:'product', loadComponent:()=> import('./Components/product/product.component').then((c)=> c.ProductComponent)},
        {path:'cart', loadComponent:()=> import('./Components/cart/cart.component').then((c)=> c.CartComponent)},
        {path:'wish', loadComponent:()=> import('./Components/wish-list/wish-list.component').then((c)=> c.WishListComponent)},
        {path:'brands', loadComponent:()=> import('./Components/brands/brands.component').then((c)=> c.BrandsComponent)},
        {path:'categories', loadComponent:()=> import('./Components/categories/categories.component').then((c)=> c.CategoriesComponent)},
        {path:'details/:id', loadComponent:()=> import('./Components/details/details.component').then((c)=> c.DetailsComponent)},
        {path:'allorders', loadComponent:()=> import('./Components/all-orders/all-orders.component').then((c)=> c.AllOrdersComponent)},
        {path:'orders/:id', loadComponent:()=> import('./Components/orders/orders.component').then((c)=> c.OrdersComponent)}
    ]},
    {path:'**', loadComponent:()=> import('./Components/notfound/notfound.component').then((c)=> c.NotfoundComponent)}
];
