import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-wm-shoes-u100',
  templateUrl: './wm-shoes-u100.component.html',
})
export class WmShoesU100Component implements OnInit {
  products: ProductModelServer[];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(2, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products.filter(prod => {
        return prod.price <= 100;
      })
      console.table(this.products)
    })  
  }

    selectProduct(id: Number) {
      return this.router.navigate(['/product', id]).then();
    }
}
