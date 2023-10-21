import { Component, Input, OnInit } from '@angular/core';
import { NetworthYearlyData } from 'src/app/models/NetworthYearlyData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'yearly_networth',
  templateUrl: './yearly_networth.component.html',
  styleUrls: ['./yearly_networth.component.scss'],
})
export class YearlyNetworthComponent implements OnInit {
  
  @Input()
  public lastEntryInNetworth!: NetworthYearlyData;
  public closeButton: boolean = false;
  currentNetworth: number = 0;
  timesAnnualExpense: string = "";

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.currentNetworth = this.utilService.getCurrencyFormat(this.getCurrentNetworth());
    this.timesAnnualExpense = this.getTimesAnnualExpense();
  }

  public get currentYearExpense() {
    return this.utilService.getCurrencyFormat(this.lastEntryInNetworth?.currentYearExpense);
  }
  
  public showCloseButton() {
    this.closeButton = !this.closeButton;
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
