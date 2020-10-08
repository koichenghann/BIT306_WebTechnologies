import { Component, OnInit } from '@angular/core';
import { TestKitService } from '../test-kit.service';
import { TestKit } from '../test-kit.model';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test-kit-table',
  templateUrl: './test-kit-table.component.html',
  styleUrls: ['./test-kit-table.component.css']
})
export class TestKitTableComponent implements OnInit {


  currentTestKit: TestKit[] = [];

  displayedColumns = ['id', 'name', 'stock', 'action'];
  dataSource = this.currentTestKit;

  tables = [0];
  mode = 'new';
  search = false;
  searchCriteria;
  constructor(public testKitService: TestKitService, public testCentreService: TestCentreService, public userService: UserService, private route:Router) {}

  ngOnInit(): void {
    this.setmode()
    this.testKitService.clearSelectedTestKit();
  }

  editClickedHandler(row: TestKit) {
    this.testKitService.setSelectedTestKit(row);
    this.route.navigate(['/test-kit-form']);
  }
  deleteClickedHandler(row: TestKit) {
    this.testKitService.deleteTestKit(row.id);
    this.setmode();
  }

  addClickedHandler() {
  }



  setmode() {
    this.mode = 'new';
    if (this.checkTestCentreExist) {
      this.mode = 'exist';
      this.loadTestKits();
      console.log(this.testKitService.getTestKits());
      if (this.currentTestKit.length == 0) {
        this.mode = 'empty';
        //this.loadDummyEntries();
      }
    }
  }




  checkTestCentreExist() {
    return this.testCentreService.getTestCentre(this.userService.getCurrentUser().username) != undefined
  }
  loadTestKits() {
    this.currentTestKit = this.testKitService.getTestKitsByCentre(this.testCentreService.getTestCentre(this.userService.getCurrentUser().username).id);
    this.dataSource = this.currentTestKit;
  }


  //method for search feature
  searchClickedHandler() {
    this.search = !this.search;
    console.log(this.search)
  }
  onSearchHandler(criteria: string) {
    console.log('seach triggered: ', this.searchCriteria);
    if ( criteria == '' ) {
      this.dataSource = this.currentTestKit;
      return;
    }
    this.dataSource = this.currentTestKit.filter(testKit => testKit.id == criteria);
  }
  onBlurHandler(criteria: string) {
    if ( criteria == '' ) {
      this.searchClickedHandler();
    }
  }


}
