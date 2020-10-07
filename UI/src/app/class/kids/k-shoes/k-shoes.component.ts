import { Component, OnInit } from '@angular/core';

import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Options } from 'src/app/models/option.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-k-shoes',
  templateUrl: './k-shoes.component.html',
})
export class KShoesComponent implements OnInit {

  products: ProductModelServer[];
  searchValue: string
  selected: Number
  p: number = 1 // current page

  options: Options[] = [
    { id: 1, option: 'Price: Low-High' },
    { id: 2, option: 'Price: High-Low' },
  ]

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(3, 1).subscribe((prods: ServerResponse) => {
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
    if (this.selected = 0) {
      this.products
    } else if (this.selected = 1) {
      this.products = this.products.sort((a, b) => a.price - b.price)
    } else this.products = this.products.sort((a, b) => b.price - a.price)
  }

  searchProduct() {
    if (this.searchValue != "") {
      if (this.products.length > 0) {
        this.products = this.products.filter(res => {
          return res.title.toLowerCase().match(this.searchValue.toLowerCase())
        })
      } else {
        this.toastr.warning('No product found with this key', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right',
          closeButton: true
        })
        this.searchValue = ""
        setTimeout(() => { this.ngOnInit() }, 1000)
      }
    } else if (this.searchValue == "") {
      this.ngOnInit()
    }
  }

}
