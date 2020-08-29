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
  loginMessage$ = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) { }

  registerUser(formData: any) {
    const { firstname, lastname, email, password, dob, cfpassword } = formData;
    
    return this.http.post(`${this.SERVER_URL}/auth/register`, {
      email,
      password,
      firstname: firstname || null,
      lastname: lastname || null,
      dob: dob || null
    }).subscribe((data: UserModelServer) => {
      this.tokenStorageService.saveToken(data.token)
      this.tokenStorageService.saveUser(data)
    })
  }

  loginUser(email: string, password: string) {
    this.http.post(`${this.SERVER_URL}/auth/login`, { email, password })
      .subscribe((data: UserModelServer) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);

        this.tokenStorageService.saveToken(data.token)
        this.tokenStorageService.saveUser(data)
      })
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
  }
}