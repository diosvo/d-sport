import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-men-accessories',
  templateUrl: './men-accessories.component.html',
})

export class MenAccessoriesComponent implements OnInit {

  products: ProductModelServer[] = [];
  searchValue: string
  p: number = 1 // current page

  constructor(private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(1, 4).subscribe((prods: ServerResponse) => {
      this.products = prods.products
    })
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
