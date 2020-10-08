import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../User/user.service';
import { TestCentre } from '../test-centre.model';
import { TestCentreService } from '../test-centre.service';

@Component({
  selector: 'app-test-centre-profile',
  templateUrl: './test-centre-profile.component.html',
  styleUrls: ['./test-centre-profile.component.css']
})
export class TestCentreProfileComponent implements OnInit {

  constructor(public testCentreService: TestCentreService, public userService: UserService) { }

  ngOnInit(): void {
    this.currentTestCentre = this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);
    this.setMode();
  }

  //@Input() testCentres: TestCentre[] = [];

  currentTestCentre;
  mode = 'new';

  setMode() {
    this.mode = 'new';
    if( this.currentTestCentre != undefined ) {
      this.mode = 'exist';
    } else {

    }
  }

}
