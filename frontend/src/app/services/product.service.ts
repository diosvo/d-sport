import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) {
  }

  /* Get all products */
  getAllProducts() {                                 
    return this.http.get("http://localhost:1212/api/products")
  }
}
