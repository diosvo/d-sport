import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/cart.model';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { UserModelServer } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';

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
    private userService: UserService, 
    private router: Router,
    private fb: FormBuilder) {
  }

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
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    console.log(this.userService.auth)
  }

  checkOut() {
    this.spinner.show();

    if (this.userService.auth == true) {
      this.userService.userData$
        .pipe(
          map((user: UserModelServer) => {
            return user;
          })
        )
        .subscribe((data: UserModelServer) => {
          this.cartService.checkoutFromCart(data.id);
        });
    }
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