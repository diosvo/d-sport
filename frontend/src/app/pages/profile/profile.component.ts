import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModelServer } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;
  cartData: CartModelServer

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: UserModelServer) => {
          return user;
        })
      )
      .subscribe((data: UserModelServer) => {
        this.myUser = data;
      });
    console.log(this.myUser)
  }

  logout() {
    this.userService.logout();
    this.token.removeTokens()
    this.cartService.cartData$.subscribe(data => this.cartData = data)
  }
}