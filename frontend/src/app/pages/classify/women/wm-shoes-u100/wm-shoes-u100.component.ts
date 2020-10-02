import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-wm-shoes-u100',
  templateUrl: './wm-shoes-u100.component.html',
})
export class WmShoesU100Component implements OnInit {

  products: ProductModelServer[];
  searchValue: string

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(2, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products.filter(prod => {
        return prod.price <= 100;
      })
      console.table(this.products)
    })
  }

  searchProduct() {
    if (this.searchValue != "") {
      this.products = this.products.filter(res => {
        return res.title.toLowerCase().match(this.searchValue.toLowerCase())
      })
    } else if (this.searchValue == "") {
      this.ngOnInit()
    }
  }
}
