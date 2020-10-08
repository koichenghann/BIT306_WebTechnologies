import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';

@Component({
  selector: 'app-test-report-table',
  templateUrl: './test-report-table.component.html',
  styleUrls: ['./test-report-table.component.css']
})
export class TestReportTableComponent implements OnInit {
  currentTestReports: Test[] = [];

  displayedColumns = ['id', 'name', 'stock', 'action'];
  dataSource = this.currentTestReports;

  tables = [0];
  search = false;
  searchCriteria;
  mode = 'new';

  constructor(public testCentreService: TestCentreService, public userService: UserService, public testerService: TesterService, private route:Router) { }

  ngOnInit(): void {
  }

  setmode() {
    this.mode = 'new';
    if (this.checkTestCentreExist()) {
      this.mode = 'exist';
      this.loadTestReports();
      console.log(this.testerService.getTests());
      if (this.currentTestReports.length == 0) {
        this.mode = 'empty';
      }
    }
  }
  checkTestCentreExist() {
    return this.testCentreService.getTestCentre(this.userService.getCurrentUser().id) != undefined
  }
  loadTestReports() {
    // this.currentTestReports = this.testCentreService.
    // this.dataSource = this.currentTestReports;
  }




  //method for search feature
  searchClickedHandler() {
    if ( this.search ) {
      this.searchCriteria = '';
      this.search = false;
      this.dataSource = this.currentTestReports;
    }
  }
  onSearchHandler(criteria: string) {
    console.log('seach triggered: ', this.searchCriteria);
    if ( criteria == '' ) {
      this.dataSource = this.currentTestReports;
      this.search = false;
      return;
    }
    this.search = true;
    this.dataSource = this.currentTestReports.filter(item => item.testID == criteria || item.username.includes(criteria));
  }
  onBlurHandler(criteria: string) {
    console.log('blur handler ran: ', criteria);
    if ( criteria == '' || criteria == undefined ) {
      this.dataSource = this.currentTestReports;
      this.searchClickedHandler();
    }

  }

}
