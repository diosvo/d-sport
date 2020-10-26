import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderModelServer, ServerResponse } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
declare var $:any;

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
})
export class AdminOrderComponent implements OnInit {

  orders: OrderModelServer[] = [];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<OrderModelServer> = new Subject();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [
        [5, 10, 25, 50, -1],
        [5, 10, 25, 50, 'All'],
      ],
    };

    this.orderService.getAllOrders().subscribe((orders: ServerResponse) => {
      this.orders = orders.orders
      console.log(orders)
      this.dtTrigger.next()
    })

  };

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openModal(){
    $('#order_detail').modal('show')
  }

}
