import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  /* GET revenue each month of the year => draw chart */
  getRevenueByYear(year){
    return this.http.get(this.SERVER_URL + '/statistic/revenue/' + year)
  }

  /* GET number of orders was sold each month of the year => draw chart */
  getOrderSoldByYear(year){
    return this.http.get(this.SERVER_URL + '/statistic/num-of-orders-was-sold-each-month/' + year)
  }

  /* GET number of product each month of the year => draw chart */
  getNumOfProductByYear(year){
    return this.http.get(this.SERVER_URL + '/statistic/num-of-products-was-sold-each-month/' + year)
  }

  /* GET number of products was sold in a day */
  getOrderSoldByDay(day){
    return this.http.get(this.SERVER_URL + '/statistic/num-of-orders-was-sold/' + day)
  }

  /* GET number of products was sold in a day */
  getProductSoldByDay(day){
    return this.http.get(this.SERVER_URL + '/statistic/num-of-products-was-sold/' + day)
  }

  /* GET revenue in a day */
  getRevenueInDay(day){
    return this.http.get(this.SERVER_URL + '/statistic/revenue-in-day/' + day)
  }

  /* GET list of orders in among time */
  getListOrderInTime(from_date,to_date){
    return this.http.get(this.SERVER_URL + '/statistic/list-of-orders-in-time/' + from_date + '/' + to_date)
  }

  /* GET revenue in among time */
  getRevenueInTime(from_date,to_date){
    return this.http.get(this.SERVER_URL + '/statistic/revenue-in-time/' + from_date + '/' + to_date)
  }

  /* GET the fastest sell list of product */
  getFastestSellProduct(from_date,to_date){
    return this.http.get(this.SERVER_URL + '/statistic/list-product-fastest-sell/' + from_date + '/' + to_date)
  }

  /* GET list of year when the order was sold  */
  getListYear(){
    return this.http.get(this.SERVER_URL + '/statistic/list-of-year')
  }
}