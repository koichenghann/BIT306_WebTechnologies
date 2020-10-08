import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tester-management-table',
  templateUrl: './tester-management-table.component.html',
  styleUrls: ['./tester-management-table.component.css']
})
export class TesterManagementTableComponent implements OnInit {
  currentUsers: User[] = [];
  displayedColumns = ['id', 'username', 'password', 'action'];
  dataSource = this.currentUsers;
  tables = [0];
  mode = 'new';
  search = false;
  searchCriteria;

  constructor(public testCentreService: TestCentreService, public userService: UserService, private route:Router) { }

  ngOnInit(): void {
    this.setmode();
    this.userService.clearSelectedTester();
  }

  editClickedHandler(row: User){
    this.userService.setSelectedTester(row);
    this.route.navigate(['/tester-management-form']);
  }
  deleteClickedHandler(row: User){
    if ( confirm('Do you want to delete Tester ' + row.id + ' ' + row.username)) {
      this.userService.deleteUser(row.id);
      this.setmode()
    }
  }
  addClickedHandler(){}
  setmode(){
    this.mode = 'new';
    if ( this.checkTestCentreExist()) {
      this.mode = 'exist';
      this.loadUsers();
      if ( this.currentUsers.length == 0 )  {
        this.mode = 'empty';
      }
    }
  }
  loadUsers() {
    this.currentUsers = this.userService.getUsersByCentre(this.testCentreService.getTestCentre(this.userService.getCurrentUser().id).id);
    this.dataSource = this.currentUsers;
  }
  checkTestCentreExist(){
    return this.testCentreService.getTestCentre(this.userService.getCurrentUser().id) != undefined
  }

  //method for search features
  searchClickedHandler(){
    if ( this.search ) {
      this.searchCriteria = '';
      this.search = false;
      this.dataSource = this.currentUsers;
    }
  }
  onSearchHandler(criteria: string){
    if ( criteria == '' ) {
      this.dataSource = this.currentUsers;
      this.search = false;
      return;
    }
    this.search = true;
    this.dataSource = this.currentUsers.filter(user => user.username.includes(criteria) || user.id.includes(criteria));
  }
  onBlurHandler(criteria: string){
    if ( criteria == '' || criteria == undefined ) {
      this.dataSource = this.currentUsers;
      this.searchClickedHandler();
    }
  }
}
