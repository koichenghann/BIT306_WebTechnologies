import { Component, OnInit } from '@angular/core';
import { TesterService } from '../../Tester/tester.service';

@Component({
  selector:'tester-view-details',
  templateUrl:'tester-view-details.component.html',
  styleUrls: ['tester-view-details.component.css']
})

export class TesterViewDetailsComponent implements OnInit {
  selectedTest;
  constructor( public testerService: TesterService) { }

  ngOnInit(): void {
    this.selectedTest = this.testerService.getSelectedTest();
    this.setmode();
    console.log(this.selectedTest);
  }

  mode = 'new';
  setmode() {
    this.mode = 'exist';
    if ( this.selectedTest == null || this.selectedTest == undefined ) {
      this.mode = 'new';
    }
  }

}
