import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductModelServer } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    private SERVER_URL = environment.SERVER_URL

    constructor(private http: HttpClient) {
    }

    getSingleOrdered(orderId: number) {
        return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/orders/' + orderId).toPromise()
    }
}