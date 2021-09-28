import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import netWorthData from 'D:/O/Riyaz/Statements/Projects/AssetManagement/constants/netWorthDetails.json';

@Component({
  selector: 'retirement-home',
  templateUrl: './retirement_home.component.html',
  styleUrls: ['./retirement_home.component.scss']
})
export class RetirementHomeComponent implements OnInit {
    data:any;
    example:string ="test value";
    ngOnInit(): void {
        this.data = netWorthData.data;
    }

    onSubmit(formValues: NgForm) {
      console.log(formValues.value.inflation);  // { first: '', last: '' }
      console.log(formValues.valid);  // false
    }
}


