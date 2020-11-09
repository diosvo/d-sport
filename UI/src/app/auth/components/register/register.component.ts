import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from 'src/app/services/validation.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group(
    {
      email: ['', Validators.required, [this.validation.emailValidate()]],
      password: ['', Validators.required],
      cfpassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: [''],
    },
    {
      validator: this.validation.passwordMatchValidator("password", "cfpassword")
    }
  );

  constructor(private fb: FormBuilder,
    private validation: ValidationService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private token: JwtService) { }

  ngOnInit(): void {
    let isLoggedIn = this.token.isLoggedIn()
    if (isLoggedIn) {
      this.router.navigate(['/'])
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.registerUser(this.registerForm.value).subscribe()
    this.toastr.success('Register Successfully!', '', {
      timeOut: 2000,
      positionClass: 'toast-top-left',
    })

    this.router.navigate(['/login']).then();
    this.registerForm.reset();
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get cfpassword() {
    return this.registerForm.get('cfpassword')
  }

  get firstname() {
    return this.registerForm.get('firstname')
  }

  get lastname() {
    return this.registerForm.get('lastname')
  }
}