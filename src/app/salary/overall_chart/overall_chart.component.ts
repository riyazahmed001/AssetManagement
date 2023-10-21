import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { SalaryData } from 'src/app/models/SalaryData';
import { SalaryYearlyData } from 'src/app/models/SalaryYearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'overall_chart',
  templateUrl: './overall_chart.component.html',
  styleUrls: ['./overall_chart.component.scss'],
})
export class OverAllChartComponent implements OnInit {
  @Input()
  public data!: SalaryData;

  constructor(private utilService: UtilService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let chartLabels = this.getChartLabels();
    let salaryData = this.getSalaryData();
    let savingsData = this.getSavingsData(); // rgb(153, 0, 51)

    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Average Salary',
          data: salaryData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: 'Savings',
          data: savingsData,
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
    return this.data.data.map((yearData:SalaryYearlyData)=> {
      return yearData.year;
    })
  }

  public getSalaryData(): string[] {
    return this.data.data.map((yearData:SalaryYearlyData)=> {
      return this.utilService.getAverage(yearData);
    })
  }

  public getSavingsData(): string[] {
    return this.data.data.map((yearData:SalaryYearlyData)=> {
      return this.utilService.getAverageSavings(yearData);
    })
  }
}
