import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

import { CartModelServer } from 'src/app/models/cart.model';

import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Boolean
  cartData: CartModelServer

  constructor(public cartService: CartService,
    private authService: AuthService,
    private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const nav = document.querySelector('.nav')
        nav.classList.remove('nav--open')
      }
    })
  }

  ngOnInit(): void {
    this.authService.auth.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
    this.cartService.cartData$.subscribe(data => this.cartData = data)
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