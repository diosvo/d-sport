import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { ValidationService } from 'src/app/validators/validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginMessage: string;

  loginForm = this.fb.group(
    {
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    },
    {
      validator: this.validation.passwordMatchValidator("password", "cfpassword")
    }
  );

  constructor(private fb: FormBuilder, private validation: ValidationService, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value)
    this.loginForm.reset();
    this.userService.loginUser(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}