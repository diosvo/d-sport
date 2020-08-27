import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-k-bottom',
  templateUrl: './k-bottom.component.html',
  styleUrls: ['./k-bottom.component.scss']
})
export class KBottomComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(3, 3).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }
}