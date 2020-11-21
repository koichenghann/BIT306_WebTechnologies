import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector:'tester-update-table',
  templateUrl:'tester-update-table.component.html',
  styleUrls: ['tester-update-table.component.css']
})
export class TesterUpdateTableComponent implements OnInit{
  testUpdateForm: FormGroup;
  selectedTest;

  userName ='';
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


  constructor(private fb: FormBuilder,
              public testCentreService: TestCentreService,
              public userService: UserService,
              public testerService: TesterService,
              private route:Router,
              private snackBar: MatSnackBar){}

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

      testID: [{value:'', disabled: true,}, [
        Validators.required,
      ]],

      username: [{value:'', disabled: true,}, [
        Validators.required,
      ]],

      resultDate: [{value:'', disabled: true,}, [
        Validators.required,
      ]],

      testResult: [{value:'', disabled: true,}, [
        Validators.required,
      ]],


    });
  }
  get testResult(){
    return this.testUpdateForm.get('testResult');
  }

  //get data
  openSnackBar() {
    this.snackBar.open('Test result has updated!','', {
      duration: 2000,
    });
  }
  onSubmit(): void {
    console.log("update submitted!");

    var updatedTestStatus = 'completed';
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    var updatedResultDate = month + '/' + day + '/' + year;
    console.log(updatedResultDate);

    var updatedTestResult = this.testResult.value;

    //testID: string, username: string, patientType: string, symptoms: string, otherSymptoms: string, description: string, testStatus: string
   // , date: string, tester: string, centre: string, testResult: string, resultDate: string

    this.testerService.updateTestResults(this.selectedTest.testID, this.selectedTest.username, this.selectedTest.patientType
      , this.selectedTest.symptoms, this.selectedTest.otherSymptopms, this.selectedTest.description, updatedTestStatus, this.selectedTest.date
      , this.selectedTest.tester, this.selectedTest.centre, updatedTestResult, updatedResultDate);

      this.currentTestReports = this.testerService.getTestsByCentre(this.userService.getCurrentUser().centre);
      this.dataSource = this.currentTestReports;


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
    this.selectedTest = this.testerService.getSelectedTest()
    console.log(this.selectedTest);

    //get username
    var selectedUsername = this.selectedTest.username;

    //get test ID
    var selectedTestID = this.selectedTest.testID;

    //get existing testResult
    var exisitingTestResult = this.selectedTest.testResult;
    //getResultDate
    //var testStatus= 'pending';
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    var resultDate = month + '/' + day + '/' + year;
    console.log(resultDate);


    this.testUpdateForm.controls.testID.setValue(selectedTestID);
    this.testUpdateForm.controls.username.setValue(selectedUsername);
    this.testUpdateForm.controls.resultDate.setValue(resultDate);
    this.testUpdateForm.controls.testResult.setValue(exisitingTestResult);
    this.testUpdateForm.controls['testResult'].enable();

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
