import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from './test.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TesterService {


  constructor(private http: HttpClient, private router:Router){}
  private tests: Test[] = [];
  private selectedTest: Test;


  testID: string;
  username: string;
  patientType: string;
  symptoms: string;
  testStatus: string;
  date: string;

  private testReportRetrievedListener = new Subject<Test[]>();
  private testReportCreatedListener = new Subject<Test[]>();
  private testReportUpdatedListener = new Subject<Test[]>();
  private testReportDeletedListener = new Subject<boolean>();

  getTestReportRetrievedListener() {
    return this.testReportRetrievedListener;
  }
  getTestReportCreatedListener() {
    return this.testReportCreatedListener;
  }
  getTestReportUpdatedListener() {
    return this.testReportUpdatedListener;
  }
  getTestReportDeletedListener() {
    return this.testReportDeletedListener;
  }

  getTests(){
    this.downloadTests();
    return this.tests;
  }




  getTest(tester: string){
    this.downloadTests();
    return this.tests.find(test => test.tester == tester)

  }

  getTestByUsername(username: string){
    this.downloadTests();
    return this.tests.filter(test => test.username == username);
  }


  //testID generator
  generateTestID(){
    this.downloadTests();
    // return "TRD"+(this.getTests().length+1);
    if ( this.tests.length > 0 ) {
      return "TRD" + (parseInt(this.tests[this.tests.length-1].testID.replace('TRD',''), 10)+1);
    }
    return 'TRD1';
  }


  //add new test report
  addTest(username: string, patientType: string, symptoms: string, otherSymptoms:string, description: string, testStatus: string, date: string, tester: string
    , centre: string, testResult: string, resultDate: string){
    //this.downloadTests();
    //var testID = this.generateTestID();
    const testReport: Test = {
                          id: null,
                          testID: null,
                          username: username,
                          patientType: patientType,
                          symptoms: symptoms,
                          description:description,
                          otherSymptoms:otherSymptoms,
                          testStatus: testStatus,
                          date: date,
                          tester: tester,
                          centre: centre,
                          testResult: testResult,
                          resultDate: resultDate
                          };
    //this.tests.push(test);
    //this.uploadTests();
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/test-report/createTestReport', testReport).subscribe(response => {
      console.log(response);
      testReport.id = response.id;
      this.tests.push(testReport);
      this.testReportCreatedListener.next([...this.tests]);
    }, error => {

    })
  }

  getTestsByUsername(username: string) {
    this.http.post<{message: string, testResports: any}>('http://localhost:3000/api/test-report/getTestsByUsername', { username : username})
    .pipe(map(data => {
      return data.testResports.map ( testReports => {
        return {
          id: testReports._id,
          testID: testReports.testID,
           username: testReports.username,
           patientType: testReports.patientType,
           symptoms: testReports.symptoms,
           description: testReports.description,
           otherSymptoms: testReports.otherSymptoms,
           testStatus: testReports.testStatus,
           date: testReports.date,
           tester: testReports.tester,
           centre: testReports.centre,
           testResult: testReports.testResult,
           resultDate: testReports.resultDate
        }
      })
    }))
    .subscribe( response =>{
      this.tests = response;
      this.testReportRetrievedListener.next([...this.tests]);
      console.log(this.testReportRetrievedListener.next([...this.tests]));
     }, error => {
      // console.log('get Test Report failed');
    })
  }


  getTestsByCentre(centre: string) {
    // this.downloadTests();
     // console.log('downloaded test: ', this.tests);
     //if ( this.tests.length != 0 ) {
       //return this.tests.filter(test => test.centre == centre);
    // }
     //return [];
     this.http.post<{message: string, testReports: any}>('http://localhost:3000/api/test-report/getTestReport', {centre : centre})
     .pipe(map(data =>{
       return data.testReports.map( testReports =>{
         return {
                          id: testReports._id,
                          testID: testReports.testID,
                           username: testReports.username,
                           patientType: testReports.patientType,
                           symptoms: testReports.symptoms,
                           description: testReports.description,
                           otherSymptoms: testReports.otherSymptoms,
                           testStatus: testReports.testStatus,
                           date: testReports.date,
                           tester: testReports.tester,
                           centre: testReports.centre,
                           testResult: testReports.testResult,
                           resultDate: testReports.resultDate
         }
       });
     }))
     .subscribe( response =>{
      this.tests = response;
      this.testReportRetrievedListener.next([...this.tests]);
      console.log(response);
     }, error => {
      // console.log('get Test Report failed');
    })
     //console.log("getTestsByCentre's response: " +this.tests);
     //return this.tests;
   }


  //update exisitng test data
  updateTestReport(id: string, testID: string, username: string, patientType: string, symptoms: string, otherSymptoms: string, description: string, testStatus: string
    , date: string, tester: string, centre: string, testResult: string, resultDate: string ){

    const testReport :Test = {
                          id: id,
                          testID: testID,
                          username: username,
                          patientType: patientType,
                          symptoms: symptoms,
                          description:description,
                          otherSymptoms:otherSymptoms,
                          testStatus: testStatus,
                          date: date,
                          tester: tester,
                          centre: centre,
                          testResult: testResult,
                          resultDate: resultDate
    };
    this.http.put('http://localhost:3000/api/test-report/' + id, testReport)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });

    var test = this.tests.find(test => test.tester == tester);
    //test.username= username;
    //test.patientType = patientType;
    //test.symptoms = symptoms;
    test.testStatus = testStatus;
    test.resultDate = resultDate;
    test.testResult = testResult;
    this.uploadTests();
   }

  deleteTestReport(id:string){
    this.http.delete('http://localhost:3000/api/test-report/' + id)
    .subscribe(response =>{
      console.log('test report deleted: ' + response);
      this.testReportDeletedListener.next(true);
    }, error => {
      console.log(error);
    })
  }




   //update test result used
   /*
   updateTestResults(testID: string, username: string, patientType: string, symptoms: string, otherSymptoms: string, description: string, testStatus: string
    , date: string, tester: string, centre: string, testResult: string, resultDate: string ){
    var test = this.tests.find(test => test.testID == testID);
    //test.username= username;
    //test.patientType = patientType;
    //test.symptoms = symptoms;
    test.testStatus = testStatus;
    test.resultDate = resultDate;
    test.testResult = testResult;
    this.uploadTests();
   }
   */









  //update data to localstorage
  uploadTests(){
    localStorage.setItem('test', JSON.stringify(this.tests));
  }

  //retrieve data from localstorage
  downloadTests(){
    this.tests = JSON.parse(localStorage.getItem('test'));
    if (this.tests == null){
      this.tests = [];
    }
  }


  //methods related to handling selected test
  setSelectedTest(test: Test) {
    this.selectedTest = test;
    this.uploadSelectedTest();
  }
  getSelectedTest() {
    this.downloadSelectedTest();
    console.log('selected test: ',this.selectedTest);
    return this.selectedTest;
  }
  clearSelectedTest() {
    this.selectedTest = undefined;
    this.removeSelectedTester();
  }
  uploadSelectedTest() {
    localStorage.setItem('selectedTest', JSON.stringify(this.selectedTest));
  }
  downloadSelectedTest() {
    this.selectedTest = JSON.parse(localStorage.getItem('selectedTest'));
    if ( this.tests == null ) {
      this.tests = [];
    }
  }
  removeSelectedTester() {
    localStorage.removeItem('selectedTest');
  }


}
