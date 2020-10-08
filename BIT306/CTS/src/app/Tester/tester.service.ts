import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Test } from './test.model';

@Injectable({
  providedIn: 'root'
})
export class TesterService {


  constructor(){}

  private tests: Test[] = [];

  testID: string;
  username: string;
  patientType: string;
  symptoms: string;
  testStatus: string;
  date: string;

  getTests(){
    this.downloadTests();
    return this.getTests;
  }


  getTest(tester: string){
    this.downloadTests();
    return this.tests.find(test => test.tester == tester)
  }

  generateTestID(){
    this.downloadTests();
    return "TRD"+(this.getTests().length+1);
  }

  addTest(username: string, patientType: string, symptoms: string, otherSymptoms:string, description: string, testStatus: string, date: string, tester: string){
    this.downloadTests();
    var testID = this.generateTestID();
    const test: Test = { testID: testID, username: username, patientType: patientType,  symptoms: symptoms, description:description, otherSymptoms:otherSymptoms, testStatus: testStatus, date: date, tester: tester};
    this.tests.push(test);
    this.uploadTests();
  }


  //update exisitng test data
  updateTest(testID: string, username: string, patientType: string, symptoms: string, otherSymptoms: string, description: string, testStatus: string, date: string, tester: string){
    this.uploadTests();
    var test = this.tests.find(test => test.tester == tester);
    //test.username= username;
    test.patientType = patientType;
    test.symptoms = symptoms;
    test.testStatus = testStatus;
    test.otherSymptoms = otherSymptoms;
   }


  //update data to localstorage
  uploadTests(){
    localStorage.setItem('test', JSON.stringify(this.tests));
  }

  //retrieve data from localstorage
  downloadTests(){
    this.tests = JSON.parse(localStorage.getItem('item'));
    if (this.tests == null){
      this.tests = [];
    }
  }





}
