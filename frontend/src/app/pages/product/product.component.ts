import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private toastr: ToastrService) {
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

  oos() {
    this.toastr.error('Sorry, this product is currently out of stock!', '', {
      timeOut: 2000,
      positionClass: 'toast-top-full-width',
      closeButton: true
    })
  }


  addToCart(id: number) {
    if (this.product.quantity >= 1) {
      this.cartService.addProductToCart(id, parseInt(this.quantityInput.nativeElement.value));
      console.log('Add to cart successfully w/ ProductID:', id, 'x', this.quantityInput.nativeElement.value);
    } else {
      this.oos();
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