import { Component, OnInit } from '@angular/core';
import salaryData from 'G:/Other computers/My Laptop/Statements/Projects/AssetManagement/constants/salaryDetails.json';
import { UtilService } from '../services/util.service';
import { SalaryData } from '../models/salaryData';
import { YearlyData } from '../models/YearlyData';

@Component({
  selector: 'salary-home',
  templateUrl: './salary_home.component.html',
  styleUrls: ['./salary_home.component.scss']
})
export class SalaryHomeComponent implements OnInit {

    data:SalaryData;
    total:number = 0;
    count: number = 0;
    average: any ;
    maxSalary: any;
    minSalary: any;

    constructor(private utilService:UtilService) {
        this.data = salaryData;
    }

    ngOnInit(): void {
      let total = this.getTotalSalary(this.data);
      this.total = this.utilService.getCurrencyFormat(total);
      this.count = this.getTotalCount(this.data);
      let average =( total / this.count ).toFixed();
      this.average = this.utilService.getCurrencyFormat(average);
      this.getHighestLowest(this.data);
      this.maxSalary = this.utilService.getCurrencyFormat(this.maxSalary);
      this.minSalary = this.utilService.getCurrencyFormat(this.minSalary);
    }

    public getHighestLowest({data}: {data : YearlyData[]}) {
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


    public getTotalSalary({data}: {data : YearlyData[]}): number {
        const result =  data.reduce((total: number, year: YearlyData)=> {
            return total + this.utilService.getTotalSalary(year);
        }, 0)
        return result;
    }

    public getTotalCount({data}: {data : YearlyData[]}): any {
        const result =  data.reduce((total: number, year: YearlyData)=> {
            return total + this.utilService.getTotalCount(year);
        }, 0);

        return result;
    }
}
