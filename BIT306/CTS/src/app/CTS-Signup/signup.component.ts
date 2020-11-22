import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective  } from '@angular/forms';
import { UserService } from '../User/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cts-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class CtsSignupComponent {
  validatingUsername: boolean = false;
  usernameIsUnique: boolean;
  usernameValidated: Subscription;

  userForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public userService: UserService, private fb: FormBuilder, private route:Router) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [
        // this.usernameIsUniqueValidator.bind(this),
        Validators.required,
        Validators.minLength(7)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7)
      ]],
      usertype: ['', [
        Validators.required
      ]],
      // officertype: ['', [
      //   // Validators.required,
      // ]],
      contact: ['', [
        // Validators.required,
      ]],
      address: ['', [
        // Validators.required,
      ]]
    })


    //set username error base on uniqueness
    this.usernameValidated = this.userService.getUsernameValidatedListerner().subscribe(response => {
      if (this.username.value == response.username) {
        if (!response.unique) {
          this.username.setErrors({isUnique: true});
        }
        this.validatingUsername = false;
        console.log(this.username.errors);
      }
    });
    //send username to be check if it's unique
    this.username.valueChanges.subscribe(value => {
      this.userService.checkUsernameIsUnique(this.username.value);
      this.validatingUsername = true;
    });
  }

  ngOnDestroy(){
    this.usernameValidated.unsubscribe();
  }

  get username(){
    return this.userForm.get('username');
  }
  get password(){
    return this.userForm.get('password');
  }
  get usertype(){
    return this.userForm.get('usertype');
  }
  // get officertype(){
  //   return this.userForm.get('officertype');
  // }
  get contact(){
    return this.userForm.get('contact');
  }
  get address(){
    return this.userForm.get('address');
  }

  usertypeflex = "100%";

  userTypeChoices = [
    {value: 'Patient', viewValue: 'Patient'},
    // {value: 'TestCentreOfficer', viewValue: 'Test Centre Officer'},
    {value: 'TestCentreManager', viewValue: 'Test Centre Manager'}];

  officerTypeChoices = [
    {value: 'Tester', viewValue: 'Tester'},
    {value: 'TestCentreManager', viewValue: 'Test Centre Manager'}];

    usernameIsUniqueValidator(control: FormControl): ValidationErrors {
      if(this.validatingUsername){
        return {isUnique: true};
      } else if (!this.validatingUsername) {
        if (this.usernameIsUnique) {
          return {isUnique: true};
        }
      }
      return null;
    }

  // userTypeChangeHandler(){
  //   this.usertypeflex = "100%";
  //   this.officertype.reset();
  //   this.officertype.setErrors(null);
  //   if (this.usertype.value == 'Officer') {
  //     this.usertypeflex = "50%";

  submitHandler(){
    // alert('submitted');
    // var actualUsertype = this.usertype.value;
    // if (this.usertype.value == 'Officer') {
    //   actualUsertype = this.officertype.value;
    // }

    this.userService.register(
      this.username.value,
      this.password.value,
      this.usertype.value,
      this.contact.value,
      this.address.value,
      null
    );
    // this.userForm.reset();
    // this.formGroupDirective.resetForm();
    // this.userForm.setErrors({ 'invalid': true });
    // this.route.navigate(['/login']);
  }
}
