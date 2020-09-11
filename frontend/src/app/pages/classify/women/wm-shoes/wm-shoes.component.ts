import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-wm-shoes',
  templateUrl: './wm-shoes.component.html',
})
export class WmShoesComponent implements OnInit {
  products: ProductModelServer[];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(2, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.table(this.products)
    })
  }
  
  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }
}