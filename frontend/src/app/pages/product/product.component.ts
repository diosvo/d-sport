import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CartService} from 'src/app/services/cart.service';
import {filter, map} from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, AfterViewInit {

  id: number;
  product;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      ).subscribe(prodId => {
        this.id = prodId;
        this.productService.getSingleProduct(this.id).subscribe(prod => {
          this.product = prod;
        })
    });
  }

  ngAfterViewInit() {
  }
}
