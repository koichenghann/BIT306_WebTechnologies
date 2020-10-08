import { Component, OnInit } from '@angular/core';


@Component({
  selector:'tester-form',
  templateUrl:'tester-form.component.html',
  styleUrls: ['tester-form.component.css']
})

export class TesterFormComponent {
  testForm;



  fever= false;
  soreThroat = false;
  cough = true;
  shortnessOfBreath = true;



}
