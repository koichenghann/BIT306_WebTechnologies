import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../User/user.service';
import { TestCentre } from '../test-centre.model';
import { TestCentreService } from '../test-centre.service';

@Component({
  selector: 'app-test-centre-profile',
  templateUrl: './test-centre-profile.component.html',
  styleUrls: ['./test-centre-profile.component.css']
})
export class TestCentreProfileComponent implements OnInit {

  currentTestCentre;
  mode = 'new';

  testCentreExist: boolean;
  retrievingTestCentre: boolean;
  testCentreRetrieved: Subscription;

  constructor(public testCentreService: TestCentreService, public userService: UserService) { }

  ngOnInit(): void {
    this.testCentreRetrieved = this.testCentreService.getTestCentreRetrievedListener().subscribe( response => {
      this.currentTestCentre = response;
      this.retrievingTestCentre = false;
      this.setMode()
    });
    this.setMode();
    this.retrievingTestCentre = true;
    this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);

  }

  ngOnDestroy(){
    this.testCentreRetrieved.unsubscribe();
  }

  //@Input() testCentres: TestCentre[] = [];



  setMode() {
    this.mode = 'new';
    if( this.currentTestCentre != undefined || this.currentTestCentre != null ) {
      this.mode = 'exist';
    } else {

    }
  }

}
