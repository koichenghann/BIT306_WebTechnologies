import { Injectable } from '@angular/core';
import { TestKit } from './test-kit.model';
import { TestCentre } from '../TestCentre/test-centre.model';

@Injectable({
  providedIn: 'root'
})
export class TestKitService {

  constructor() { }

  private testKits: TestKit[] = [];
  private currentTestCentre: TestCentre;
  private selectedTestKit: TestKit;

  setSelectedTestKit(testkit: TestKit) {
    this.selectedTestKit = testkit;
    this.uploadSelectedTestKit();
  }

  getSelectedTestKit() {
    this.downloadSelectedTestKit();
    return this.selectedTestKit;
  }

  clearSelectedTestKit() {
    this.selectedTestKit = undefined;
    this.uploadSelectedTestKit();
  }

  getTestKits() {
    return this.testKits;
  }

  generateID() {
    return 'TK'+ (this.testKits.length + 1);
  }
  addTestKit(id: string, centre: string, name: string, stock: number) {
    const newId = this.generateID();
    const testKit: TestKit = {id:newId, centre:centre, name:name, stock:stock};
    this.testKits.push(testKit);
    console.log(this.testKits);
  }

  getTestKitsByCentre( centre: string ) {
    return this.testKits.filter(testKit => testKit.centre == centre);
  }
  getTestKitById( id: string ) {
    return this.testKits.find(testKit => testKit.id == id);
  }


  updateTestKit(id: string, centre: string, name: string, stock: number) {
    const testKit: TestKit = this.testKits.find(testKit => testKit.id == id);
    testKit.name = name;
    testKit.stock = stock;
  }

  deleteTestKit(id:string) {
    this.testKits.splice(this.testKits.findIndex(testKit => testKit.id == id), 1);
  }

  uploadTestKit() {
    localStorage.setItem('testKit', JSON.stringify(this.testKits));
  }

  downloadTestKit() {
    this.testKits = JSON.parse(localStorage.getItem('testKit'));
  }

  uploadSelectedTestKit() {
    localStorage.setItem('selectedTestKit', JSON.stringify(this.selectedTestKit));
  }

  downloadSelectedTestKit() {
    this.selectedTestKit = JSON.parse(localStorage.getItem('selectedTestKit'));
  }
}
