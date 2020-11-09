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

  constructor(private _http: HttpClient) { }

  // Get All product for admin page
  getAllProduct(cPage: Number, size: Number, keyword: string): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(this.SERVER_URL + '/products/page/' + cPage + '/size/' + size + '/keyword/' + keyword)
  }

  // Page: Home
  getHomeProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(ApiUrl.HomePage, {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Men
  getMenProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(ApiUrl.ClassifyPage + '/men', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Kids
  getKidsProducts(numberOfResults = 20): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(ApiUrl.ClassifyPage + '/kids', {
      params: {
        limit: numberOfResults.toString()
      }
    })
  }

  // Page: Accessories
  getAccessoriesProducts(): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(ApiUrl.AccessoriesPage)
  }

  // Product details
  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this._http.get<ProductModelServer>(ApiUrl.ProductDetails + id)
  }

  // Get products from ClassifyID + CategoryID 
  getProdFromClassifyIdCategoryId(ClassId: Number, CateId: Number): Observable<ServerResponse> {
    return this._http.get<ServerResponse>(this.SERVER_URL + '/products/classify/' + ClassId + '/category/' + CateId)
  }

  getCategoryList(): Observable<CategoryServerResponse> {
    return this._http.get<CategoryServerResponse>(ApiUrl.CategoryList)
  }

  getClassifyList(): Observable<ClassifyServerResponse> {
    return this._http.get<ClassifyServerResponse>(ApiUrl.ClassifyList)
  }

  createProduct(product) {
    return this._http.post(this.SERVER_URL + '/products/create', product)
  }

  updateProduct(product) {
    return this._http.post(this.SERVER_URL + '/products/update', product)
  }

  deleteProduct(productId) {
    return this._http.delete(this.SERVER_URL + '/products/' + productId)
  }
}