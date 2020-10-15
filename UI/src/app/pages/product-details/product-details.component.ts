import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { JwtService } from 'src/app/services/jwt.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  id: number;
  product;

  @ViewChild('quantity') quantityInput;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private token: JwtService,
    private authService: AuthService,
    private router: Router) {
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
    /*       if (this.userService.auth == true) {
            this.userService.userData$
              .subscribe((data: UserModelServer) => {
                const getUserID = parseInt(this.token.getUser())
      
                if (data.id = getUserID) {
                  if (this.product.quantity >= 1) {
                    this.cartService.addProductToCart(id, parseInt(this.quantityInput.nativeElement.value));
                  } else {
                    this.oos();
                  }
                }
              })
          } else {
            return this.router.navigateByUrl('/login')
          }  */

    /* if (this.userService.authState$ && this.userService.auth == true) {
      if (this.product.quantity >= 1) {
        this.cartService.addProductToCart(id, parseInt(this.quantityInput.nativeElement.value));
      } else {
        this.oos();
      }
    } else {
      return this.router.navigateByUrl('/login')
    } */
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
