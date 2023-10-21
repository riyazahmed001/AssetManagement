import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetWorthComponent } from './net_worth/net-worth/net-worth.component';
import { HttpClientModule } from '@angular/common/http';
import { SalaryHomeComponent } from './salary/salary_home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalaryYearlyComponent } from './salary/salary_yearly/salary_yearly.component';
import { RetirementHomeComponent } from './retirement/retirement_home.component';
import { FormsModule } from '@angular/forms';
import { UtilService } from './services/util.service';
import { SalaryChartComponent } from './salary/salary_chart/salary_chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NetWorthComponent,
    SalaryHomeComponent,
    SalaryYearlyComponent,
    RetirementHomeComponent,
    SalaryChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
