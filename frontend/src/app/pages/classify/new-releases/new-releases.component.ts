import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getNewReleaseProducts().subscribe((prods: { count: Number, products: any[] }) => {
      this.products = prods.products
      console.log(this.products);
    })
  }
}