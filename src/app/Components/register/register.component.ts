import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

    private readonly _AuthService = inject(AuthService);
    private readonly _FormBuilder= inject(FormBuilder);
    private readonly _Router = inject(Router);

    msgError:string="";
    msgSuccess:boolean=false;
    isLoading:boolean=false;

    resgisterFrom:FormGroup = this._FormBuilder.group( {
      name:[null ,[Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]] ,
      email:[null ,[Validators.required , Validators.email]] ,
      phone:[null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]] , 
      password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]] ,
      rePassword:[null] ,

    }, {validators: this.confirmPassword})


  // resgisterFrom:FormGroup = new FormGroup({
    
  //   name:new FormControl(null, [Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]),

  //   email:new FormControl(null, [Validators.required , Validators.email]),

  //   password: new FormControl(null, [Validators.required , Validators.pattern(/^\w{6,}$/)]),

  //   rePassword: new FormControl(null),

  //   phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])

  // } , this.confirmPassword);


    registerSub ! : Subscription;

  registerSubmit():void
  {
    if(this.resgisterFrom.valid){

      this.isLoading=true;

          this.registerSub = this._AuthService.setRegisterForm(this.resgisterFrom.value).subscribe({
        next:(res)=>{
          console.log(res)
          if( res.message === 'success'){
            this.msgSuccess=true;
            setTimeout(()=>{
              this._Router.navigate(['/login'])
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
      this.resgisterFrom.setErrors({mismatch:true})
      this.resgisterFrom.markAllAsTouched()
    }
    
  }
    
    ngOnDestroy():void{
      this.registerSub?.unsubscribe()
    }

  

  confirmPassword(g: AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){


      return null 

    }
    else{
      return{mismatch:true}
    }
  }

}
