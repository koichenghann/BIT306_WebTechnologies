import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';

@Component({
  selector:'tester-update-table',
  templateUrl:'tester-update-table.component.html',
  styleUrls: ['tester-update-table.component.css']
})
export class TesterUpdateTableComponent implements OnInit{
  testUpdateForm: FormGroup;


  constructor(private fb: FormBuilder, private route:Router,
    public userService:UserService, public testCentreService: TestCentreService ){
}

  ngOnInit(){
    this.initializeForm();
  }

  initializeForm(): void{
    this.testUpdateForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],

      resultDate: ['', [
        Validators.required,
      ]],

      testResult: ['', [
        Validators.required,
      ]],


    });
  }


  onSubmit(): void {

  }


}
