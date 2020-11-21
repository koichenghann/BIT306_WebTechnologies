import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestCentre } from './test-centre.model';

@Injectable({
  providedIn: 'root'
})
export class TestCentreService {
  private testCentreRetrievedListener = new Subject<TestCentre>();

  constructor(private http: HttpClient, private router:Router) { }

  private testCentres: TestCentre[] = [];
  private testCentre: TestCentre;
  currentTestCentre: TestCentre;


  getTestCentreRetrievedListener() {
    return this.testCentreRetrievedListener.asObservable();
  }

  getTestCentres(){
    this.downloadTestCentre();
    return this.testCentres;
  }
  getCurrentTestCentre() {
    this.downloadTestCentre();
    return this.currentTestCentre;
  }
  // getTestCentre(officer: string){
  //
  //   this.http.get<{message: string, testCentre: any}>('http://localhost:3000/api/test-centre', {officerId: officer})
  //   .pipe(map((testCentreData) => {
  //     return testCentreData.testCentre.map(testCentre => {
  //       return {
  //         id: testCentre._id,
  //         state: testCentre.state,
  //         address: testCentre.address,
  //         officer: testCentre.officer,
  //         contact: testCentre.contact,
  //       };
  //     });
  //   }))
  //   .subscribe((transformedTestCentre) => {
  //     this.testCentre = transformedTestCentre;
  //     this.uploadTestCentre();
  //     this.testCentreRetrievedListener.next(this.testCentre);
  //   }, (error) => {
  //     this.testCentre = undefined;
  //     this.uploadTestCentre();
  //     this.testCentreRetrievedListener.next(undefined);
  //   });
  // }

  getTestCentre(officer: string) {
    this.http.post<{message: string, testCentre: any}>('http://localhost:3000/api/test-centre/find', {officer: officer})
    .subscribe( response => {
      console.log('test centre found: ' + response.testCentre._id);
      this.testCentre = response.testCentre;
      this.updateTestCentre;
      this.testCentreRetrievedListener.next(response.testCentre);
      this.uploadTestCentre();
    }, error => {
      console.log('test centre not found: ' + error)
      this.testCentre = undefined;
      this.updateTestCentre;
      this.testCentreRetrievedListener.next(undefined);
      this.uploadTestCentre();
    })
  }


  generateNewId(){
    // this.downloadTestCentres();
    if ( this.testCentres.length > 0) {
      return 'TC' + (parseInt(this.testCentres[this.testCentres.length-1].id.replace('TC',''), 10)+1);
    }
    return 'TC1'
  }

  addTestCentre(id: string,  officer: string, contact: string, state: string, address: string){
    // this.downloadTestCentres();
    const testCentre: TestCentre = { id:null, state: state, address: address, officer: officer, contact: contact};
    // this.testCentres.push(testCentre);
    // this.uploadTestCentres()
    this.http.post('http://localhost:3000/api/test-centre/create', testCentre).subscribe(response => {
      console.log(response);

    }, error => {

    });
  }




  updateTestCentre(id: string,  officer: string, contact: string, state: string, address: string){
    // this.downloadTestCentres();
    // var testCentre = this.testCentres.find(testCentre => testCentre.officer == officer);
    // testCentre.contact = contact;
    // testCentre.state = state;
    // testCentre.address = address;
    // this.uploadTestCentres();

    const testCentre: TestCentre = { id:id, state: state, address: address, officer: officer, contact: contact};
    this.http.put('http://localhost:3000/api/test-centre/' + testCentre.id, testCentre).subscribe(response => {
      console.log('test centre updated: ' + response)
    }, error => {

    });

  }

  uploadTestCentre(){
    localStorage.setItem('currentTestCentre', JSON.stringify(this.currentTestCentre));
  }
  downloadTestCentre(){
    this.currentTestCentre = JSON.parse(localStorage.getItem('currentTestCentres'));
  }
  // uploadCurrentUser(){
  //   localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  // }
  // downloadCurrentUser(){
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // }
  // clearCurrentUser(){
  //   localStorage.setItem('currentUser', null);
  // }
}
