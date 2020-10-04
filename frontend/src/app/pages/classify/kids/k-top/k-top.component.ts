import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-k-top',
  templateUrl: './k-top.component.html',
})
export class KTopComponent implements OnInit {
  
  products: ProductModelServer[] = [];
  searchValue: string
  p: number = 1

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(3, 2).subscribe((prods: ServerResponse) => {
      this.products = prods.products
    })
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
