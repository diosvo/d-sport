import { Component, OnInit } from '@angular/core';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
})
export class AdminProductComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getHomeProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products
    })
  }

}
