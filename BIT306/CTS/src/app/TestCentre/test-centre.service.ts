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
    console.log('test centre', this.testCentres);
    return this.testCentres.find(testCentre => testCentre.officer == officer);
  }

  generateNewId(){
    this.downloadTestCentres();
    return "TC"+(this.getTestCentres().length+1);
  }

  addTestCentre(id: string,  officer: string, contact: string, state: string, address: string){
    const testCentre: TestCentre = { id: id, state: state, address: address, officer: officer, contact: contact};
    this.testCentres.push(testCentre);
    this.uploadTestCentres()
  }

  updateTestCentre(){

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
