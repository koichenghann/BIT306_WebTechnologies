import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Test } from './test.model';

@Injectable({
  providedIn: 'root'
})
export class TesterService {


  constructor(){}

  private tests: Test[] = [];
  private selectedTest: Test;

  testID: string;
  username: string;
  patientType: string;
  symptoms: string;
  testStatus: string;
  date: string;

  getTests(){
    this.downloadTests();
    return this.tests;
  }

  getTestsByCentre(centre: string) {

    this.downloadTests();
    // console.log('downloaded test: ', this.tests);
    if ( this.tests.length != 0 ) {
      return this.tests.filter(test => test.centre == centre);
    }
    return [];
  }


  getTest(tester: string){
    this.downloadTests();
    return this.tests.find(test => test.tester == tester)
  }

  generateTestID(){
    this.downloadTests();
    // return "TRD"+(this.getTests().length+1);
    if ( this.tests.length > 0 ) {
      return "TRD" + (parseInt(this.tests[this.tests.length-1].testID.replace('TRD',''), 10)+1);
    }
    return 'TRD1';
  }

  addTest(username: string, patientType: string, symptoms: string, otherSymptoms:string, description: string, testStatus: string, date: string, tester: string
    , centre: string, testResult: string, resultDate: string){
    this.downloadTests();
    var testID = this.generateTestID();
    const test: Test = {  testID: testID,
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
    this.tests.push(test);
    this.uploadTests();
  }


  //update exisitng test data
  updateTest(testID: string, username: string, patientType: string, symptoms: string, otherSymptoms: string, description: string, testStatus: string
    , date: string, tester: string, centre: string, testResult: string, resultDate: string ){
    this.uploadTests();
    var test = this.tests.find(test => test.tester == tester);
    //test.username= username;
    test.patientType = patientType;
    test.symptoms = symptoms;
    test.testStatus = testStatus;
    test.otherSymptoms = otherSymptoms;
    test.resultDate = resultDate;
    test.testResult = testResult;
   }


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
  }
  removeSelectedTester() {
    localStorage.removeItem('selectedTest');
  }


}
