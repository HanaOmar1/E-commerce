import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);
  msgError:string="";
  msgSuccess:boolean=false;
  isLoading:boolean=false;
  registerSub!:Subscription;
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]

  },{validators:this.confirmPassword})

  // registerForm:FormGroup=new FormGroup({
  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword:new FormControl(null),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // },this.confirmPassword);

registerSubmit():void
{
  if(this.registerForm.valid)
  {
    this.isLoading=true;
    this.registerSub=this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next:(res)=> {
        console.log(res);
        if(res.message=='success')
        {
          this.msgSuccess=true;
          setTimeout(()=>
          {
            this._Router.navigate(['/login']);
          },1000)

        }
        this.isLoading=false;
      },
      error:(err:HttpErrorResponse)=> {
        this.msgError=err.error.message;
        console.log(err);
        this.isLoading=false;
      },
    })
    console.log(this.registerForm.value);
  }
  else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched();
  }
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.registerSub?.unsubscribe();
}
confirmPassword(g:AbstractControl)
{
 if(g.get('password')?.value===g.get('rePassword')?.value)
 {
  return null; //no error
 }
 else{
  return {mismatch:true}
 }
}
// ngOnInit(): void {
//   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//   //Add 'implements OnInit' to the class.
//   // this.registerForm.patchValue({
//   //   name:
//   // })
// }

}
