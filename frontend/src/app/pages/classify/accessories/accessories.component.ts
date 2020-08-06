import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})

export class AccessoriesComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAccessoriesProducts().subscribe((prods: { count: Number, products: any[] }) => {
      this.products = prods.products
      console.log(this.products);
    })
  }
}
