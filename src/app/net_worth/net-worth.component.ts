import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import netWorthData from 'G:/Other computers/My Laptop/Statements/Projects/AssetManagement/constants/netWorthDetails.json';
import { NetworthData } from 'src/app/models/NetworthData';
import { NetworthYearlyData } from 'src/app/models/NetworthYearlyData';
@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss'],
})
export class NetWorthComponent implements OnInit {
  data: NetworthData;
  currentNetworth: number = 0;
  timesAnnualExpense: string = "";
  lastEntryInNetworth: NetworthYearlyData;

  constructor(private utilService: UtilService) {
    this.data = netWorthData;
    this.lastEntryInNetworth = netWorthData.data.slice(-1)[0];
  }

  public get currentYearExpense() {
    return this.utilService.getCurrencyFormat(this.lastEntryInNetworth?.currentYearExpense);
  }

  ngOnInit(): void {
    this.currentNetworth = this.utilService.getCurrencyFormat(this.getCurrentNetworth());
    this.timesAnnualExpense = this.getTimesAnnualExpense();
  }

  public getCurrentNetworth(): number {
    const result = this.lastEntryInNetworth.values.reduce((total:number, value:string) => {
        total += parseInt(value);
        return total;
      },0);

    return result;
  }

  public getTimesAnnualExpense(): string {
    const result = this.lastEntryInNetworth.values.reduce((total:number, value:string) => {
        total += parseInt(value);
        return total;
    },0);
    return (result/parseFloat(this.lastEntryInNetworth.currentYearExpense)).toFixed(2);
  }
}
