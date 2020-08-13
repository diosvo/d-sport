import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { CartModelPublic, CartModelServer } from '../models/cart.model';

import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private SERVER_URL = environment.SERVER_URL

  /* Stored in Client's Local Storage */
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodsData: [
      {
        id: 0,
        inCart: 0
      }
    ]
  }

  /* Stored in Server's Local Storage */
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [
      {
        numInCart: 0,
        product: undefined
      }
    ]
  }

  /* OBSERVABLES FOR THE COMPONENT TO SUBSCRIBE */
  cartTotal$ = new BehaviorSubject<Number>(0)
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer)

  constructor(private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    // Get information from local storage
    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    /* Check if it is null or has some data in it */
    if (info !== null && info !== undefined && info.prodsData[0].inCart !== 0) {

      // Not empty and has some information
      this.cartDataClient = info;

      // Put it in cartDataServer object
      this.cartDataClient.prodsData.forEach(product => {
        this.productService.getSingleProduct(product.id).subscribe((actualProductInfo) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = product.inCart;
            this.cartDataServer.data[0].product = actualProductInfo;

            this.total();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
          } else {

            // Cart data has some entry in it
            this.cartDataServer.data.push({
              numInCart: product.inCart,
              product: actualProductInfo
            });

            this.total();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
          }
          this.cartData$.next({ ...this.cartDataServer });
        })
      });
    }
  }

  addProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {
      /* === 1. If the cart is empty === */
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;

        // Total amount
        this.total();
        this.cartDataClient.prodsData[0].id = prod.id;
        this.cartDataClient.prodsData[0].inCart = this.cartDataServer.data[0].numInCart;

        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({ ...this.cartDataServer });

        // DISPLAY A TOAST NOTIFICATION
        this.toast.success(`${prod.title} added to the cart`, 'Product Added', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
          closeButton: true
        });
      } else {
        /* === 2. If the cart has some items === */
        const index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id) // -1 or positive value

        // a. If the item is already in the cart => index is positive value
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod?.quantity) {
            if (this.cartDataServer.data[index].numInCart < prod?.quantity) {
              this.cartDataServer.data[index].numInCart += quantity
            } else {
              prod?.quantity;
            }
          } else {
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod?.quantity ? quantity : prod?.quantity;
          }

          this.cartDataClient.prodsData[index].inCart = this.cartDataServer.data[index].numInCart;
          this.total();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

          // TOAST NOTIFICATION
          this.toast.info(`${prod.title} quantity updated to the cart`, 'Product Updated', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
            closeButton: true
          })
        }

        // b. If the item is not in the cart
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: quantity
          });

          this.cartDataClient.prodsData.push({
            id: prod.id,
            inCart: quantity
          });
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient))

          // TOAST NOTIFICATION
          this.toast.success(`${prod.title} added to the cart`, 'Product Added', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
            closeButton: true
          })

          // Total amount
          this.total();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
          this.cartData$.next({ ...this.cartDataServer });
        }
      }
    })
  }

  updateCartItems(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];

    if (increase) {
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodsData[index].inCart = data.numInCart;

      this.total()
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      this.cartData$.next({ ...this.cartDataServer });
    } else {
      data.numInCart--;

      if (data.numInCart < 1) {
        this.deleteProductFromCart(index)
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
        this.cartDataClient.prodsData[index].inCart = data.numInCart;

        this.total();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      }
    }
  }

  deleteProductFromCart(index) {
    if (window.confirm('Are you sure you want to remove the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodsData.splice(index, 1);
      this.total();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {
          total: 0, prodsData: [{ id: 0, inCart: 0 }]
        }
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          total: 0, data: [{ numInCart: 0, product: undefined }]
        }
        this.cartData$.next({ ...this.cartDataServer });
      } else {
        this.cartData$.next({ ...this.cartDataServer });
      }
    } else {
      // If the user click cancel button
      return;
    }
  }

  private total() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const { numInCart } = p;
      const { price } = p.product;

      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [
        {
          product: undefined,
          numInCart: 0
        }
      ]
    }

    this.cartData$.next({ ...this.cartDataServer });
  }

  cartSubTotal(index): number {
    let subTotal = 0;
    const p = this.cartDataServer.data[index];

    subTotal = p.product.price * p.numInCart;
    return subTotal;
  }

  checkoutFromCart(userId: number) {
    this.http.post(`${this.SERVER_URL}/orders/payment`, null).subscribe((res: { success: boolean }) => {
      console.clear();

      if (res.success) {
        this.resetServerData();
        this.http.post(`${this.SERVER_URL}/orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodsData
        }).subscribe((data: OrderResponse) => {
          this.orderService.getSingleOrdered(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: data.products,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };

              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = { total: 0, prodsData: [{ inCart: 0, id: 0 }] };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          })
        })
      } else {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.router.navigateByUrl('/checkout').then();

        // DISPLAY A TOAST NOTIFICATION
        this.toast.info(`Sorry, You are failed to book a order`, 'Order Status', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
          closeButton: true
        })
      }
    })
  }

}

interface OrderResponse {
  order_id: number,
  success: boolean,
  message: string,
  products: [{
    id: number,
    numInCart: number
  }]
}

/* NOTEs */
// ... rest to get child properties
