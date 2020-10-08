import { Component, OnInit } from '@angular/core';
import { TesterService } from '../../Tester/tester.service';

@Component({
  selector: 'app-test-report-detail',
  templateUrl: './test-report-detail.component.html',
  styleUrls: ['./test-report-detail.component.css']
})
export class TestReportDetailComponent implements OnInit {
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
