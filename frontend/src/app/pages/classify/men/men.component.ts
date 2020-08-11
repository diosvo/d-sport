import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ServerResponse, ProductModelServer } from 'src/app/models/product.model';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})

export class MenComponent implements OnInit {
  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getMenProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mShoes() {
    this.productService.getProdFromClassifyIdCategoryId(1, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mTop() {
    this.productService.getProdFromClassifyIdCategoryId(1, 2).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mBottom() {
    this.productService.getProdFromClassifyIdCategoryId(1, 3).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mAcc() {
    this.productService.getProdFromClassifyIdCategoryId(1, 4).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }
}
