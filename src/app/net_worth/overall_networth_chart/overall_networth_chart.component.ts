import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { NetworthData } from 'src/app/models/NetworthData';
import { NetworthYearlyData } from 'src/app/models/NetworthYearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'overall_networth_chart',
  templateUrl: './overall_networth_chart.component.html',
  styleUrls: ['./overall_networth_chart.component.scss'],
})
export class OverAllNetworthChart implements OnInit {

  @Input()
  public data!: NetworthData;
  
  constructor(private utilService: UtilService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let chartLabels = this.getChartLabels();
    let networthData = this.getOverAllNetworthData();
    
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'networth',
          data: networthData,
          fill: false,
          borderColor: 'rgb(153, 0, 51)',
          tension: 0.1,
        },
      ],
    };
    var myChart = new Chart(`myChart`, {
      type: 'line',
      data: data,
    });
  }

  public getChartLabels(): string[] {
    return this.data.data.map((yearData:NetworthYearlyData)=> {
      return yearData.year;
    })
  }

  public getOverAllNetworthData(): string[] {
    return this.data.data.map((yearData:NetworthYearlyData)=> {
      return yearData.values.reduce((total:number, value:string) => {
          total += parseInt(value);
          return total;
        },0).toFixed(2)
    }); 
  }
}
