import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../environments/enviornment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private readonly _HttpClient=inject(HttpClient);
 private readonly _Router=inject(Router);
//  baseUrl:string="https://ecommerce.routemisr.com";
userData:any=null;

 setRegisterForm(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
 }
 setloginForm(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
 }
 saveUserData():void{
  if(localStorage.getItem('userToken')!==null)
  {
    this.userData= jwtDecode(localStorage.getItem('userToken')!)
    console.log('userData',this.userData);
  }

 }
 logOut():void{
  localStorage.removeItem('userToken');
  this.userData=null;
  this._Router.navigate(['/login'])
 }

 setEmailVerify(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
 }
 setCodeVerify(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
 }
 setresetPassowrd(data:object):Observable<any>
 {
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
 }
  // constructor(private _HttpClient:HttpClient) {

  //  }
}
