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

  generateNewId(){
    return "TC"+(this.getTestCentres().length+1);
  }

  addTestCentre(id: string, state: string, address: string, officer: string, contact: string, capacity: number){
    const testCentre: TestCentre = { id: id, state: state, address: address, officer: officer, contact: contact, capacity: capacity };
    this.testCentres.push(testCentre);
    console.log('add ran' + this.getTestCentres());
  }

  updateTestCentre(){

  }
}
