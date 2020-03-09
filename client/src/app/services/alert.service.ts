import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  selectedAlert: Alert;
  users: Alert[];
  readonly URL_API = 'http://localhost:3000/alerts';
  constructor(private http: HttpClient) {
    this.selectedAlert = new Alert();
   }

     // GET Data from the server alerts

  getUsers() {
    return this.http.get(this.URL_API);
    
  }
  postUser(Alert: Alert){
    return this.http.post(this.URL_API, Alert);
  }

  putUser(alert: Alert){
    return this.http.put(this.URL_API + `/${alert._id}`, alert);
  }
  deleteUser(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
