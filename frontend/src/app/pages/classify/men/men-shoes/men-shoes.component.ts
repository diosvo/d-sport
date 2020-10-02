import { Component, OnInit } from '@angular/core';

import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Options } from 'src/app/models/option.model';

@Component({
  selector: 'app-men-shoes',
  templateUrl: './men-shoes.component.html',
})

export class MenShoesComponent implements OnInit {

  products: ProductModelServer[];
  searchValue: string
  selected: Number

  options: Options[] = [
    { id: 1, option: 'Price: Low-High' },
    { id: 2, option: 'Price: High-Low' },
  ]

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    })
  }

  selectOptions() {
    if (this.selected = 1) {
      this.products = this.products.sort((a, b) => a.price - b.price)
    } else this.products = this.products.sort((a, b) => b.price - a.price)
  }

  sortIncreasing() {
    // alert('hiiii');
    if(this.selected = 0) {
      this.products
    } else if(this.selected = 1) {
    this.products = this.products.sort((a, b) => a.price - b.price)
    } else this.products = this.products.sort((a, b) => b.price - a.price)
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