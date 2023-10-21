import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetWorthComponent } from './net_worth/net-worth.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetirementHomeComponent } from './retirement/retirement_home.component';
import { FormsModule } from '@angular/forms';
import { UtilService } from './services/util.service';
import { SalaryModule } from './salary/salary.module';
import { NetworthModule } from './net_worth/networth.module';

@NgModule({
  declarations: [
    AppComponent,
    RetirementHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SalaryModule,
    NetworthModule
  ],
  providers: [
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
