import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  setSession(userId: number, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', JSON.stringify(userId));
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);

    console.log('User ID: ', JSON.stringify(userId))
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
}