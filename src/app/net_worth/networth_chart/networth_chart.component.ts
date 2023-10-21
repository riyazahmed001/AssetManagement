import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { NetworthData } from 'src/app/models/NetworthData';
import { NetworthYearlyData } from 'src/app/models/NetworthYearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'networth_chart',
  templateUrl: './networth_chart.component.html',
  styleUrls: ['./networth_chart.component.scss'],
})
export class NetworthChartComponent implements OnInit {

  @Input()
  public lastEntryInNetworth!: NetworthYearlyData;
  
  constructor(private utilService: UtilService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    
    const chartLabels = this.getChartLabels();

    const chartValues = this.getChartValues();
    const chartData = {
      labels: chartLabels,
      datasets: [{
        label: 'networth split up',
        data: chartValues,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(153, 0, 51)',
          'rgb(102, 0, 204)',
          'rgb(128, 255, 128)'
        ],
        hoverOffset: 4
      }],
    };

    const options = {
      radius: '75%',
    }

    var myChart = new Chart(`myChart`, {
      type: 'doughnut',
      data: chartData,
      options: options
    });
  }

  public getChartLabels(): string[] {
    return this.lastEntryInNetworth.asset;
  }
  
  public getChartValues(): string[] {
    return this.lastEntryInNetworth.values;
  }
}
