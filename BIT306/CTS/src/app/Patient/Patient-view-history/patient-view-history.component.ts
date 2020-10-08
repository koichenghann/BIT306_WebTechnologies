import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { TesterService } from '../../Tester/tester.service';
import { Test } from '../../Tester/test.model';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';

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

  constructor(public userService: UserService, public testerService: TesterService, private route:Router){

  }

ngOnInit(): void{
  this.setmode();
}
setmode() {
  this.mode = 'exist';
  this.loadTestReports();
  console.log(this.testerService.getTests());
  if (this.currentTestReports.length == 0) {
    this.mode = 'empty';
  }
}

loadTestReports() {
  //this.currentTestReports = this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre);
  this.currentTestReports = this.testerService.getTests();
    this.dataSource = this.currentTestReports;
}

viewClickedHandler(row: Test) {
  this.testerService.setSelectedTest(row);
  this.route.navigate(['patient-view-history/detail'])
}

}
