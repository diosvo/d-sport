import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  constructor(private http: HttpClient) { }

  /* PASSWORD */
  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  /* EMAIL */
  validateEmailNotTaken(control: AbstractControl) {
    return this.checkEmailNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { emailTaken: true };
      })
    );
  }

  checkEmailNotTaken(email: string) {
    return this.http.get('http://localhost:2609/api/users/validate/' + email).pipe(
      map((user: any[]) => Object.values(user).filter(user => user.email === email)
      ),
      map(users => !users.length));
  }
}