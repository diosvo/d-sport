import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      email: ["", [Validators.required], [this.validation.validateEmailNotTaken.bind(this.validation)]],
      password: ["", [Validators.required]],
      cfpassword: ["", [Validators.required]],
      fname: [""],
      lname: [""],
      dob: [""],
    },
    {
      validator: this.validation.passwordMatchValidator("password", "cfpassword")
    }
  );

  constructor(private fb: FormBuilder, private validation: ValidationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value);
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
}