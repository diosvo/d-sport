import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
declare var google: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin-statistic.component.html',
})
export class AdminStatisticComponent implements OnInit {

  lstYear: any = {
    data: []
  };

//   lstOrderSoldByYear: any = {
//     data: []
//   };

//   numOrderSoldByDay:any ={
//     data:[]
//   };

//   numProductSoldByDay:any ={
//     data:[]
//   };

//   revenueInDay:any ={
//     data:[]
//   };

  date = new Date();

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getListYear();
    // this.getProductSoldByDay();
    // this.getRevenueInDay();
    // this.getRevenueByYear();
    // this.getOrderSoldByYear();
  }

  getListYear(){
    this.statisticService.getListYear().subscribe(result => {
      var res: any = result;
      this.lstYear = res.data;
      console.log(this.lstYear);
    }, error => console.error(error));
  }

//   getProductSoldByDay(){
//     this.statisticService.getProductSoldByDay(this.formatDate(this.date.toISOString())).subscribe(result => {
//       var res: any = result;
//       this.numProductSoldByDay = res.data;
//       console.log(this.numProductSoldByDay);
//     }, error => console.error(error));
//   }

//   getRevenueInDay(){
//     this.statisticService.getRevenueInDay(this.formatDate(this.date.toISOString())).subscribe(result => {
//       var res: any = result;
//       this.revenueInDay = res.data;
//       // if(this.revenueInDay.)
//       console.log(this.revenueInDay);
//     }, error => console.error(error));
//   }

//   getRevenueByYear() {
//     this.statisticService.getRevenueByYear(this.date.getFullYear()).subscribe(result => {
//       var res: any = result;
//       this.lstRevenueByYear = res.data;
//       // console.log(this.lstRevenueByYear);
//       this.drawColChart(res.data);
//     }, error => console.error(error));

//   }

//   getOrderSoldByYear() {
//     this.statisticService.getOrderSoldByYear(this.date.getFullYear()).subscribe(result => {
//       var res: any = result;
//       this.lstOrderSoldByYear = res.data;
//       // console.log(this.lstOrderSoldByYear);
//       this.drawLineChart(res.data);
//     }, error => console.error(error));

//   }

//   drawColChart(chartData) {
//     var arrData = [['Month', 'Revenue']];
//     chartData.forEach(element => {
//       var item = [];
//       item.push(element.mon);
//       item.push(element.revenue);
//       arrData.push(item);
//     });
//     var data = google.visualization.arrayToDataTable(arrData);

//     var options = {
//       title: "Revenue of year per month",
//       bar: { groupWidth: "75%" },
//       legend: 'none',
//       hAxis: {
//         title: 'Month',
//       },
//       vAxis: {
//         title: 'Revenue($)'
//       }
//     };
//     var chart = new google.visualization.ColumnChart(
//       document.getElementById('col_chart'));

//     chart.draw(data, options);
//   }

//   drawLineChart(chartData) {
//     var arrData = [['Month', 'Number']];
//     chartData.forEach(element => {
//       var item = [];
//       item.push(element.mon);
//       item.push(element.num);
//       arrData.push(item);
//     });
//     var data = google.visualization.arrayToDataTable(arrData);

//     var options = {
//       title: "Number of orders was sold in year per month",
//       legend: 'none',
//       bar: { groupWidth: "75%" },
//       hAxis: {
//         title: 'Month',
//       },
//       vAxis: {
//         title: 'Number of orders'
//       }
//     };
//     var chart = new google.visualization.LineChart(
//       document.getElementById('pie_chart'));

//     chart.draw(data, options);
//   }

}
