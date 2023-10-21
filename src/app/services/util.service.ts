import { Injectable } from "@angular/core";
import { YearlyData } from "../models/YearlyData";

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
    
    getTotalSalary(yearlyData: YearlyData) {
        const total = yearlyData.salary.reduce((currentTotal:number , salary: string)=>{
            return currentTotal + parseInt(salary);
        }, 0)
        
        return total;
    }

    getTotalCount(yearlyData: YearlyData): any {
        const count = yearlyData.salary.reduce((currentTotal:number , salary: string)=>{
            const count =  parseInt(salary) > 0 ? ++currentTotal: currentTotal;
            return count;
        }, 0);

        return count;
    }
}