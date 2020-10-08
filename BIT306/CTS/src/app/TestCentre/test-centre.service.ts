import { Injectable } from '@angular/core';
import { TestCentre } from './test-centre.model';

@Injectable({
  providedIn: 'root'
})
export class TestCentreService {

  constructor() { }

  private testCentres: TestCentre[] = [];



  getTestCentres(){
    this.downloadTestCentres();
    return this.testCentres;
  }

  getTestCentre(officer: string){
    this.downloadTestCentres();
    return this.testCentres.find(testCentre => testCentre.officer == officer);
  }

  generateNewId(){
    this.downloadTestCentres();
    // return "TC"+(this.getTestCentres().length+1);
    if ( this.testCentres.length > 0) {
      return 'TC' + (parseInt(this.testCentres[this.testCentres.length-1].id.replace('TC',''), 10)+1);
    }
    return 'TC1'
  }

  addTestCentre(id: string,  officer: string, contact: string, state: string, address: string){
    this.downloadTestCentres();
    const testCentre: TestCentre = { id: id, state: state, address: address, officer: officer, contact: contact};
    this.testCentres.push(testCentre);
    this.uploadTestCentres()
  }

  updateTestCentre(id: string,  officer: string, contact: string, state: string, address: string){
    this.downloadTestCentres();
    var testCentre = this.testCentres.find(testCentre => testCentre.officer == officer);
    testCentre.contact = contact;
    testCentre.state = state;
    testCentre.address = address;
    this.uploadTestCentres();
  }

  uploadTestCentres(){
    localStorage.setItem('testCentres', JSON.stringify(this.testCentres));
  }
  downloadTestCentres(){
    this.testCentres = JSON.parse(localStorage.getItem('testCentres'));
    if ( this.testCentres == null ) {
      this.testCentres = [];
    }
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
