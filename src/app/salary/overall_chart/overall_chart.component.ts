import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { SalaryData } from 'src/app/models/SalaryData';
import { YearlyData } from 'src/app/models/YearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'overall_chart',
  templateUrl: './overall_chart.component.html',
  styleUrls: ['./overall_chart.component.scss'],
})
export class OverAllChartComponent implements OnInit {
  @Input()
  public data!: SalaryData;

  public closeButton: boolean = false;

  constructor(private utilService: UtilService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let chartLabels = this.getChartLabels();
    let salaryData = this.getSalaryData();
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Year vs Average Salary',
          data: salaryData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
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
    return this.data.data.map((yearData:YearlyData)=> {
      return yearData.year;
    })
  }

  public getSalaryData(): string[] {
    return this.data.data.map((yearData:YearlyData)=> {
      return this.utilService.getAverage(yearData);
    })
  }

}
