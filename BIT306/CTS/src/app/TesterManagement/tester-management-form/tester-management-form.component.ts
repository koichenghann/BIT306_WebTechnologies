import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective  } from '@angular/forms';
import { UserService } from '../../User/user.service';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tester-management-form',
  templateUrl: './tester-management-form.component.html',
  styleUrls: ['./tester-management-form.component.css']
})
export class TesterManagementFormComponent implements OnInit {
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
        this.usernameIsUniqueValidator.bind(this),
        Validators.required,
        Validators.minLength(7)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7)
      ]]
    });
    this.id.disable();
    this.centre.disable();
    this.currentTestCentre = this.testCentreService.getTestCentre(this.userService.getCurrentUser().id);
    this.setmode();
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
  currentTestCentre;
  mode = 'add';
  TestCentreIDFlex = '100%';

  setmode(){
    this.mode = 'add';
    this.selectedTester = this.userService.getSelectedTester();
    if ( this.selectedTester != undefined ) {
      this.mode = 'edit';
      this.TestCentreIDFlex = '50%';
      this.populateForm();
      return;
    } else {
      console.log('current test centre: ', this.currentTestCentre);
      this.centre.setValue(this.currentTestCentre.id);
    }

  }
  populateForm(){
    this.id.setValue(this.selectedTester.id);
    this.centre.setValue(this.selectedTester.centre);
    this.username.setValue(this.selectedTester.username);
    this.password.setValue(this.selectedTester.password);
  }
  submitHandler(){
    if ( this.testerForm.invalid ) {
      return;
    }
    if ( this.mode == 'add' ) {
      this.userService.register(this.username.value, this.password.value, 'tester', '', '', this.currentTestCentre.id);
    } else {
      this.userService.updateUser(this.id.value, this.username.value, this.password.value, 'tester', '', '', this.centre.value);
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
