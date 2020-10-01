import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-k-shoes',
  templateUrl: './k-shoes.component.html',
})

export class KShoesComponent implements OnInit {
  
  products: ProductModelServer[];
  searchValue: string

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(3, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.table(this.products)
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
