import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})

export class ThankyouComponent implements OnInit {
  
  orderId: number

  constructor(private router: Router) {
    const navigate = this.router.getCurrentNavigation();
    const state = navigate.extras.state as {
      orderId: number,
    };
    this.orderId = state.orderId;
  }

  ngOnInit(): void {
  }
}
