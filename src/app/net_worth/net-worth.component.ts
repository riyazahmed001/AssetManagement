import { Component, OnInit } from '@angular/core';
import netWorthData from 'G:/Other computers/My Laptop/Statements/Projects/AssetManagement/constants/netWorthDetails.json';
import { NetworthData } from 'src/app/models/NetworthData';

@Component({
  selector: 'app-net-worth',
  templateUrl: './net-worth.component.html',
  styleUrls: ['./net-worth.component.scss'],
})
export class NetWorthComponent implements OnInit {
  data: NetworthData;

  constructor() {
    this.data = netWorthData;
  }

  ngOnInit(): void {}
}
