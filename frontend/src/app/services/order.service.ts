import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    products: ProductResponseModel[] = [];
    private SERVER_URL = environment.SERVER_URL

    constructor(private http: HttpClient) {
    }

    getSingleOrdered(orderId: number) {
        return this.http.get<ProductResponseModel[]>(this.SERVER_URL + '/orders/' + orderId).toPromise()
    }
}

interface ProductResponseModel {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
}

