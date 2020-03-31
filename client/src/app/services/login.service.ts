import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  selectedLogin: Login;
  logins: Login[];
  readonly URL_API = 'http://localhost:3000/users/login';
  constructor(private http: HttpClient) {
     this.selectedLogin = new Login();
   }

   postLogin(login : Login){
     return this.http.post(this.URL_API, login);
   }

}
