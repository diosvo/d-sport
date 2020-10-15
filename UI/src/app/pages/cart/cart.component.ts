import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/services/cart.service';


import { CartModelServer } from 'src/app/models/cart.model';
import { UserModelServer } from 'src/app/models/user.model';

import { JwtService } from 'src/app/services/jwt.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  authState: boolean

  constructor(public cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private token: JwtService) { }

  ngOnInit(): void {
    /* 
        if (this.userService.authState$) {
          if (this.userService.auth == true) {
                  this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
                  this.cartService.cartData$.subscribe(data => this.cartData = data)
    
                  this.userService.authState$.subscribe(authState => { this.authState = authState })
                } else return
          } else {
            this.cartService.cartData$.subscribe(data => this.cartData = data)
            this.userService.authState$.subscribe(authState => { this.authState = authState })
          } */

  }

  ChangeQty(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product-details', id]).then();
  }
}
