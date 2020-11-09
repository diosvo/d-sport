import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
import {formatDate} from './utils.js';
declare var google: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  lstRevenueByYear: any = {
    data: []
  };

  lstOrderSoldByYear: any = {
    data: []
  };

  lstProductSoldByYear: any = {
    data: []
  };

  numOrderSoldByDay:any ={
    data:[]
  };

  numProductSoldByDay:any ={
    data:[]
  };

  revenueInDay:any ={
    data:[]
  };

  numOrder = 0;
  numProduct = 0;
  revenue = 0;

  date = new Date();

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getRevenueByYear();
    this.getOrderSoldByYear();
    this.getProductSoldByYear();
    this.getOrderSoldToDay();
    this.getProductSoldToDay();
    this.getRevenueToDay();
  }

  getOrderSoldToDay(){
    this.statisticService.getOrderSoldByDay(formatDate(this.date)).subscribe(result => {
      var res: any = result;
      this.numOrder = res.data[0].num;
    }, error => console.error(error));
  }

  getProductSoldToDay(){
    this.statisticService.getProductSoldByDay(formatDate(this.date)).subscribe(result => {
      var res: any = result;
      this.numProduct = res.data[0].num;
    }, error => console.error(error));
  }
  

  getRevenueToDay(){
    this.statisticService.getRevenueInDay(formatDate(this.date)).subscribe(result => {
      var res: any = result;
      this.revenue = res.data[0].revenue;
    }, error => console.error(error));
  }

  getRevenueByYear() {
    this.statisticService.getRevenueByYear(this.date.getFullYear()).subscribe(result => {
      var res: any = result;
      this.lstRevenueByYear = res.data;
      this.drawColChart(res.data);
    }, error => console.error(error));
  }

  getOrderSoldByYear() {
    this.statisticService.getOrderSoldByYear(this.date.getFullYear()).subscribe(result => {
      var res: any = result;
      this.lstOrderSoldByYear = res.data;
      this.drawLineChart(res.data);
    }, error => console.error(error));
  }

  getProductSoldByYear() {
    this.statisticService.getNumOfProductByYear(this.date.getFullYear()).subscribe(result => {
      var res: any = result;
      this.lstProductSoldByYear = res.data;
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
      document.getElementById('line_chart'));

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
      document.getElementById('pie_chart'));

    chart.draw(data, options);
  }
 
}
