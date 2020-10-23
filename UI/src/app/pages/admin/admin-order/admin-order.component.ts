import { Component, OnInit } from '@angular/core';
import { OrderModelServer, ServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
})
export class AdminOrderComponent implements OnInit {

  orders: OrderModelServer[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((order: ServerResponse) => {
      this.orders = order.orders
    })
  }

}
