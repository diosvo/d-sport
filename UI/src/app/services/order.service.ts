import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';
import { ServerResponse } from '../models/order.model';
import { Observable } from 'rxjs';
import { OrderDetailServerResponse } from '../models/order_detail.model';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private SERVER_URL = environment.SERVER_URL

    constructor(private http: HttpClient) {
    }

    getOrders(numberOfResults = 10): Observable<ServerResponse> {
      return this.http.get<ServerResponse>(this.SERVER_URL + '/orders', {
        params: {
          limit: numberOfResults.toString()
        }
      })
    }

    // get orders for admin-order page
    getAllOrders(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
      return this.http.get<ServerResponse>(this.SERVER_URL + '/orders/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
    }

    getOrderDetail(id: number): Observable<OrderDetailServerResponse>{
      return this.http.get<OrderDetailServerResponse>(this.SERVER_URL + '/orders_details/' + id)
    }

    getSingleProduct(id: Number): Observable<ProductModelServer> {
      return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id)
    }

    getSingleOrdered(orderId: number) {
        return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/orders/' + orderId).toPromise()
    }

    
}