import { Component, Input, OnInit } from '@angular/core';
import { NetworthData } from 'src/app/models/NetworthData';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'overall_networth',
  templateUrl: './overall_networth.component.html',
  styleUrls: ['./overall_networth.component.scss'],
})
export class OverallNetworthComponent implements OnInit {
  
  @Input()
  public data!: NetworthData;
  public closeButton: boolean = false;

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    
  }

  
  public showCloseButton() {
    this.closeButton = !this.closeButton;
  }

}
