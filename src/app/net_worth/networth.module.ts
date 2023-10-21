import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetWorthComponent } from './net-worth.component';
import { YearlyNetworthComponent } from './yearly_networth/yearly_networth.component';
import { NetworthChartComponent } from './networth_chart/networth_chart.component';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
        NetWorthComponent,
        YearlyNetworthComponent,
        NetworthChartComponent
    ]
  })
export class NetworthModule { }
