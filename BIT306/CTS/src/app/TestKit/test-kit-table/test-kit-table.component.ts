import { Component, OnInit } from '@angular/core';
import { TestKitService } from '../test-kit.service';
import { TestKit } from '../test-kit.model';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChildren } from '@angular/core';


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
    this.route.navigate(['/test-kit-table/form']);
  }
  deleteClickedHandler(row: TestKit) {
    if (confirm('Do you want to delete Test Kit '+ row.id + ' ' + row.name)) {
      this.testKitService.deleteTestKit(row.id);
      this.setmode();
    }

  }

  addClickedHandler() {
  }



  setmode() {
    this.mode = 'new';
    if (this.checkTestCentreExist()) {
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
    return this.testCentreService.getTestCentre(this.userService.getCurrentUser().id) != undefined
  }
  loadTestKits() {
    this.currentTestKit = this.testKitService.getTestKitsByCentre(this.testCentreService.getTestCentre(this.userService.getCurrentUser().id).id);
    this.dataSource = this.currentTestKit;
  }


  //method for search feature
  searchClickedHandler() {
    if ( this.search ) {
      this.searchCriteria = '';
      this.search = false;
      this.dataSource = this.currentTestKit;
    }
  }
  onSearchHandler(criteria: string) {
    console.log('seach triggered: ', this.searchCriteria);
    if ( criteria == '' ) {
      this.dataSource = this.currentTestKit;
      this.search = false;
      return;
    }
    this.search = true;
    this.dataSource = this.currentTestKit.filter(testKit => testKit.id == criteria || testKit.name.includes(criteria));
  }
  onBlurHandler(criteria: string) {
    console.log('blur handler ran: ', criteria);
    if ( criteria == '' || criteria == undefined ) {
      this.dataSource = this.currentTestKit;
      this.searchClickedHandler();
    }

  }


}
