import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverAllSalaryComponent } from './overall_salary/overall_salary.component';
import { SalaryChartComponent } from './salary_chart/salary_chart.component';
import { SalaryHomeComponent } from './salary_home.component';
import { SalaryYearlyComponent } from './salary_yearly/salary_yearly.component';
import { OverAllChartComponent } from './overall_chart/overall_chart.component';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
        SalaryHomeComponent,
        SalaryYearlyComponent,
        SalaryChartComponent,
        OverAllSalaryComponent,
        OverAllChartComponent
    ]
  })
export class SalaryModule { }
