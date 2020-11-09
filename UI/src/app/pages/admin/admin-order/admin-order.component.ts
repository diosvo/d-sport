import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderModelServer, ServerResponse } from 'src/app/models/order.model';
import { OrderDetailModelServer, OrderDetailServerResponse } from 'src/app/models/order_detail.model';
import { OrderService } from 'src/app/services/order.service';
declare var $:any;

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
})
export class AdminOrderComponent implements OnInit {

  orders_details: OrderDetailModelServer[] = [];

  orders: any = {
    page: 1,
    size: 5,
    totalPage: 0,
    count: 0,
    orders: []
  };

  kw = '';
  message ='';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.searchOrder(1);
  };

  searchOrder(cPage) {
    let page = cPage;
    let size = 5;
    let keyword = this.kw;

    this.orderService.getAllOrders(page, size, keyword).subscribe((orders: any) => {
      this.orders = orders;
    });
  }
  
  searchPrevious() {
    if (this.orders.page > 1) {
      let nextPage = this.orders.page - 1;
      
      let page = nextPage;
      let size = 5;
      let keyword = this.kw;

      this.orderService.getAllOrders(page, size, keyword).subscribe((orders: any) => {
        this.orders = orders;
      });
    } else {
      this.showWarning("You're in the first page");
    }
  }

  searchNext() {
    if (this.orders.page < this.orders.totalPage) {
      let nextPage = this.orders.page + 1;

      let page = nextPage;
      let size = 5;
      let keyword = this.kw;
      this.orderService.getAllOrders(page, size, keyword).subscribe((orders: any) => {
        this.orders = orders;
      });
    }
    else{
      this.showWarning("You're in the last page");
    }
  }

  getOrderDetail(id: number):void{
    this.orderService.getOrderDetail(id).subscribe((order_detail: OrderDetailServerResponse) =>{
      this.orders_details = order_detail.orders_details
    })
  }

  showWarning(message){
    this.message = message;
    $("#warningModal").modal("show");
    setTimeout(function(){ $("#warningModal").modal("hide"); }, 1500);
  }

}
