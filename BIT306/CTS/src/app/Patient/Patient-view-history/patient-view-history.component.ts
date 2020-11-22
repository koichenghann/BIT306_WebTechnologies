import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TesterService } from '../../Tester/tester.service';
import { Test } from '../../Tester/test.model';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { Observable,Subscription, interval } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector:'patient-view-history',
  templateUrl:'patient-view-history.component.html',
  styleUrls: ['patient-view-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PatientViewHistoryComponent implements OnInit {
  testReportsSub: Subscription;
  retrievingTestReport: boolean;

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

  dataSource = new MatTableDataSource();

  tables = [0];
  search = false;
  searchCriteria;
  mode = 'new';

  constructor(public userService: UserService, public testerService: TesterService, private route:Router){

  }

ngOnInit(): void{
  this.setmode();


  this.testerService.getTestsByUsername(this.userService.getCurrentUser().username);
  this.testReportsSub = this.testerService.getTestReportRetrievedListener()
    .subscribe( response => {
      console.log(response);
      this.currentTestReports = response;
      this.setmode();
      this.retrievingTestReport = false;
    });
}

ngOnDestroy() {
  this.testReportsSub.unsubscribe();
}


setmode() {
  this.mode = 'exist';
  this.dataSource = new MatTableDataSource(this.currentTestReports);
  console.log(this.currentTestReports);
  //this.loadTestReports();
  //console.log(this.testerService.getTests());
  if (this.currentTestReports.length == 0) {
    this.mode = 'empty';
  }
}

loadTestReports() {
  console.log(this.userService.getCurrentUser().username);
  console.log(this.testerService.getTestsByUsername(this.userService.getCurrentUser().username));
  //var currentPatient = this.userService.getCurrentUser().username;
  //this.currentTestReports = this.testerService.getTestByUsername(currentPatient);
  //this.currentTestReports = this.testerService.getTests();
    //this.dataSource = new MatTableDataSource(this.currentTestReports);
}

viewClickedHandler(row: Test) {
  this.testerService.setSelectedTest(row);
  this.route.navigate(['patient-view-history/detail'])
}

}
