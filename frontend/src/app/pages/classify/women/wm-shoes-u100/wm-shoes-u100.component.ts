import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModelServer, ServerResponse } from 'src/app/models/product.model';

@Component({
  selector: 'app-wm-shoes-u100',
  templateUrl: './wm-shoes-u100.component.html',
  styleUrls: ['./wm-shoes-u100.component.scss']
})
export class WmShoesU100Component implements OnInit {
  products: ProductModelServer[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.womenShoes();
  }

  womenShoes() {
    this.productService.getProdFromClassifyIdCategoryId(2, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products.filter(prod => {
        return prod.price <= 100;
      })
      console.log(this.products)
    })
  }

}
