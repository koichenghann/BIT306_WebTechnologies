import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-test-report-table',
  templateUrl: './test-report-table.component.html',
  styleUrls: ['./test-report-table.component.css']
})
export class TestReportTableComponent implements OnInit {
  testCentreExist: boolean = false;
  retrievingTestCentre: boolean;
  testCentreRetrieved: Subscription;
  currentTestCentre: any;
  retrievingTestReport: boolean;
  testReportRetrieved: Subscription;
  currentTestReports: Test[] = [];
  dataSource = new MatTableDataSource();

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

  tables = [0];
  // search = false;
  // searchCriteria;
  mode = 'new';



  constructor(public testCentreService: TestCentreService, public userService: UserService, public testerService: TesterService, private route:Router) { }

  ngOnInit(): void {
    this.setmode();

    this.testReportRetrieved = this.testerService.getTestReportRetrievedListener().subscribe( response => {
      this.dataSource = new MatTableDataSource(response);
      this.currentTestReports = response;
      this.retrievingTestReport = false;
      this.setmode();
    });
    this.testCentreRetrieved = this.testCentreService.getTestCentreRetrievedListener().subscribe( response => {
      this.currentTestCentre = response;
      this.testCentreExist = response != null;
      this.retrievingTestCentre = false;
      this.setmode()
      if ( this.testCentreExist ) {
        // console.log('current test centre: ' + this.currentTestCentre._id)
        // this.testKitService.getTestKitsByCentre(this.currentTestCentre._id);
        this.testerService.getTestsByCentre(this.currentTestCentre._id);
        this.retrievingTestReport = true;
      }
    });
    this.setmode();
    this.retrievingTestCentre = true;
    this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);

  }

  ngOnDestroy() {
    this.testCentreRetrieved.unsubscribe();
    this.testReportRetrieved.unsubscribe();
  }

  setmode() {
    if (this.currentTestReports.length == 0) {
      this.mode = 'empty';
    }
    this.mode = 'new';
    if (this.currentTestCentre != undefined) {
      this.mode = 'exist';
      if (this.currentTestReports.length == 0) {
        this.mode = 'empty';
      }
    }
  }



  viewClickedHandler(row: Test) {
    this.testerService.setSelectedTest(row);
    this.route.navigate(['/test-report/detail'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
