import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from '../User/user.model';
import { UserService } from '../User/user.service';

function usernameIsUniqueValidator (control: AbstractControl):{[key: string]: boolean} | null {
  var us: UserService = new UserService;
  if(!us.checkUsernameIsUnique(control.value)){
    return {'isUnique': true}
  }
  return null;
};

@Component({
  selector: 'app-cts-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class CtsSignupComponent {
  userForm: FormGroup;
  constructor(public userService: UserService, private fb: FormBuilder) { }



  ngOnInit(): void {

    this.userForm = this.fb.group({
      username: ['', [
        usernameIsUniqueValidator,
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      usertype: ['', [
        Validators.required,
      ]],
      officertype: ['', [
        Validators.required,
      ]],
      contact: ['', [
        // Validators.required,
      ]],
      address: ['', [
        // Validators.required,
      ]]
    })



  }

  checkUsernameIsUnique() {
    return this.userService.checkUsernameIsUnique(this.username.value);
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
  get officertype(){
    return this.userForm.get('officertype');
  }
  get contact(){
    return this.userForm.get('contact');
  }
  get address(){
    return this.userForm.get('address');
  }



  // id = "";
  // username = "";
  // password = "";
  // contact = "";
  // address = "";
  // usertype = "";
  // officertype = "";
  usertypeflex = "100%";
  actualUsertype = "";
  usernameIsUnique = true;

  userTypeChoices = [
    {value: 'Patient', viewValue: 'Patient'},
    {value: 'Officer', viewValue: 'Officer'}];

  officerTypeChoices = [
    {value: 'Tester', viewValue: 'Tester'},
    {value: 'TestCentreManager', viewValue: 'Test Centre Manager'}];

  userTypeChangeHandler(){
    this.usertypeflex = "100%";
    this.officertype.reset();
    if (this.usertype.value == 'Officer') {
      this.usertypeflex = "50%";
    }
  }

  submitHandler(){
    console.log(this.usertype.value);
    this.userService.checkUsernameIsUnique('test');
  }


  // onRegister(form: NgForm){
  //   console.log('register clicked');
  //   if (form.invalid){
  //     console.log('form invalid');
  //     return;
  //   }
  //
  //   console.log('form valid');
  //
  //   this.actualUsertype = this.usertype;
  //   if (this.usertype == 'Officer') {
  //     this.actualUsertype = this.officertype;
  //   }
  //
  //   console.log('form valid 2');
  //
  //   this.usernameIsUnique = true;
  //   if(this.userService.register(this.username, this.password, this.actualUsertype, this.contact, this.address) != undefined){
  //     this.usernameIsUnique = false;
  //     console.log('invalid 2');
  //     return;
  //   }
  //
  //   form.resetForm();
  //   console.log('user registered');
  // }
  //
  // onUserTypeChange(){
  //   if (this.usertype == 'Patient') {
  //     this.usertypeflex = "100%";
  //   } else {
  //     this.usertypeflex = "50%";
  //   }
  // }
}
