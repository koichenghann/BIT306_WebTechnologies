import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector:'tester-form',
  templateUrl:'tester-form.component.html',
  styleUrls: ['tester-form.component.css']
})

export class TesterFormComponent implements OnInit{
  testForm: FormGroup;

  constructor(private fb: FormBuilder){

  }


  fever: false;
  soreThroat: false;
  cough: true;
  shortnessOfBreath: true;
  symptom;

  ngOnInit(){
    this.initializeForm();
  }

  initializeForm(): void {
    this.testForm = this.fb.group({
      username: 'username here',
      patientType: '',
      symptoms: this.fb.group({
        fever: false,
        soreThroat: false,
        cough: true,
        shortnessOfBreath: true
      }),
      description: this.fb.array([this.fb.control('')])
    });
  }

  
}
