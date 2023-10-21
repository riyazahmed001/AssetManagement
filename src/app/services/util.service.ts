import { Injectable } from "@angular/core";
import { SalaryYearlyData } from "../models/SalaryYearlyData";

@Injectable()
export class UtilService {
    constructor(){

    }
    public getCurrencyFormat(x:any) {
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    
    getTotalSalary(yearlyData: SalaryYearlyData): number {
        const total = yearlyData.salary.reduce((currentTotal:number , salary: string)=>{
            return currentTotal + parseInt(salary);
        }, 0)
        
        return total;
    }

    getTotalCount(yearlyData: SalaryYearlyData): number {
        const count = yearlyData.salary.reduce((currentTotal:number , salary: string)=>{
            const count =  parseInt(salary) > 0 ? ++currentTotal: currentTotal;
            return count;
        }, 0);
        return count;
    }

    getAverage(yearlyData: SalaryYearlyData): string {
        return (this.getTotalSalary(yearlyData)/this.getTotalCount(yearlyData)).toFixed(2);
    }

    getTotalSavings(yearlyData: SalaryYearlyData): number {
        const total = yearlyData.savings?.reduce((currentTotal:number , savings: string)=>{
            return currentTotal + parseInt(savings);
        }, 0)
        
        return total|| 0;
    }

    getTotalCountSavings(yearlyData: SalaryYearlyData): number {
        const count = yearlyData.savings?.reduce((currentTotal:number , savings: string)=>{
            const count =  parseInt(savings) > 0 ? ++currentTotal: currentTotal;
            return count;
        }, 0);
        return count|| 0;
    }

    getAverageSavings(yearlyData: SalaryYearlyData): string {
        return ((this.getTotalSavings(yearlyData)/this.getTotalCountSavings(yearlyData)) || 0).toFixed(2);
    }
}