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

    if (this.userService.authState$) {
      if (this.userService.auth == true) {
        this.userService.userData$
          .pipe(
            map((user: UserModelServer) => {
              return user
            })
          )
          .subscribe((data: UserModelServer) => {
            const getUserID = parseInt(this.token.getUser())
            if (data.id = getUserID) {
              this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
              this.cartService.cartData$.subscribe(data => {
                this.cartData = data
                const number = this.cartData.data[0].numInCart
                console.log('auth:', this.userService.auth, 'number in cart:', number)
              })
              this.userService.authState$.subscribe(authState => { this.authState = authState })
            } else return
          })
      } else {
        this.userService.authState$.subscribe(authState => { this.authState = authState })
        this.cartService.cartData$.subscribe(data => {
          this.cartData = data
          const number = this.cartData.data[0].numInCart
          console.log('auth:', this.userService.auth, 'number in cart:', number)
        })

        localStorage.removeItem('cart')
      }
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
}