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

  constructor(private utilService: UtilService) {
    this.data = netWorthData;
  }

  ngOnInit(): void {
    this.currentNetworth = this.utilService.getCurrencyFormat(this.getCurrentNetworth());
  }

  public getCurrentNetworth(): number {
    const result = this.data.data.reduce((accumulator:number, currentYear: NetworthYearlyData)=> {
      accumulator = currentYear.values.reduce((total:number, value:string) => {
        total += parseInt(value);
        return total;
      },0);
      return accumulator;
    },0);

    return result;
  }
}
