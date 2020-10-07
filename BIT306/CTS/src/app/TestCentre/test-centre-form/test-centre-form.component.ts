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
    this.testCentres = this.testCentreService.getTestCentres();
    console.log(this.testCentres.length);

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
    //this.currentOfficer = this.userService.getCurrentUser().username;
    this.officer.setValue(this.currentOfficer);
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

  currentOfficer = "Norhisshan";
  currentTestCentre;
  mode = "add";
  @Input() testCentres: TestCentre[] = [];


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


  submitHandler(){
    if (this.testCentreForm.invalid){
      return;
    }
    this.testCentreService.addTestCentre(this.id.value, this.officer.value, this.state.value, this.address.value, this.contact.value)
  }
  // onAddTestCentre(form: NgForm){
  //   console.log('ran');
  //   if (form.invalid){
  //     return;
  //   }
  //
  //   this.testCentreService.addTestCentre(form.value.id, form.value.officer, form.value.state, form.value.address, form.value.contact, form.value.capacity);
  //   form.resetForm();
  //   this.tcid = this.testCentreService.generateNewId();
  //   this.tcofficer = this.currentOfficer;
  // }

  setMode(){
    this.mode = 'add';
    this.currentTestCentre = this.testCentreService.getTestCentre(this.currentOfficer);
    if ( this.currentTestCentre != undefined ) {
      this.mode = 'edit';
      this.id.setValue(this.currentTestCentre.id);
      this.officer.setValue(this.currentTestCentre.officer);
      this.contact.setValue(this.currentTestCentre.contact);
      this.state.setValue(this.currentTestCentre.state);
      this.address.setValue(this.currentTestCentre.address);
    } else {
      this.id.setValue(this.testCentreService.generateNewId());
      this.officer.setValue(this.currentOfficer);
    }
  }
  populateTestCentre(){

  }

  cancel(){

  }

}
