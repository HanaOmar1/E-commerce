import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  step:number=1;
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);

  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required])
  })
  verifyCode:FormGroup=new FormGroup({
    resetCode: new FormControl(null, [Validators.pattern(/^[0-9]{6}$/), Validators.required])
  })
  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })
  verifyEmailSubmit():void
  {
    //a get el value of email ashan ab3atha f form rakam 3 ashan maye3rafsh yekteb haga tanya
    let emailValue=this.verifyEmail.get('email')?.value; //i got the value of the email
    this.resetPassword.get('email')?.patchValue(emailValue);
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg==='success')
        {
          this.step=2;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  verifyCodeSubmit():void{
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status==="Success")
        {
          this.step=3;
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }
  resetPasswordSubmit():void{
    this._AuthService.setresetPassowrd(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
       localStorage.setItem('userToken',res.token);
       this._AuthService.saveUserData();
       this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
      }
  })

}
}
