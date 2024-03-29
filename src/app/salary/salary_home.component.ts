import { Component, OnInit } from '@angular/core';
import jsonData from 'G:/Other computers/My Laptop/Statements/Projects/AssetManagement/constants/salaryDetails.json';
import { UtilService } from '../services/util.service';
import { SalaryData } from '../models/SalaryData';
import { SalaryYearlyData } from '../models/SalaryYearlyData';

@Component({
  selector: 'salary-home',
  templateUrl: './salary_home.component.html',
  styleUrls: ['./salary_home.component.scss']
})
export class SalaryHomeComponent implements OnInit {

    data:SalaryData;
    total:number = 0;
    savingsTotal: number = 0;
    savingsPercentage: any = "0";
    count: number = 0;
    average: any ;
    maxSalary: any;
    minSalary: any;

    constructor(private utilService:UtilService) {
        this.data = jsonData;
    }

    ngOnInit(): void {
      let total = this.getTotalSalary(this.data);
      this.total = this.utilService.getCurrencyFormat(this.getTotalSalary(this.data));
      this.count = this.getTotalCount(this.data);
      let average =( total / this.count ).toFixed();
      this.average = this.utilService.getCurrencyFormat(average);
      this.getHighestLowest(this.data);
      this.maxSalary = this.utilService.getCurrencyFormat(this.maxSalary);
      this.minSalary = this.utilService.getCurrencyFormat(this.minSalary);

      let savingsTotal = this.getTotalSavings();
      this.savingsTotal = this.utilService.getCurrencyFormat(savingsTotal);
      this.savingsPercentage = ((savingsTotal * 100)/total).toFixed(2);
    }

    public getHighestLowest({data}: {data : SalaryYearlyData[]}) {
        this.maxSalary = 0;
        this.minSalary = Number.MAX_VALUE;
        for(const year in data)
        {
            for(const salary in data[year].salary) {
                if(parseInt(data[year].salary[salary]) > this.maxSalary) {
                    this.maxSalary = parseInt(data[year].salary[salary]);
                }
                if(parseInt(data[year].salary[salary]) < this.minSalary && parseInt(data[year].salary[salary]) != 0) {
                    this.minSalary = parseInt(data[year].salary[salary]);
                }
            }
        }
    }

    public getTotalSavings(): number {
        const result = this.data.data.reduce((accumulator:number, yearlydata:SalaryYearlyData)=> {
            accumulator += this.utilService.getTotalSavings(yearlydata);
            return accumulator;
        }, 0);

        return result;
    }

    public getTotalSalary({data}: {data : SalaryYearlyData[]}): number {
        const result =  data.reduce((total: number, year: SalaryYearlyData)=> {
            return total + this.utilService.getTotalSalary(year);
        }, 0)
        return result;
    }

    public getTotalCount({data}: {data : SalaryYearlyData[]}): any {
        const result =  data.reduce((total: number, year: SalaryYearlyData)=> {
            return total + this.utilService.getTotalCount(year);
        }, 0);

        return result;
    }
}
