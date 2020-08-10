import {Component, OnInit, AfterViewInit, ViewChild, Directive, Input} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CartService} from 'src/app/services/cart.service';
import {map} from 'rxjs/operators';

declare let $: any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, AfterViewInit {

  id: number;
  product;

  @ViewChild('quantity') quantityInput;

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

  addToCart(id: number) {
    if (this.product.quantity >= 1) {
      this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);
      console.log('Add to cart successfully w/ ProductID:', id, 'x', this.quantityInput.nativeElement.value);
    } else {
      window.alert('This product is out of stock!')
    }
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (value < this.product.quantity) {
      value++;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (value > 1 && value <= this.product.quantity) {
      value--;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  ngAfterViewInit(): void {
  }
}
