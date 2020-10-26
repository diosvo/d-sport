import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartModelServer } from 'src/app/models/cart.model';

import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserModelServer } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Boolean
  cartData: CartModelServer
  cartTotal: Number;

  
  constructor(public cartService: CartService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.auth.subscribe(isLoggedIn => {this.isLoggedIn = isLoggedIn})
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
    this.cartService.cartData$.subscribe(data => { this.cartData = data })
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
}