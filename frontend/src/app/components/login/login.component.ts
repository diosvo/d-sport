import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

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
  
  constructor(private fb: FormBuilder, private validation: ValidationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
}