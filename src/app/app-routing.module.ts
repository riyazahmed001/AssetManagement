import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetWorthComponent } from './net_worth/net-worth.component';
import { RetirementHomeComponent } from './retirement/retirement_home.component';
import { SalaryHomeComponent } from './salary/salary_home.component';

const routes: Routes = [
  { path: '',   redirectTo: '/salary', pathMatch: 'full' },
  { path: 'salary', component: SalaryHomeComponent},
  { path: 'net_worth', component: NetWorthComponent},
  { path: 'retirement', component: RetirementHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
