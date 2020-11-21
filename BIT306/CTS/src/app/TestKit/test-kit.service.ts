import { Injectable } from '@angular/core';
import { TestKit } from './test-kit.model';
import { TestCentre } from '../TestCentre/test-centre.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TestKitService {

  constructor(private http: HttpClient, private router:Router) { }

  private testKits: TestKit[] = [];
  private currentTestCentre: TestCentre;
  private selectedTestKit: TestKit;

  private testKitRetrievedListener = new Subject<TestKit[]>();
  private testKitCreatedListener = new Subject<TestKit[]>();
  private testKitUpdatedListener = new Subject<TestKit[]>();
  private testKitDeletedListener = new Subject<boolean>();

  getTestKitRetrievedListener() {
    return this.testKitRetrievedListener;
  }
  getTestKitCreatedListener() {
    return this.testKitCreatedListener;
  }
  getTestKitUpdatedListener() {
    return this.testKitUpdatedListener;
  }
  getTestKitDeletedListener() {
    return this.testKitDeletedListener;
  }

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
    this.removeSelectedTestKit();
  }

  getTestKits() {
    this.downloadTestKit();
    return this.testKits;
  }

  // generateID() {
  //   if ( this.testKits.length > 0 ) {
  //     return 'TK' + (parseInt(this.testKits[this.testKits.length-1].id.replace('TK',''), 10)+1);
  //   }
  //   return 'TK1';
  // }
  addTestKit(id: string, centre: string, name: string, stock: number) {
    const testKit: TestKit = {id:null, centre:centre, name:name, stock:stock};
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/test-kit/create', testKit).subscribe( response => {
      testKit.id = response.id;
      this.testKits.push(testKit)
      this.testKitCreatedListener.next([...this.testKits]);
    }, error => {

    })
  }

  getTestKitsByCentre( centre: string ) {
    // console.log('get TestKit ran');
    this.http.post<{message: string, testKits: any}>('http://localhost:3000/api/test-kit/retrieve', {centre: centre})
    .pipe(map(data => {
      return data.testKits.map( testKit => {
        return {
          id: testKit._id,
          centre: testKit.centre,
          name: testKit.name,
          stock: testKit.stock
        }
      });
    }))
    .subscribe( response => {
      // console.log('get TestKit success');
      this.testKits = response;
      this.testKitRetrievedListener.next([...this.testKits]);
    }, error => {
      // console.log('get TestKit failed');
    })


  }
  getTestKitById( id: string ) {
    // this.downloadTestKit();
    return this.testKits.find(testKit => testKit.id == id);
  }


  updateTestKit(id: string, centre: string, name: string, stock: number) {
    const testKit: TestKit = {id:id, centre:centre, name:name, stock:stock};
    this.http.put('http://localhost:3000/api/test-kit/' + id, testKit)
    .subscribe(response => {
      // console.log(response);
      this.router.navigate(['/test-kit-table']);
    }, error => {

    });



  }

  deleteTestKit(id:string) {
    this.http.delete('http://localhost:3000/api/test-kit/' + id).subscribe( response => {
      // const updatedTestKits = this.testKits.filter(testKit => testKit.id !== id);
      // this.testKits = updatedTestKits;
      // this.testKitUpdatedListener.next([...this.testKits]);
      console.log('testkit deleted: ' + response);
      this.testKitDeletedListener.next(true);

    }, error => {

    })
  }














  uploadTestKit() {
    localStorage.setItem('testKit', JSON.stringify(this.testKits));
  }

  downloadTestKit() {
    this.testKits = JSON.parse(localStorage.getItem('testKit'));
    if ( this.testKits == null ) {
      this.testKits = [];
    }
  }

  uploadSelectedTestKit() {
    localStorage.setItem('selectedTestKit', JSON.stringify(this.selectedTestKit));
  }

  downloadSelectedTestKit() {
    this.selectedTestKit = JSON.parse(localStorage.getItem('selectedTestKit'));
  }

  removeSelectedTestKit() {
    localStorage.removeItem('selectedTestKit');
  }
}
