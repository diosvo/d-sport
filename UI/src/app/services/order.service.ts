import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiUrl } from '../api/api-url';

import { ProductModelServer } from '../models/product.model';
import { ServerResponse } from '../models/order.model';
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

    // All orders (for Admin)
    getAllOrders(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
      return this.http.get<ServerResponse>(this.SERVER_URL + '/orders/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
    }


    getSingleProduct(id: Number): Observable<ProductModelServer> {
      return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id)
    }

    getSingleOrdered(orderId: number) {
        return this.http.get<ProductModelServer[]>(ApiUrl.SingleOrder + orderId).toPromise()
    }

    getOrderDetail(id: number): Observable<OrderDetailServerResponse>{
      return this.http.get<OrderDetailServerResponse>(this.SERVER_URL + '/orders_details/' + id)
    }

}