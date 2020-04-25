import { AuthData } from './../models/Auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';
  
  constructor(private http:HttpClient) { }

  registerUser(user:AuthData):Observable<any>{
    return this.http.post<any>(`${this.URL}/api/users/register`,user);
  }

  loginUser(user:AuthData):Observable<any> {
    return this.http.post<any>(`${this.URL}/api/users/login`,user);
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout():void{
     localStorage.removeItem('token');
     localStorage.removeItem('user');
  }
  

  //TODO
  //remove auth with EXPIRE TIME !!!!!!
}
