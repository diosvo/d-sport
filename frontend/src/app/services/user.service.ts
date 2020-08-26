import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators/catchError';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<UserModelServer | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  registerUser(formData: any) {
    const { firstname, lastname, email, password, dob, cfpassword } = formData;
    
    return this.http.post(`${this.SERVER_URL}/auth/register`, {
      email,
      password,
      firstname: firstname || null,
      lastname: lastname || null,
      dob: dob || null
    });
  }

  loginUser(formData) {
    const {email, password} = formData;

    this.http.post<UserModelServer>(`${this.SERVER_URL}/auth/login`, { email, password })
      .subscribe((data: UserModelServer) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      }
      )
  }
}