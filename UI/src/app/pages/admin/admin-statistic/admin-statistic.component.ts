import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import {formatDate} from '../utils.js'
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

  lstFastestSellProduct:any={
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
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    //this.getListYear();
    $("#table_order").hide();
    $("#table_product").hide();
    $("#table_revenue").hide();
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

  getFastestSellProduct(){
    $("#table_product").show();
    this.statisticService.getFastestSellProduct(formatDate(this.date_from_product), formatDate(this.date_to_product)).subscribe(result => {
      var res: any = result;
      this.lstFastestSellProduct = res;
      console.log(this.lstFastestSellProduct);
    }, error => console.error(error));
  }

  // getRevenueByYear(year) {
  //   this.statisticService.getRevenueByYear(year).subscribe(result => {
  //     var res: any = result;
  //     this.lstRevenueByYear = res.data;
  //     // console.log(this.lstRevenueByYear);
  //     //this.drawColChart(res.data);
  //   }, error => console.error(error));
  // }

  // getOrderSoldByYear(year) {
  //   this.statisticService.getOrderSoldByYear(year).subscribe(result => {
  //     var res: any = result;
  //     this.lstOrderSoldByYear = res.data;
  //     // console.log(this.lstOrderSoldByYear);
  //     // this.drawLineChart(res.data);
  //   }, error => console.error(error));
  // }

  // getProductSoldByYear(year) {
  //   this.statisticService.getNumOfProductByYear(year).subscribe(result => {
  //     var res: any = result;
  //     this.lstProductSoldByYear = res.data;
  //     //this.drawPieChart(res.data);
  //   }, error => console.error(error));
  // }

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

  // drawLineChart(chartData) {
  //   var arrData = [['Month', 'Number']];
  //   chartData.forEach(element => {
  //     var item = [];
  //     item.push(element.mon);
  //     item.push(element.num);
  //     arrData.push(item);
  //   });
  //   var data = google.visualization.arrayToDataTable(arrData);

  //   var options = {
  //     title: "Number of orders was sold in year per month",
  //     legend: 'none',
  //     bar: { groupWidth: "75%" },
  //     vAxis: {
  //       title: 'Number of orders'
  //     }
  //   };
  //   var chart = new google.visualization.LineChart(
  //     document.getElementById('line_chart'));

  //   chart.draw(data, options);
  // }

  // drawPieChart(chartData) {
  //   var arrData = [['Month', 'Number']];
  //   chartData.forEach(element => {
  //     var item = [];
  //     item.push(element.mon);
  //     item.push(element.num);
  //     arrData.push(item);
  //   });
  //   var data = google.visualization.arrayToDataTable(arrData);

  //   var options = {
  //     title: "Number of product was sold in year per month",
  //     is3D: true,
  //   };
  //   var chart = new google.visualization.PieChart(
  //     document.getElementById('pie_chart'));

  //   chart.draw(data, options);
  // }

}
