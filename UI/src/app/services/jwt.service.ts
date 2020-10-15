import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { UserModelServer } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class JwtService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) { }

  tokenStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('x-access-token', accessToken)
    localStorage.setItem('x-refresh-token', refreshToken)
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  setUser(user: UserModelServer) {
    localStorage.setItem('current-user', JSON.stringify(user))
  }

  getRefreshToken() {
    localStorage.getItem('x-refresh-token')
  }

  getNewAccessToken() {
    return this.http.post<any>(this.SERVER_URL + '/auth/refresh-token', {
      headers: {
        'x-refresh-token': this.getRefreshToken()
      }
    }).pipe(tap((res: HttpResponse<any>) => {
      this.setAccessToken(res.headers.get('x-access-token'))
    }))
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('x-access-token')
    if (token) {
      return true
    }
    return false
  }

  removeTokens() {
    localStorage.clear();
  }
}