import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myHeader:any={token:localStorage.getItem('userToken')};
  constructor(private _HttpClient: HttpClient) { }
  checkOut(cartId:string|null,shippingDetails:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}`,
      {
        "shippingAddress":shippingDetails
      }
      
    )
  }
  getUserOrder(userID:string|null):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userID}`)
  }
}
