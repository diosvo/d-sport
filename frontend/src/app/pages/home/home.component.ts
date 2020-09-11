import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ServerResponse, ProductModelServer } from 'src/app/models/product.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.productService.getHomeProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products
      console.table(this.products);
    })
  }

  /* Select Product by ID */
  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
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
        items: 4
      }
    },
    nav: true
  }

  bsCustomOptions: OwlOptions = {
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