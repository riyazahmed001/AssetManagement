import { Component, OnInit } from '@angular/core';
import salaryData from 'G:/Other computers/My Laptop/Statements/Projects/AssetManagement/constants/salaryDetails.json';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'salary-home',
  templateUrl: './salary_home.component.html',
  styleUrls: ['./salary_home.component.scss']
})
export class SalaryHomeComponent implements OnInit {

    data:any;
    total:number = 0;
    count: number = 0;
    average: any ;
    maxSalary: any;
    minSalary: any;

    constructor(private utilService:UtilService) {
    }

    ngOnInit(): void {
      this.data = salaryData.data;
      let total = this.getTotalSalary(this.data);
      this.total = this.utilService.getCurrencyFormat(total);
      this.count = this.getTotalCount(this.data);
      let average =( total / this.count ).toFixed();
      this.average = this.utilService.getCurrencyFormat(average);
      this.getHighestLowest(this.data);
      this.maxSalary = this.utilService.getCurrencyFormat(this.maxSalary);
      this.minSalary = this.utilService.getCurrencyFormat(this.minSalary);
    }

    public getHighestLowest(data: any) {
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


    public getTotalSalary(data: any): any {
        let total = 0 ;
        for(const year in data)
        {
            for(const salary in data[year].salary) {
                total += parseInt(data[year].salary[salary]);
            }
        }
        return total;
    }

    public getTotalCount(data: any): any {
        let count = 0 ;
        for(const year in data)
        {
            for(const salary in data[year].salary) {
                count = parseInt(data[year].salary[salary]) > 0 ? ++count :count;
            }
        }
        return count;
    }

}
