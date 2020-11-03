import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/services/statistic.service';
declare var google:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  lstRevenueByYear : any = {
    data: []
  };

  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.getRevenueByYear();
  }

  getRevenueByYear(){
    let d = new Date();

    this.statisticService.getRevenueByYear(d.getFullYear()).subscribe(result=>{
      var res:any = result;
      this.lstRevenueByYear = res.data;
      console.log(this.lstRevenueByYear);
      this.drawBasic(res.data);
      //this.drawChart(this.lstRevenueByYear.data);
    }, error => console.error(error));

  }

  drawBasic(chartData) {
    var arrData = [['Month','Revenue']];
    chartData.forEach(element => {
      var item=[];
      item.push(element.mon);
      item.push(element.revenue);
      arrData.push(item);
    });
    var data = google.visualization.arrayToDataTable(arrData);
    
      var options = {
        title: "Revenue of year",
        width: 1000,
        legend: 'none',
        hAxis: {
          title: 'Month',
        },
        vAxis: {
          title: 'Revenue'
        }
        
      };
    

    var chart = new google.visualization.ColumnChart(
      document.getElementById('chart_div'));

    chart.draw(data, options);
  }

}
