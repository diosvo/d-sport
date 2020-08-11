import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getMenProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  /* Select Product by ID */
  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }

  mShoes() {
    this.productService.getProdFromClassifyIdCategoryId(1, 1).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mTop() {
    this.productService.getProdFromClassifyIdCategoryId(1, 2).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mBottom() {
    this.productService.getProdFromClassifyIdCategoryId(1, 3).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  mAcc() {
    this.productService.getProdFromClassifyIdCategoryId(1, 4).subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.log(this.products);
    })
  }

  proCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
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
    nav: true
  }

  exploreCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
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
    nav: true
  }
}