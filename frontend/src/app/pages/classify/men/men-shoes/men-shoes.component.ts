import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-men-shoes',
  templateUrl: './men-shoes.component.html',
})
export class MenShoesComponent implements OnInit {

  products: ProductModelServer[];

  constructor(private productService: ProductService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.table(this.products)
    })
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }
}