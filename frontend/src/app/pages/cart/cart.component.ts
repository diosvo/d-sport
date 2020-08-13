import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;

  constructor(public cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data: CartModelServer) => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQty(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);
  }

  selectProduct(id: Number) {
    return this.router.navigate(['/product', id]).then();
  }

}