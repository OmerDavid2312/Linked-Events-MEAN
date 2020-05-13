import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  

  constructor(private http:HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get(`/api/categories`);
  }
}
