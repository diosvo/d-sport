import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServerResponse } from '../models/user.model';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAllProduct(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
  }

  getUsers(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/users/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
  }

  deleteUser(userId){
    return this.http.delete(this.SERVER_URL + '/users/' + userId)
  }

  createUser(user){
    return this.http.post(this.SERVER_URL + '/users/create', { user })
  }

  updateUser(user){
    return this.http.post(this.SERVER_URL + '/users/update', { user })
  }
}