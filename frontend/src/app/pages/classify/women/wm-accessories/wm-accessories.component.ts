import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
@Component({
  selector: 'app-wm-accessories',
  templateUrl: './wm-accessories.component.html',
})
export class WmAccessoriesComponent implements OnInit {

  products: ProductModelServer[] = [];
  searchValue: string
  p: number = 1

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(2, 3).subscribe((prods: ServerResponse) => {
      this.products = prods.products
    })
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }

  searchProduct() {
    if(this.searchValue != "") {
      this.products = this.products.filter(res => {
        return res.title.toLowerCase().match(this.searchValue.toLowerCase())
      })
    } else if(this.searchValue == "") {
      this.ngOnInit()
    }
  }
}
