import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';
import { ServerResponse } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private SERVER_URL = environment.SERVER_URL

    constructor(private http: HttpClient) {
    }

    // get orders for admin-order page
    getOrders(numberOfResults = 10): Observable<ServerResponse> {
        return this.http.get<ServerResponse>(this.SERVER_URL + '/orders', {
          params: {
            limit: numberOfResults.toString()
          }
        })
      }
    
    getSingleOrdered(orderId: number) {
        return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/orders/' + orderId).toPromise()
    }
}