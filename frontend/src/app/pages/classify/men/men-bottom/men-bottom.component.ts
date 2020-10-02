import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-men-bottom',
  templateUrl: './men-bottom.component.html',
})
export class MenBottomComponent implements OnInit {
  
  products: ProductModelServer[] = [];
  searchValue: string

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 3).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.table(this.products);
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
