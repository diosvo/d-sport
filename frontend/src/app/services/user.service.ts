import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(formData: any) {
    const { fname, lname, email, password, dob, cfpassword } = formData;
    console.log(formData);
    return this.http.post('http://localhost:2609/api/auth/register', {
      email,
      password,
      fname: fname || null,
      lname: lname || null,
      dob: dob || null
    });
  }
}