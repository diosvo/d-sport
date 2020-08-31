import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { request } from 'http';

const TOKEN_HEADER_KEY = 'x-access-token'

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let authReq = req;
        const token = this.token.getToken()
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) })
        }
        return next.handle(authReq);
    }

}

export const AuthInterceptor = [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
]