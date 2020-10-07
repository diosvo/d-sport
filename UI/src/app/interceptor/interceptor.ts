import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService,
        private toastr: ToastrService,
    ) { }

    accessTokenRefreshed: Subject<any> = new Subject();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.token.getAccessToken()

        if (accessToken) {
            req = this.addToken(req, accessToken);
        }
        return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
    }

    public handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 400) {
            this.toastr.warning('Incorrect email or password type.', 'Please, try again!', {
                timeOut: 2500,
                positionClass: 'toast-top-right',
                closeButton: true
            })
        }
        
        if (err.status === 401) {
            this.toastr.error('Your email or password is incorrect.', 'Please, try again!', {
                timeOut: 2500,
                positionClass: 'toast-top-right',
                closeButton: true
            })
        }

        if (err.status === 404) {
            this.toastr.error('Click "Join Us" below to register.', 'Email address does not exist.', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                closeButton: true
            })
        }

        return throwError(err);
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

export const AuthInterceptor = [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
]