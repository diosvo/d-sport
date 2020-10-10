import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<UserModelServer>;

  auth = false;
  // auth: Boolean
  private SERVER_URL = environment.SERVER_URL;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<UserModelServer>(null);

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private router: Router) {

  }

  getUserValue()  {
    this.userData$.getValue()
  }

  registerUser(formData: any) {
    const { firstname, lastname, email, password, dob, cfpassword } = formData;

    return this.http.post(`${this.SERVER_URL}/auth/register`,
      { email, password, firstname, lastname, dob: dob || null },
      { responseType: 'text' }).subscribe()
  }

  loginUser(email: string, password: string) {
    return this.http.post<UserModelServer>(`${this.SERVER_URL}/auth/login`, { email, password }).pipe(
      map((data: UserModelServer) => {
        this.spinner.show()
        this.userData$.next(data)
        if (data && data.accessToken) {
          this.auth = data.auth

          this.tokenService.setSession(data)
          this.tokenService.setData(data.id, data.accessToken)

          this.userData$.next(data)
          this.authState$.next(data.auth)
          return data;
        }
      }),
      catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe()
  }

  logout() {
    this.spinner.hide()
    // this.authState$.next(false)
    this.tokenService.removeTokens()
    this.userData$.next(null)
    this.router.navigate(['/login'])
    return this.http.post<any>(`${this.SERVER_URL}/logout`, {
      'refreshToken': this.tokenService.getRefreshToken()
    })
  }
}