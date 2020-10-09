import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';

@Component({
  selector:'tester-update-table',
  templateUrl:'tester-update-table.component.html',
  styleUrls: ['tester-update-table.component.css']
})
export class TesterUpdateTableComponent implements OnInit{
  testUpdateForm: FormGroup;

  currentTestReports: Test[] = [];
  displayedColumns = ['testID',
                      'username',
                      'patientType',
                      // 'symptoms',
                      // 'description',
                      // 'otherSymptoms',
                      'testStatus',
                      'date',
                      'testResult',
                      'resultDate',
                      // 'tester',
                      'action'

                    ];
  dataSource = this.currentTestReports;

  tables = [0];
  search = false;
  searchCriteria;
  mode = 'new';


  constructor(private fb: FormBuilder, public testCentreService: TestCentreService, public userService: UserService, public testerService: TesterService, private route:Router){}

  ngOnInit(){
    this.initializeForm();
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

  initializeForm(): void{
    this.testUpdateForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],

      resultDate: ['', [
        Validators.required,
      ]],

      testResult: ['', [
        Validators.required,
      ]],


    });
  }


  onSubmit(): void {

  }


  //update test table
  loadTestReports() {
    // console.log('currentUser: ', this.userService.getCurrentUser())
    // console.log('test centre: ', this.userService.getCurrentUser().centre);
    // console.log('all test: ', this.testerService.getTests());
    // console.log('test by centre: ', this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre));

    this.currentTestReports = this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre);
    this.dataSource = this.currentTestReports;
  }

  //edit test result
  viewClickedHandler(row: Test) {
    this.testerService.setSelectedTest(row);
    this.route.navigate(['tester-update-test/details']);
  }

  editClickedHandler(row: Test){
    this.testerService.setSelectedTest(row);
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
