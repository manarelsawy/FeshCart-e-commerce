import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


   private readonly _AuthService = inject(AuthService);
      private readonly _FormBuilder= inject(FormBuilder);
      private readonly _Router = inject(Router);
  
      msgError:string="";
      msgSuccess:boolean=false;
      isLoading:boolean=false;
      
  
      loginFrom:FormGroup = this._FormBuilder.group( {
        
        email:[null ,[Validators.required , Validators.email]] , 
        password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]] ,
        
  
      })
  
  
    // loginFrom:FormGroup = new FormGroup({
      
    //   name:new FormControl(null, [Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]),
  
    //   email:new FormControl(null, [Validators.required , Validators.email]),
  
    //   password: new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  
    //   rePassword: new FormControl(null),
  
    //   phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  
    // } , this.confirmPassword);
  
  
    loginSubmit():void
    {
      if(this.loginFrom.valid){
  
        this.isLoading=true;
  
        this._AuthService.setLoginForm(this.loginFrom.value).subscribe({
          next:(res)=>{
            console.log(res)
            if( res.message === 'success'){
              this.msgSuccess=true;
              setTimeout(()=>{
                localStorage.setItem('userToken' , res.token);

                  this._AuthService.saveUserData()

                this._Router.navigate(['/home'])
              }, 2000);
              
  
            }
            this.isLoading=false;
          },
          error:(err:HttpErrorResponse)=>{
  
            this.msgError = err.error.message;
  
            console.log(err)
  
            this.isLoading=false;
          }
          
        })
      
      }  else {
        this.loginFrom.setErrors({mismatch:true})
        this.loginFrom.markAllAsTouched()
      }
      
    }

    
  
  

}
