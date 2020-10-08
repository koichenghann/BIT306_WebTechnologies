import { Component, OnInit } from '@angular/core';
import { TesterService } from '../../Tester/tester.service';

@Component({
  selector:'patient-view-details',
  templateUrl:'patient-table-details.component.html',
  styleUrls: ['patient-table-details.component.css']
})

export class PatientTableDetailsComponent implements OnInit {
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
