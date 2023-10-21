import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { SalaryYearlyData } from 'src/app/models/SalaryYearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'salary-chart',
  templateUrl: './salary_chart.component.html',
  styleUrls: ['./salary_chart.component.scss'],
})
export class SalaryChartComponent implements OnInit {
  @Input()
  public yearlyData!: SalaryYearlyData;
  public year: string;

  constructor(private utilService: UtilService) {
    this.year = this.yearlyData?.year;
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    let chartLabels = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];
    let salaryData = this.getSalaryData();
    let savingsData = this.getSavingsData();
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: 'Salary',
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
          }
      ],
    };
    var myChart = new Chart(`myChart`, {
      type: 'line',
      data: data,
    });
  }

  getSalaryData() {
    let salaryData = [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ];
    for (let i = 0; i < 12; i++) {
      salaryData[i] = this.yearlyData.salary[i];
    }
    return salaryData;
  }

  getSavingsData() {
    let savingsData = [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ];
    for (let i = 0; i < 12; i++) {
        if(this.yearlyData.savings?.[i]) {
            savingsData[i] = this.yearlyData.savings[i];
        } 
    }
    return savingsData;
  }
}
