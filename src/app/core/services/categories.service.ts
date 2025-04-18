import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
private readonly HttpClient=inject(HttpClient);
getAllCategories():Observable<any>
{
  return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
}
getSpecificCategory(id:string|null):Observable<any>
{
  return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
}
}
