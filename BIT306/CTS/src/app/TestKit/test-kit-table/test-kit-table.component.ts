import { Component, OnInit } from '@angular/core';
import { TestKitService } from '../test-kit.service';
import { TestKit } from '../test-kit.model';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-test-kit-table',
  templateUrl: './test-kit-table.component.html',
  styleUrls: ['./test-kit-table.component.css']
})
export class TestKitTableComponent implements OnInit {

  testCentreExist: boolean = false;
  retrievingTestCentre: boolean;
  testCentreRetrieved: Subscription;
  currentTestCentre: any;
  retrievingTestKit: boolean;
  testKitRetrieved: Subscription;
  currentTestKit: TestKit[] = [];
  testKitDeleted: Subscription;


  displayedColumns = ['id', 'name', 'stock', 'action'];
  dataSource = new MatTableDataSource();

  tables = [0];
  mode = 'new';
  search = false;
  searchCriteria;
  constructor(public testKitService: TestKitService, public testCentreService: TestCentreService, public userService: UserService, private route:Router) {}

  ngOnInit(): void {
    this.setmode()
    this.testKitService.clearSelectedTestKit();


    this.testKitDeleted = this.testKitService.getTestKitDeletedListener().subscribe( response => {
      this.retrievingTestCentre = true;
      this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);
    });
    this.testKitRetrieved = this.testKitService.getTestKitRetrievedListener().subscribe( response => {
      this.currentTestKit = response;
      this.retrievingTestKit = false;
      this.setmode();
    });
    this.testCentreRetrieved = this.testCentreService.getTestCentreRetrievedListener().subscribe( response => {
      this.currentTestCentre = response;
      this.testCentreExist = response != null;
      this.retrievingTestCentre = false;
      this.setmode()
      if ( this.testCentreExist ) {
        // console.log('current test centre: ' + this.currentTestCentre._id)
        this.testKitService.getTestKitsByCentre(this.currentTestCentre._id);
        this.retrievingTestKit = true;
      }
    });
    this.setmode();
    this.retrievingTestCentre = true;
    this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);

  }


  ngOnDestroy() {
    this.testCentreRetrieved.unsubscribe();
    this.testKitRetrieved.unsubscribe();
    this.testKitDeleted.unsubscribe();
  }


  editClickedHandler(row: TestKit) {
    this.testKitService.setSelectedTestKit(row);
    this.route.navigate(['/test-kit-table/form']);
  }


  deleteClickedHandler(row: TestKit) {
    if (confirm('Do you want to delete Test Kit: ' + row.name + ' (' + row.id + ')')) {
      this.testKitService.deleteTestKit(row.id);
      // this.setmode();

      // this.testKitService.getTestKitsByCentre(this.currentTestCentre._id);
      this.retrievingTestKit = true;
    }
  }


  setmode() {
    this.mode = 'new';
    if (this.currentTestCentre != undefined) {
      this.mode = 'exist';
      this.dataSource = new MatTableDataSource(this.currentTestKit);
      console.log(this.testKitService.getTestKits());
      if (this.currentTestKit.length == 0) {
        this.mode = 'empty';
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }








}
