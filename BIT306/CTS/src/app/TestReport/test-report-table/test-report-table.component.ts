import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-report-table',
  templateUrl: './test-report-table.component.html',
  styleUrls: ['./test-report-table.component.css']
})
export class TestReportTableComponent implements OnInit {
  currentTestReports: Test[] = [];

  displayedColumns = ['testID',
                      'username',
                      'patientType',
                      // 'symptoms',
                      // 'description',
                      // 'otherSymptoms',
                      'testStatus',
                      'date',
                      // 'tester',
                      'action'
                    ];
  dataSource = this.currentTestReports;

  tables = [0];
  search = false;
  searchCriteria;
  mode = 'new';


  testReportRetrieved: Subscription;
  retrievingTestReport: boolean;

  constructor(public testCentreService: TestCentreService, public userService: UserService, public testerService: TesterService, private route:Router) { }

  ngOnInit(): void {
    this.setmode();

    this.testReportRetrieved = this.testerService.getTestReportRetrievedListener().subscribe( response => {
      this.currentTestReports = response;
      this.retrievingTestReport = false;
      this.setmode();
    });
  }

  setmode() {
    this.mode = 'exist';
    this.loadTestReports();
    console.log(this.testerService.getTests());
    if (this.currentTestReports.length == 0) {
      this.mode = 'empty';
    }
  }
  // checkTestCentreExist() {
  //   return this.testCentreService.getTestCentre(this.userService.getCurrentUser().id) != undefined
  // }
  loadTestReports() {
    // console.log('currentUser: ', this.userService.getCurrentUser())
    // console.log('test centre: ', this.userService.getCurrentUser().centre);
    // console.log('all test: ', this.testerService.getTests());
    // console.log('test by centre: ', this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre));

    //this.currentTestReports = this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre);
    this.dataSource = this.currentTestReports;
  }

  viewClickedHandler(row: Test) {
    this.testerService.setSelectedTest(row);
    this.route.navigate(['/test-report/detail'])
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
    if ( criteria == '' ) {
      this.dataSource = this.currentTestReports;
      this.search = false;
      return;
    }
    this.search = true;
    this.dataSource = this.currentTestReports.filter(
      item => item.testID.includes(criteria) ||
      item.username.includes(criteria) ||
      item.patientType.includes(criteria) ||
      item.testStatus.includes(criteria) ||
      item.date.includes(criteria));
  }
  onBlurHandler(criteria: string) {
    console.log('blur handler ran: ', criteria);
    if ( criteria == '' || criteria == undefined ) {
      this.dataSource = this.currentTestReports;
      this.searchClickedHandler();
    }

  }

}
