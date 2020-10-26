import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { CartModelServer } from 'src/app/models/cart.model';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  myUser: any;
  cartData: CartModelServer

  constructor(
    private authService: AuthService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.myUser = JSON.parse(localStorage.getItem('current-user'))
  }

  logout() {
    this.authService.logout();
    this.cartService.cartData$.subscribe(data => this.cartData = data)
  }

  benefitsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

}
