import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartModelServer } from 'src/app/models/cart.model';

import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isLoggedIn: Boolean
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;

  constructor(public cartService: CartService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.auth.subscribe(isLoggedIn => { this.isLoggedIn = isLoggedIn })
    if(this.isLoggedIn && localStorage.getItem('cart')) {
      this.cartService.cartTotal$.subscribe(total => {this.cartTotal = total})
      this.cartService.cartData$.subscribe(data => { this.cartData = data })
    }
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
    this.cartService.cartData$.subscribe(data => { this.cartData = data })
  }

  ChangeQty(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product-details', id]).then();
  }
}