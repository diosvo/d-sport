import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<UserModelServer | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  registerUser(formData: any) {
    const { firstname, lastname, email, password, dob, cfpassword } = formData;

    return this.http.post(`${this.SERVER_URL}/auth/register`, {
      email,
      password,
      firstname: firstname || null,
      lastname: lastname || null,
      dob: dob || null
    })
  }

  loginUser(email: string, password: string) {
    this.http.post<UserModelServer>(`${this.SERVER_URL}/auth/login`, { email, password })
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: UserModelServer) => {
        this.auth = data.auth;
        this.tokenStorageService.setSession(data.id, data.accessToken, data.refreshToken)

        this.authState$.next(this.auth);
        this.userData$.next(data);
      })
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
    return this.http.post<any>(`${this.SERVER_URL}/logout`, {
      'refreshToken': this.tokenStorageService.getRefreshToken()
    })
  }
}