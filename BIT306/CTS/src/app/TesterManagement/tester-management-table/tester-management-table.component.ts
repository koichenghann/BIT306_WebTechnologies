import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestCentre } from 'src/app/TestCentre/test-centre.model';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-tester-management-table',
  templateUrl: './tester-management-table.component.html',
  styleUrls: ['./tester-management-table.component.css']
})
export class TesterManagementTableComponent implements OnInit {
  testCentreExist: boolean = false;
  retrievingTestCentre: boolean;
  testCentreRetrieved: Subscription;
  currentTestCentre: any;
  retrievingTester: boolean;
  testerRetrieved: Subscription;

  currentUsers: User[] = [];
  displayedColumns = ['id', 'username', /*'password',*/ 'action'];
  dataSource =  new MatTableDataSource();
  tables = [0];
  mode = 'new';
  search = false;
  searchCriteria;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public testCentreService: TestCentreService, public userService: UserService, private route:Router) { }

  ngOnInit(): void {
    // this.setmode();
    this.userService.clearSelectedTester();


    this.testerRetrieved = this.userService.getTesterRetrievedListener().subscribe( response => {
      this.currentUsers = response;
      this.retrievingTester = false;
      this.setmode();
    });
    this.testCentreRetrieved = this.testCentreService.getTestCentreRetrievedListener().subscribe( response => {
      this.currentTestCentre = response;
      this.testCentreExist = response != null;
      this.retrievingTestCentre = false;
      this.setmode()
      if ( this.testCentreExist ) {
        // console.log('current test centre: ' + this.currentTestCentre._id)
        this.userService.getUsersByCentre(this.currentTestCentre._id);
        this.retrievingTester = true;
      }
    });
    this.setmode();
    this.retrievingTestCentre = true;
    this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);

  }
  ngOnDestroy() {
    this.testerRetrieved.unsubscribe();
    this.testCentreRetrieved.unsubscribe();
  }
  editClickedHandler(row: User){
    this.userService.setSelectedTester(row);
    this.route.navigate(['/tester-management-table/form']);
  }
  deleteClickedHandler(row: any){
    if ( confirm('Do you want to delete Tester: '  + row.username + ' (' + row._id + ')')) {
      this.userService.deleteUser(row._id);
      // this.setmode()
      this.userService.getUsersByCentre(this.currentTestCentre._id);
      this.retrievingTester = true;
    }
  }
  setmode(){
    this.mode = 'new';
    if ( this.testCentreExist ) {
      this.mode = 'exist';
        this.dataSource = new MatTableDataSource(this.currentUsers);
      if ( this.currentUsers.length == 0 )  {
        this.mode = 'empty';
      }
    }
  }


}
