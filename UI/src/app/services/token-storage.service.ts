import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private SERVER_URL = environment.SERVER_URL;
  redirectUrl: string;
  constructor(private http: HttpClient) { }

  setData(userId: number, accessToken: string) {
    localStorage.setItem('user-id', JSON.stringify(userId));
    localStorage.setItem('x-access-token', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUser() {
    return localStorage.getItem('user-id');
  }

  refreshToken() {
    return this.http.post<any>(`${this.SERVER_URL}/refresh-token`, {
      'refreshToken': this.getRefreshToken()
    })
  }

  removeTokens() {
    window.localStorage.clear();
  }

  setSession(data) {
    return localStorage.setItem('current-user', JSON.stringify(data))
  }

  getSession() {
    return JSON.parse(localStorage.getItem('current-user')); // get current user
  }

  isAuthenticated(): boolean {
    if (this.getAccessToken()) {
      return true
    } else {
      return false
    }
  }
}