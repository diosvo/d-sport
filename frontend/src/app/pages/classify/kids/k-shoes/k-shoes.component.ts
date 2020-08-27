import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-k-shoes',
  templateUrl: './k-shoes.component.html',
  styleUrls: ['./k-shoes.component.scss']
})

export class KShoesComponent implements OnInit {
  products: ProductModelServer[];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProdFromClassifyIdCategoryId(3, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products)
    })
  }
  
  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }
}