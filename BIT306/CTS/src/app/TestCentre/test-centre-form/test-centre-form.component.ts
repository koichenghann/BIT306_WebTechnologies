import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective  } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TestCentre } from '../test-centre.model';
import { TestCentreService } from '../test-centre.service';
import { UserService } from '../../User/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-test-centre-form',
  templateUrl: './test-centre-form.component.html',
  styleUrls: ['./test-centre-form.component.css']
})
export class TestCentreFormComponent implements OnInit {
  testCentreForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public testCentreService: TestCentreService, public userService: UserService, private fb: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    //this.testCentres = this.testCentreService.getTestCentres();

    this.testCentreForm = this.fb.group({
      id: ['', [
        Validators.required,
      ]],
      officer: ['', [
        Validators.required
      ]],
      contact: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]]
    })

    this.id.disable();
    this.officer.disable();
    this.currentOfficer = this.userService.getCurrentUser();
    console.log('currentUser: ', this.userService.getCurrentUser());
    this.officer.setValue(this.currentOfficer.username);
    this.setMode();
  }

  get id(){
    return this.testCentreForm.get('id');
  }
  get officer(){
    return this.testCentreForm.get('officer');
  }
  get contact(){
    return this.testCentreForm.get('contact');
  }
  get state(){
    return this.testCentreForm.get('state');
  }
  get address(){
    return this.testCentreForm.get('address');
  }

  currentOfficer;
  currentTestCentre;
  mode = "add";
//@Input() testCentres: TestCentre[] = [];


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
    {value: 'Kuala Lumpur', viewValue: 'Kuala Lumpur'},
    {value: 'Labuan', viewValue: 'Labuan'},
    {value: 'Putrajaya', viewValue: 'Putrajaya'}];


  submitHandler(){
    if (this.testCentreForm.invalid){
      return;
    }
    if ( this.mode == 'add' ) {
      this.testCentreService.addTestCentre(this.id.value, this.currentOfficer.id, this.contact.value, this.state.value, this.address.value);

      //assign the test centre to the currentOfficer
      var updatedOfficer = this.currentOfficer;
      // this.userService.updateUser(this.currentOfficer.id,
      //                             this.currentOfficer.username,
      //                             this.currentOfficer.password,
      //                             this.currentOfficer.usertype,
      //                             this.currentOfficer.contact,
      //                             this.currentOfficer.address,
      //                             this.id.value);
    } else {
      this.testCentreService.updateTestCentre(this.id.value, this.officer.value, this.contact.value, this.state.value, this.address.value);
    }
    this.mode = 'view';
    //this.setMode();
    this.route.navigate(['/test-centre-profile']);

  }

  //check whether to initiate add mode or edit mode
  //if there is no test centre bound to current officer, create new test centre
  //else, load the test centre bound to current officer.
  setMode(){
    this.mode = 'add'; //change this value to 'new' if you want to replace the profile page with this page
    // this.currentTestCentre = this.testCentreService.getTestCentre(this.currentOfficer.id);
    if ( this.currentTestCentre != undefined ) {
      this.mode = 'edit'; //change this value to 'view' if you want to replace the profile page with this page
      this.populateForm();

      // this.contact.disable();
      // this.state.disable();
      // this.address.disable();
    } else {
      this.id.setValue(this.testCentreService.generateNewId());
      this.officer.setValue(this.currentOfficer.username);
    }
  }

  populateForm(){
    if ( this.currentTestCentre != undefined ) {
      this.id.setValue(this.currentTestCentre.id);
      this.officer.setValue(this.currentTestCentre.officer);
      this.contact.setValue(this.currentTestCentre.contact);
      this.state.setValue(this.currentTestCentre.state);
      this.address.setValue(this.currentTestCentre.address);
    }
  }

  addNewEntry(){
    this.mode = 'add';
  }

  editForm(){
    this.mode = 'edit';
    this.contact.enable();
    this.state.enable();
    this.address.enable();
  }

  //clear form and go back to test centre profile
  cancel(){
    this.testCentreForm.reset();
    this.formGroupDirective.resetForm();
    this.testCentreForm.setErrors({'invalid': true});
    // this.setMode();
    this.route.navigate(['/test-centre-profile']);
  }

}

