import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
import { TesterService } from '../tester.service';
import { Router } from '@angular/router';
import { UserService } from '../../User/user.service';


@Component({
  selector:'tester-form',
  templateUrl:'tester-form.component.html',
  styleUrls: ['tester-form.component.css']
})

export class TesterFormComponent implements OnInit{
  testForm: FormGroup;
  constructor(public testerService: TesterService
    ,private fb: FormBuilder, private route:Router, public userService:UserService ){

    }


  ngOnInit(){
    this.initializeForm();
    //this.currentTester = this.userService.getCurrentUser().username;
    console.log('currentUser: ', this.userService.getCurrentUser());
    //this.tester.setValue(this.currentTester.username);


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


    var testStatus= 'pending'
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
    var d = ' Shortness of breath'
    var e = ' No Symptoms'

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



    if(this.testForm.invalid){
      return;
    }

    else{
      this.testerService.addTest(this.testID.value, this.username.value, this.patientType.value, strAllSymptoms, this.otherSymptoms.value, this.description.value, testStatus, todayDate, this.currentTester);
   }


  }


}
