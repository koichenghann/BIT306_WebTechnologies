import { Injectable } from '@angular/core';
import { TestCentre } from './test-centre.model';

@Injectable({
  providedIn: 'root'
})
export class TestCentreService {

  constructor() { }

  private testCentres: TestCentre[] = [];



  getTestCentres(){
    return this.testCentres;
  }

  getTestCentre(officer: string){
    return this.testCentres.find(testCentre => testCentre.officer == officer);
  }

  generateNewId(){
    return "TC"+(this.getTestCentres().length+1);
  }

  addTestCentre(id: string, state: string, address: string, officer: string, contact: string){
    const testCentre: TestCentre = { id: id, state: state, address: address, officer: officer, contact: contact};
    this.testCentres.push(testCentre);
    console.log('add ran' + this.getTestCentres());
  }

  updateTestCentre(){

  }
}
