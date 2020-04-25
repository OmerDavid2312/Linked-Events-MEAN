import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getCategories():Observable<any>{
    return this.http.get(`${this.URL}/api/categories`);
  }
}
