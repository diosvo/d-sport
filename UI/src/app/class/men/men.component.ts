import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ServerResponse, ProductModelServer } from 'src/app/models/product.model';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {

  products: ProductModelServer[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getMenProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products
    })
  }

  proCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  exploreCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }
}
