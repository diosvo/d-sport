import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ServerResponse, ProductModelServer } from '../models/product.model';
import { Observable } from 'rxjs';
import { ClassifyServerResponse } from '../models/classify.model';
import { CategoryServerResponse } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) { }

  // Get All product for admin page
  getAllProduct(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
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

  /* Get products for Kids page */
  getKidsProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/kids', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get products for Accessories page */
  getAccessoriesProducts(numberOfResults = 12): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/category/accessories', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  /* Get single product from server */
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id)
  }

  /* Get products from Category Name */
  getProductsFromCategory(catName: string): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category' + catName)
  }

  /* Get products from ClassifyID + CategoryID */
  getProdFromClassifyIdCategoryId(ClassId: Number, CateId: Number): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/' + ClassId + '/category/' + CateId)
  }

  getCategoryList(): Observable<CategoryServerResponse> {
    return this.http.get<CategoryServerResponse>(this.SERVER_URL + '/categories')
  }

  getClassifyList(): Observable<ClassifyServerResponse> {
    return this.http.get<ClassifyServerResponse>(this.SERVER_URL + '/classify')
  }
}