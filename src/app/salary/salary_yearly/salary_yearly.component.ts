import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SalaryYearlyData } from '../../models/SalaryYearlyData';

@Component({
  selector: 'salary-yearly',
  templateUrl: './salary_yearly.component.html',
  styleUrls: ['./salary_yearly.component.scss'],
})
export class SalaryYearlyComponent implements OnInit {
  @Input()
  public yearlyData!: SalaryYearlyData;

  public closeButton: boolean = false;
  total: any;
  count: any;
  average: any;
  maxSalary: any;
  minSalary: any;
  totalSavings: any;
  savingsPercentage: any;
  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    let total = this.utilService.getTotalSalary(this.yearlyData);
    this.total = this.utilService.getCurrencyFormat(total);

    this.count = this.utilService.getTotalCount(this.yearlyData);
    let average = (total / this.count).toFixed();
    this.average = this.utilService.getCurrencyFormat(average);
    this.getHighestLowest(this.yearlyData);
    this.maxSalary = this.utilService.getCurrencyFormat(this.maxSalary);
    this.minSalary = this.utilService.getCurrencyFormat(this.minSalary);

    let totalSavings = this.utilService.getTotalSavings(this.yearlyData)
    this.totalSavings = this.utilService.getCurrencyFormat(totalSavings);

    this.savingsPercentage = ((totalSavings * 100)/total).toFixed(2);
  }

  getHighestLowest(yearlyData: any) {
    this.maxSalary = 0;
    this.minSalary = Number.MAX_VALUE;
    for (const month in yearlyData.salary) {
      if (parseInt(yearlyData.salary[month]) > this.maxSalary) {
        this.maxSalary = parseInt(yearlyData.salary[month]);
      }
      if (
        parseInt(yearlyData.salary[month]) < this.minSalary &&
        parseInt(yearlyData.salary[month]) != 0
      ) {
        this.minSalary = parseInt(yearlyData.salary[month]);
      }
    }
  }

  public showCloseButton() {
    this.closeButton = !this.closeButton;
  }

}
