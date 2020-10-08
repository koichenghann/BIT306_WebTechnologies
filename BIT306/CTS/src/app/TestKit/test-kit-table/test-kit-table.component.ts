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


  currentTestStocks: TestKit[] = [];

  displayedColumns = ['id', 'name', 'stock', 'action'];
  dataSource = this.currentTestStocks;

  tables = [0];
  mode = 'new';

  constructor(public testKitService: TestKitService, public testCentreService: TestCentreService, public userService: UserService, private route:Router) {}

  ngOnInit(): void {
    this.setmode()
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
      if (this.currentTestStocks.length == 0) {
        this.mode = 'empty';
        //this.loadDummyEntries();
      }
    }
  }



  checkTestCentreExist() {
    return this.testCentreService.getTestCentre(this.userService.getCurrentUser().username) != undefined
  }
  loadTestKits() {
    this.currentTestStocks = this.testKitService.getTestKitsByCentre(this.testCentreService.getTestCentre(this.userService.getCurrentUser().username).id);
    this.dataSource = this.currentTestStocks;
  }

  loadDummyEntries() {
    this.currentTestStocks = [ {id:'TS1', centre:'TC1', name:'balloon', stock:1},
                          {id:'TS2', centre:'TC1', name:'apple', stock:2},
                          {id:'TS3', centre:'TC1', name:'pineapple', stock:3},
                          {id:'TS4', centre:'TC1', name:'melon', stock:4},
                          {id:'TS5', centre:'TC1', name:'watermelon', stock:5},
                          {id:'TS6', centre:'TC1', name:'ball', stock:6},
                          {id:'TS7', centre:'TC1', name:'ballpoint', stock:7},
                          {id:'TS8', centre:'TC1', name:'balloon', stock:8},
                          {id:'TS9', centre:'TC1', name:'apple', stock:2},
                          {id:'TS10', centre:'TC1', name:'pineapple', stock:3},
                          {id:'TS11', centre:'TC1', name:'melon', stock:4},
                          {id:'TS12', centre:'TC1', name:'watermelon', stock:5},
                          {id:'TS13', centre:'TC1', name:'ball', stock:6},
                          {id:'TS14', centre:'TC1', name:'ballpoint', stock:7}];
     this.dataSource = this.currentTestStocks;
  }


}
