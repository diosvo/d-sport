import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import {formatDate} from '../utils.js';

declare var google: any;
declare var $:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin-statistic.component.html',
})
export class AdminStatisticComponent implements OnInit {

  lstYear: any = {
    data: []
  };

  lstOrderInTime: any = {
    data: []
  };

  lstRevenueInTime: any = {
    data:[]
  };

  lstBestSellingProduct:any={
    data:[]
  };

  lstRevenueByYear:any={
    data:[]
  };

  lstOrderSoldByYear:any={
    data:[]
  };

  lstProductSoldByYear:any={
    data:[]
  };

  date_from_order: any;
  date_to_order:any;

  date_from_revenue: any;
  date_to_revenue:any;

  date_from_product: any;
  date_to_product:any;
  year:any;
  
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getListYear();
    $("#table_order").hide();
    $("#table_product").hide();
    $("#table_revenue").hide();
    $("#table_revenue").hide();
    $("#table_revenue_in_year").hide();
    $("#table_order_in_year").hide();
    $("#table_product_in_year").hide();
  }

  getListYear(){
    this.statisticService.getListYear().subscribe(result => {
      var res: any = result;
      this.lstYear = res;
      console.log(this.lstYear);
    }, error => console.error(error));
  }

  getListOrderInTime(){
    $("#table_order").show();
    this.statisticService.getListOrderInTime(formatDate(this.date_from_order), formatDate(this.date_to_order)).subscribe(result => {
      var res: any = result;
      this.lstOrderInTime = res;
      console.log(this.lstOrderInTime);
    }, error => console.error(error));
  }

  getRevenueInTime(){
    $("#table_revenue").show();
    this.statisticService.getRevenueInTime(formatDate(this.date_from_revenue), formatDate(this.date_to_revenue)).subscribe(result => {
      var res: any = result;
      this.lstRevenueInTime = res;
      console.log(this.lstRevenueInTime);
      this.drawColChart(res.data);
    }, error => console.error(error));
  }

  getBestSellingProduct(){
    $("#table_product").show();
    this.statisticService.getBestSellingProduct(formatDate(this.date_from_product), formatDate(this.date_to_product)).subscribe(result => {
      var res: any = result;
      this.lstBestSellingProduct = res;
      console.log(this.lstBestSellingProduct);
    }, error => console.error(error));
  }

  getRevenueByYear() {
    $("#table_revenue_in_year").show();
    this.statisticService.getRevenueByYear(this.year).subscribe(result => {
      var res: any = result;
      this.lstRevenueByYear = res;
      this.drawBarChart(res.data);
    }, error => console.error(error));
  }

  getOrderSoldByYear() {
    $("#table_order_in_year").show();
    this.statisticService.getOrderSoldByYear(this.year).subscribe(result => {
      var res: any = result;
      this.lstOrderSoldByYear = res;
      this.drawLineChart(res.data);
    }, error => console.error(error));
  }

  getProductSoldByYear() {
    $("#table_product_in_year").show();
    this.statisticService.getNumOfProductByYear(this.year).subscribe(result => {
      var res: any = result;
      this.lstProductSoldByYear = res;
      this.drawPieChart(res.data);
    }, error => console.error(error));
  }

  drawColChart(chartData) {
    var arrData = [['Month', 'Revenue']];
    chartData.forEach(element => {
      var item = [];
      item.push(element.mon);
      item.push(element.revenue);
      arrData.push(item);
    });
    var data = google.visualization.arrayToDataTable(arrData);

    var options = {
      title: "Revenue of year per month",
      bar: { groupWidth: "75%" },
      legend: 'none',
      vAxis: {
        title: 'Revenue($)'
      }
    };
    var chart = new google.visualization.ColumnChart(
      document.getElementById('col_chart'));

    chart.draw(data, options);
  }

  drawBarChart(chartData) {
    var arrData = [['Month', 'Revenue']];
    chartData.forEach(element => {
      var item = [];
      item.push(element.mon);
      item.push(element.revenue);
      arrData.push(item);
    });
    var data = google.visualization.arrayToDataTable(arrData);

    var options = {
      title: "Revenue of year per month",
      bar: { groupWidth: "75%" },
      legend: 'none',
    };
    var chart = new google.visualization.BarChart(
      document.getElementById('chart_revenue_year'));

    chart.draw(data, options);
  }

  drawLineChart(chartData) {
    var arrData = [['Month', 'Number']];
    chartData.forEach(element => {
      var item = [];
      item.push(element.mon);
      item.push(element.num);
      arrData.push(item);
    });
    var data = google.visualization.arrayToDataTable(arrData);

    var options = {
      title: "Number of orders was sold in year per month",
      legend: 'none',
      bar: { groupWidth: "75%" },
      vAxis: {
        title: 'Number of orders'
      }
    };
    var chart = new google.visualization.LineChart(
      document.getElementById('chart_order_year'));

    chart.draw(data, options);
  }

  drawPieChart(chartData) {
    var arrData = [['Month', 'Number']];
    chartData.forEach(element => {
      var item = [];
      item.push(element.mon);
      item.push(element.num);
      arrData.push(item);
    });
    var data = google.visualization.arrayToDataTable(arrData);

    var options = {
      title: "Number of product was sold in year per month",
      is3D: true,
    };
    var chart = new google.visualization.PieChart(
      document.getElementById('chart_product_year'));

    chart.draw(data, options);
  }

  toggleTableOrderBody(){
    $("#table_body_order").toggle(2000);
  }

  toggleTableProductBody(){
    $("#table_body_product").toggle(2000);
  }

  toggleTableRevenueBody(){
    $("#table_body_revenue").toggle(2000);
    $("#chart_revenue").toggle(2000);
  }

  toggleTableRevenueYearBody(){
    $("#table_body_revenue_year").toggle(2000);
    $("#chart_revenue_year").toggle(2000);
  }

  toggleTableOrderYearBody(){
    $("#table_body_order_year").toggle(2000);
    $("#chart_order_year").toggle(2000);
  }

  toggleTableProductYearBody(){
    $("#table_body_product_year").toggle(2000);
    $("#chart_product_year").toggle(2000);
  }
}
