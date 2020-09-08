import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModelServer } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;

  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<UserModelServer | object>(null);

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
    }).subscribe((data: UserModelServer) => {
      this.tokenStorageService.setSession(data.id, data.accessToken, data.refreshToken)
    })
  }

  loginUser(email: string, password: string) {
    this.http.post<UserModelServer>(`${this.SERVER_URL}/auth/login`, { email, password })
      .subscribe((data: UserModelServer) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);

        this.tokenStorageService.setSession(data.id, data.accessToken, data.refreshToken)
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