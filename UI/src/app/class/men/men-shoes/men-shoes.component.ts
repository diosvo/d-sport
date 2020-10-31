import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-men-shoes',
  templateUrl: './men-shoes.component.html',
})

export class MenShoesComponent implements OnInit {

  products: ProductModelServer[];
  searchValue: string
  isDisplay = true
  p: number = 1

  constructor(private productService: ProductService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    })
  }

  sortIncreasing() {
    this.products = this.products.sort((a, b) => a.price - b.price)
    this.isDisplay = !this.isDisplay
  }

  sortDecreasing() {
    this.products = this.products.sort((a, b) => b.price - a.price)
    this.isDisplay = !this.isDisplay
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

  toggleDisplay() {
    this.isDisplay = !this.isDisplay
    document.getElementById("icon-down").classList.toggle("icon-up");
  }

}