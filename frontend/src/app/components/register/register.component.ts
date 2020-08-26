import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/validators/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationMessage: string;

  registerForm = this.fb.group(
    {
      email: ["", [Validators.required], [this.validation.emailValidate()]],
      password: ["", [Validators.required]],
      cfpassword: ["", [Validators.required]],
      firstname: [""],
      lastname: [""],
      dob: [""],
    },
    {
      validator: this.validation.passwordMatchValidator("password", "cfpassword")
    }
  );

  constructor(private fb: FormBuilder,
    private validation: ValidationService,
    private userService: UserService,
    private router: Router) { }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // @ts-ignore
    this.userService.registerUser({ ...this.registerForm.value }).subscribe((response: { message: string }) => {
      this.registrationMessage = response.message;
    });
    
    console.log(this.registerForm.value);
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

  ngOnInit(): void {
  }
}