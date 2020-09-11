import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-men-top',
  templateUrl: './men-top.component.html',
})
export class MenTopComponent implements OnInit {
  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 2).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.table(this.products);
    })
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }
}