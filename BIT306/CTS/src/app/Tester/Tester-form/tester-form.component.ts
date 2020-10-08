import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
import { TesterService } from '../tester.service';
import { Router } from '@angular/router';
import { UserService } from '../../User/user.service';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector:'tester-form',
  templateUrl:'tester-form.component.html',
  styleUrls: ['tester-form.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class TesterFormComponent implements OnInit{
  testForm: FormGroup;
  currentTestCentreID;
  constructor(public testerService: TesterService
    ,private fb: FormBuilder, private route:Router, public userService:UserService, public testCentreService: TestCentreService ){

    }


  ngOnInit(){
    this.initializeForm();
    //this.currentTester = this.userService.getCurrentUser().username;
    console.log('currentUser: ', this.userService.getCurrentUser());
    //this.tester.setValue(this.currentTester.username);
    this.currentTestCentreID = this.userService.getCurrentUser().centre;

  }

  initializeForm(): void {
    this.testForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],

      patientType: ['', [
        Validators.required,
      ]],

      description: this.fb.array([this.fb.control('')]),

      symptoms: this.fb.group({
        fever: false,
        soreThroat: false,
        cough: false,
        shortnessOfBreath: false,
        noSymptom: false
      }),

      otherSymptoms:''

    });
  }

  currentTester='Trump';


  //get data
  get username(){
    return this.testForm.get('username');
  }

  get tester(){
    return this.testForm.get('tester');
  }

  get testID(){
    return this.testForm.get('testID');
  }

  get date(){
    return this.testForm.get('tester');
  }

  get patientType(){
    return this.testForm.get('patientType');
  }

  get description(){
    return this.testForm.get('description');
  }

  get symptoms(){
    return this.testForm.get('symptoms');
  }

  get otherSymptoms(){
    return this.testForm.get('otherSymptoms');
  }

  onSubmit(): void {
    console.log(this.testForm.value);
    console.log(this.symptoms.value);
    //this.testID.setValue(this.testerService.generateTestID());


    var testStatus= 'pending';
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    var todayDate = month + '/' + day + '/' + year;
    console.log(todayDate);

    //loop sypmtoms
    var allSymptoms = this.symptoms.value;
    var a = ' Fever';
    var b = ' Sore throat';
    var c = ' Cough';
    var d = ' Shortness of breath';
    var e = ' No Symptoms';

    if (allSymptoms.fever != true){
      a = '';
    }
    if (allSymptoms.soreThroat != true){
      b = '';
    }
    if (allSymptoms.cough != true){
      c = '';
    }
    if (allSymptoms.shortnessOfBreath != true){
      d = '';
    }
    if (allSymptoms.noSymptom != true){
      e = '';
    }

    var strAllSymptoms = a + b + c + d + e;
    console.log(strAllSymptoms);

    var testResult = '';
    var resultDate = '';



    if(this.testForm.invalid){
      return;
    }

    else{
      //console.log(this.testID.value);
      console.log(this.username.value);
      console.log(this.patientType.value);
      console.log(strAllSymptoms);
      console.log(this.otherSymptoms.value);
      console.log(this.description.value);
      console.log(testStatus);
      console.log(todayDate);
      console.log(this.currentTester);


      this.testerService.addTest( this.username.value,
                                  this.patientType.value,
                                  strAllSymptoms,
                                  this.otherSymptoms.value,
                                  this.description.value,
                                  testStatus, todayDate,
                                  this.currentTester,
                                  this.currentTestCentreID, testResult, resultDate);
   }


  }


}
