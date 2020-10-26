import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private SERVER_URL = environment.SERVER_URL;

  private userSubject: BehaviorSubject<UserModelServer>;
  public user: Observable<UserModelServer>

  private authState: BehaviorSubject<boolean>;
  public auth: Observable<boolean>

  constructor(private http: HttpClient,
    private token: JwtService,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.userSubject = new BehaviorSubject<UserModelServer>(JSON.parse(localStorage.getItem('current-user')))
    this.user = this.userSubject.asObservable()

    this.authState = new BehaviorSubject<boolean>(this.token.isLoggedIn())
    this.auth = this.authState.asObservable()
  }

  public get userValue(): UserModelServer {
    return this.userSubject.value;
  }

  registerUser(formData: any) {
    const { firstname, lastname, email, dob, password, cfpassword } = formData;

    return this.http.post(`${this.SERVER_URL}/auth/register`,
      { email, password, firstname, lastname, dob: dob || null },
      { responseType: 'text' })
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>(`${this.SERVER_URL}/auth/login`, { email, password })
      .pipe(
        map((user: UserModelServer) => {
          this.spinner.show()
          if (user && user.accessToken) {
            this.token.tokenStorage(user.accessToken, user.refreshToken)
            this.token.setUser(user)
            this.userSubject.next(user)
            this.authState.next(true)
            window.location.reload()
          }
          return user
        })
      )
  }

  logout() {
    this.spinner.hide()
    this.token.removeTokens()
    this.userSubject.next(null)

    window.location.reload()
    this.router.navigate(['/login'])
  }
}