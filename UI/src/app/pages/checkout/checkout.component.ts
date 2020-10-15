import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CartService } from 'src/app/services/cart.service';

import { CartModelServer } from 'src/app/models/cart.model';
import { UserModelServer } from 'src/app/models/user.model';

import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartTotal: Number;
  cartData: CartModelServer;

  constructor(private cartService: CartService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  checkoutForm = this.fb.group(
    {
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
    }
  );

  ngOnInit(): void {
    this.spinner.hide()
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  checkOut() {
    this.spinner.show();
    this.authService.user.subscribe((data: UserModelServer) => {
      this.cartService.checkoutFromCart(data.id);
    });
  }

  get firstname() {
    return this.checkoutForm.get('firstname')
  }

  get lastname() {
    return this.checkoutForm.get('lastname')
  }

  get address() {
    return this.checkoutForm.get('address')
  }

  get email() {
    return this.checkoutForm.get('email')
  }

  get phone() {
    return this.checkoutForm.get('phone')
  }

}
