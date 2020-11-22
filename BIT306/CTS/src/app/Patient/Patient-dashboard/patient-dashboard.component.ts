import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';

@Component({
  selector:'patient-dashboard',
  templateUrl:'patient-dashboard.component.html',
  styleUrls: ['patient-dashboard.component.css']
})

export class PatientDashboardComponent implements OnInit {
  currentUser;
  constructor(public userService: UserService){}


  ngOnInit(){
    this.currentUser = this.userService.getCurrentUser().username;

  }
}

