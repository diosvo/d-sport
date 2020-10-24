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

  /* Get users for admin-user page */
  getUsers(numberOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/users', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }
}