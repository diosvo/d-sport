import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
    }

    public handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 400) {
            this.toastr.warning('Incorrect email type.', 'Please, try again!', {
                timeOut: 2500,
                positionClass: 'toast-top-right',
                closeButton: true
            })
        }

        if (err.status === 401) {
            this.toastr.error('Please, try again!', 'Password incorrect.', {
                timeOut: 3000,
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
}