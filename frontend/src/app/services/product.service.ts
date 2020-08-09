import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse, ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) {
  }

  /* Get products for home page */
  getHomeProducts(numberOfResults = 10): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for Men page */
  getMenProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/man', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for Women page */
  getWomenProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/women', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for Kids page */
  getKidsProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/kids', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for New Releases page */
  getNewReleaseProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/new-releases', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for Accessories page */
  getAccessoriesProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/accessories', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get single product from server */
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products' + id)
  }

  /* Get products from Category Name */
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category' + catName)
  }
}