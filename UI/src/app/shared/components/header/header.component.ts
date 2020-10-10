import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartModelServer } from 'src/app/models/cart.model';
import { UserModelServer } from 'src/app/models/user.model';

import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer
  cartTotal: Number;
  authState: boolean

  constructor(public cartService: CartService,
    private userService: UserService,
    private router: Router,
    private token: TokenStorageService) { }

  ngOnInit(): void {

    if (this.userService.authState$ && this.userService.auth == true) {
      this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
      this.cartService.cartData$.subscribe(data => { this.cartData = data })
      this.userService.authState$.subscribe(authState => { this.authState = authState })

    } else {
      this.userService.authState$.subscribe(authState => { this.authState = authState })
      // this.authState === false
      this.cartService.cartData$.subscribe(data => { this.cartData = data })
      localStorage.removeItem('cart')
    }

  }

  onClickMenu() {
    const nav = document.querySelector('.nav')
    nav.classList.add('nav--open')

    document.querySelector('.nav__overlay').addEventListener("click", () => {
      nav.classList.remove('nav--open')
    })

    document.querySelector('#nav--close').addEventListener("click", () => {
      nav.classList.remove('nav--open')
    })
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product-details', id]).then();
  }

  routerLink() {
    this.authState === true ? this.router.navigate(['/profile']) : this.router.navigate(['/login'])
  }
}