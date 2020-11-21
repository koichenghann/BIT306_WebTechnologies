import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective  } from '@angular/forms';
import { UserService } from '../../User/user.service';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestCentre } from 'src/app/TestCentre/test-centre.model';


@Component({
  selector: 'app-tester-management-form',
  templateUrl: './tester-management-form.component.html',
  styleUrls: ['./tester-management-form.component.css']
})
export class TesterManagementFormComponent implements OnInit {
  validatingUsername: boolean = false;
  usernameIsUnique: boolean;
  usernameValidated: Subscription;

  retrievingTestCentre: boolean;
  testCentreRetrieved: Subscription;
  currentTestCentre: any;

  originalUsername: String;


  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  testerForm: FormGroup;
  constructor(public userService: UserService, public testCentreService: TestCentreService, private fb: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.testerForm = this.fb.group({
      id: ['', [
        Validators.required
      ]],
      centre: ['', [
        Validators.required
      ]],
      username: ['', [
        // this.usernameIsUniqueValidator.bind(this),
        Validators.required,
        Validators.minLength(7)
      ]],
      password: ['', [
        Validators.minLength(7)
      ]]
    });
    this.id.disable();
    this.centre.disable();

    // this.setmode();


    //set username error base on uniqueness
    this.usernameValidated = this.userService.getUsernameValidatedListerner().subscribe(response => {
      if (this.username.value == response.username) {
        if (!response.unique) {
          if (response.username != this.originalUsername) {
            this.username.setErrors({isUnique: true});
          }
        }
        this.validatingUsername = false;
        // console.log(this.username.errors);
      }
    });
    //send username to be check if it's unique
    this.username.valueChanges.subscribe(value => {
      this.userService.checkUsernameIsUnique(this.username.value);
      this.validatingUsername = true;
    });


    this.testCentreRetrieved = this.testCentreService.getTestCentreRetrievedListener().subscribe( response => {
      this.currentTestCentre = response;
      this.retrievingTestCentre = false;
      this.centre.setValue(this.currentTestCentre._id);
      this.setmode()
    });
    // this.setmode();
    this.retrievingTestCentre = true;
    this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);
  }

  get id(){
    return this.testerForm.get('id');
  }
  get centre(){
    return this.testerForm.get('centre');
  }
  get username(){
    return this.testerForm.get('username');
  }
  get password(){
    return this.testerForm.get('password');
  }


  selectedTester;
  // currentTestCentre;
  mode = 'add';
  TestCentreIDFlex = '100%';

  setmode(){
    this.mode = 'add';
    this.selectedTester = this.userService.getSelectedTester();
    if ( this.selectedTester != undefined ) {
      this.mode = 'edit';
      this.TestCentreIDFlex = '50%';
      this.originalUsername = this.selectedTester.username;
      this.populateForm();
      return;
    } else {
      console.log('current test centre: ', this.currentTestCentre);
    }

  }
  populateForm(){
    this.id.setValue(this.selectedTester._id);
    this.centre.setValue(this.selectedTester.centre);
    this.username.setValue(this.selectedTester.username);
    // this.password.setValue(this.selectedTester.password);
  }
  submitHandler(){
    if ( this.testerForm.invalid ) {
      return;
    }
    if ( this.mode == 'add' ) {
      this.userService.createTester(this.username.value, this.password.value, this.currentTestCentre._id);
    } else {
      this.userService.updateUser(this.id.value, this.username.value, this.password.value, 'Tester', '', '', this.centre.value);
      this.userService.clearSelectedTester();
    }
    this.close();
  }
  clearForm(){
    this.testerForm.reset();
    this.formGroupDirective.resetForm();
    this.testerForm.setErrors({'ivalid': true});
  }
  close(){
    this.clearForm();
    this.route.navigate(['/tester-management-table']);
  }
  usernameIsUniqueValidator(control: FormControl): ValidationErrors {
    if(!this.userService.checkUsernameIsUnique(control.value)){
      return {isUnique: true};
    }
    return null;
  }

}
