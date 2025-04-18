import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/enviornment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    private readonly _HttpClient=inject(HttpClient);
    getAllBrands():Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
    }
    getSpecificBrand(id:string|null):Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`);
    }
}
