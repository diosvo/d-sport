import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ValidationService } from 'src/app/validators/validation.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group(
    {
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    },
    {
      validator: this.validation.passwordMatchValidator("password", "cfpassword")
    }
  );

  constructor(private fb: FormBuilder,
    private validation: ValidationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile');
      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }

    this.userService.loginUser(this.email.value, this.password.value)
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}