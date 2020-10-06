import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TestCentre } from '../test-centre.model';
import { TestCentreService } from '../test-centre.service';

@Component({
  selector: 'app-test-centre-profile',
  templateUrl: './test-centre-profile.component.html',
  styleUrls: ['./test-centre-profile.component.css']
})
export class TestCentreProfileComponent implements OnInit {

  constructor(public testCentreService: TestCentreService) { }

  ngOnInit(): void {
    this.testCentres = this.testCentreService.getTestCentres();
  }

  @Input() testCentres: TestCentre[] = [];

  currentOfficer = 'Norhisshan';

  tcid = this.testCentreService.generateNewId();
  tcofficer = this.currentOfficer;
  tcstate = null;
  tcaddress = null;
  tccontact = null;
  tccapacity = null;
}
