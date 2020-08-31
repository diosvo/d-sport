import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserModelServer } from 'src/app/models/user.model';
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

  constructor(private cartService: CartService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
      this.cartService.cartTotal$.subscribe(total => this.cartTotal = total)
      this.cartService.cartData$.subscribe(data => this.cartData = data)

      this.userService.authState$.subscribe(authState => this.authState = authState)
  }

  onClickMenu() {
    document.getElementById("menu").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }

}