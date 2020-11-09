import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiUrl } from '../api/api-url';
import { environment } from 'src/environments/environment';

import { ServerResponse, ProductModelServer } from '../models/product.model';
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

  // Page: Home
  getHomeProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(ApiUrl.HomePage, {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Men
  getMenProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(ApiUrl.ClassifyPage + '/men', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Kids
  getKidsProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(ApiUrl.ClassifyPage + '/kids', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Accessories
  getAccessoriesProducts(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(ApiUrl.AccessoriesPage)
  }

  // Product details
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(ApiUrl.ProductDetails + id)
  }

  // Get products from ClassifyID + CategoryID 
  getProdFromClassifyIdCategoryId(ClassId: Number, CateId: Number): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products/classify/' + ClassId + '/category/' + CateId)
  }

  getCategoryList(): Observable<CategoryServerResponse> {
    return this.http.get<CategoryServerResponse>(this.SERVER_URL + '/categories')
  }

  getClassifyList(): Observable<ClassifyServerResponse> {
    return this.http.get<ClassifyServerResponse>(this.SERVER_URL + '/classify')
  }

  createProduct(product){
    return this.http.post(this.SERVER_URL + '/products/create', product)
  }

  updateProduct(product){
    return this.http.post(this.SERVER_URL + '/products/update', product)
  }

  deleteProduct(productId){
    return this.http.delete(this.SERVER_URL + '/products/' + productId)
  }
}