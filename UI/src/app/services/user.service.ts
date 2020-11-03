import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ServerResponse, UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<UserModelServer>;

  auth = false;
  private SERVER_URL = environment.SERVER_URL;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<UserModelServer | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService) { }

  registerUser(formData: any) {
    const { firstname, lastname, email, password, dob, cfpassword } = formData;

    return this.http.post(`${this.SERVER_URL}/auth/register`,
      { email, password, firstname, lastname, dob: dob || null },
      { responseType: 'text' }).subscribe()
  }

  loginUser(email: string, password: string) {
    return this.http.post<UserModelServer>(`${this.SERVER_URL}/auth/login`, { email, password }).pipe(
      map((data: UserModelServer) => {
        this.userData$.next(data)
        if (data && data.accessToken) {
          this.auth = data.auth
          this.tokenService.setSession(data.id, data.accessToken, data.refreshToken)
          this.authState$.next(this.auth)
          console.log(data);

        }
        return data
      }),
      catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe()
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
    this.tokenService.removeTokens()
    this.userData$.next(null)
    return this.http.post<any>(`${this.SERVER_URL}/logout`, {
      'refreshToken': this.tokenService.getRefreshToken()
    })
  }

  /* Get users for admin-user page */
  getUsers(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/users/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
  }

  
}