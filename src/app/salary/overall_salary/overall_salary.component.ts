import { Component, Input, OnInit } from '@angular/core';
import { SalaryData } from 'src/app/models/salaryData';

@Component({
  selector: 'overall_salary',
  templateUrl: './overall_salary.component.html',
  styleUrls: ['./overall_salary.component.scss'],
})
export class OverAllSalary implements OnInit {
  @Input()
  public data!: SalaryData;

  public closeButton: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }

  public showCloseButton() {
    this.closeButton = true;
  }

  public closeExpandCollapse() {
    this.closeButton = false;
  }
}
