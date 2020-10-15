import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, empty } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private token: JwtService) { }
    refreshingAccessTokens: boolean

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('x-access-token')
        if (accessToken) {
            request = this.addToken(request, accessToken)
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401 && !this.refreshingAccessTokens) {
                    // 401 Authorization
                    // Refresh the access token
                    return this.refreshAccessToken()
                        .pipe(
                            switchMap(() => {
                                request = this.addToken(request, accessToken)
                                return next.handle(request)
                            }),
                            catchError((error: any) => {
                                this.authService.logout()
                                return empty()
                            })
                        )
                }
                return throwError(error)
            })
        )
    }

    private refreshAccessToken() {
        this.refreshingAccessTokens = true
        return this.token.getNewAccessToken().pipe(
            tap(() => {
                this.refreshingAccessTokens = false
                console.log('Access token is refreshed')
            })
        )
    }

    private addToken(request: HttpRequest<any>, token: string) {
        if (token) {
            return request.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }

    }
}