import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TestCentre } from '../test-centre.model';
import { TestCentreService } from '../test-centre.service';

@Component({
  selector: 'app-test-centre-form',
  templateUrl: './test-centre-form.component.html',
  styleUrls: ['./test-centre-form.component.css']
})

export class TestCentreFormComponent implements OnInit {
  constructor(public testCentreService: TestCentreService) { }

  ngOnInit(): void {
    this.testCentres = this.testCentreService.getTestCentres();
    console.log(this.testCentres.length);
  }

  @Input() testCentres: TestCentre[] = [];

  currentOfficer = 'Norhisshan';

  tcid = this.testCentreService.generateNewId();
  tcofficer = this.currentOfficer;
  tcstate = null;
  tcaddress = null;
  tccontact = null;
  tccapacity = null;

  mode = "add";

  states = [
    {value: 'Johor', viewValue: 'Johor'},
    {value: 'Kedah', viewValue: 'Kedah'},
    {value: 'Kelantan', viewValue: 'Kelantan'},
    {value: 'Malacca', viewValue: 'Malacca'},
    {value: 'Negeri Sembilan', viewValue: 'Negeri Sembilan'},
    {value: 'Pahang', viewValue: 'Pahang'},
    {value: 'Penang', viewValue: 'Penang'},
    {value: 'Perak', viewValue: 'Perak'},
    {value: 'Perlis', viewValue: 'Perlis'},
    {value: 'Sabah', viewValue: 'Sabah'},
    {value: 'Sarawak', viewValue: 'Sarawak'},
    {value: 'Selangor', viewValue: 'Selangor'},
    {value: 'Terengganu', viewValue: 'Terengganu'},
    {value: 'Kualua Lumpur', viewValue: 'Kualua Lumpur'},
    {value: 'Labuan', viewValue: 'Labuan'},
    {value: 'Putrajaya', viewValue: 'Putrajaya'}];


  onAddTestCentre(form: NgForm){
    console.log('ran');
    if (form.invalid){
      return;
    }

    this.testCentreService.addTestCentre(form.value.id, form.value.officer, form.value.state, form.value.address, form.value.contact, form.value.copacity);
    form.resetForm();
    this.tcid = this.testCentreService.generateNewId();
    this.tcofficer = this.currentOfficer;
  }

  populateTestCentre(){

  }

  cancel(){

  }

}
