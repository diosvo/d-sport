import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';
import { ServerResponse } from '../models/order.model';
import { Observable } from 'rxjs';
import { ApiUrl } from '../api/api-url';

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
    getAllOrders(): Observable<ServerResponse> {
      return this.http.get<ServerResponse>(this.SERVER_URL + '/orders/all')
    }

    getSingleProduct(id: Number): Observable<ProductModelServer> {
      return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id)
    }

    getSingleOrdered(orderId: number) {
        return this.http.get<ProductModelServer[]>(ApiUrl.SingleOrder + orderId).toPromise()
    }
}