import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from '../User/user.model';
import { UserService } from '../User/user.service';

// function usernameIsUniqueValidator (control: AbstractControl):{[key: string]: boolean} | null {
//   var us: UserService = userService;
//   if(!us.checkUsernameIsUnique(control.value)){
//     return {'isUnique': true}
//   }
//   return null;
// };

@Component({
  selector: 'app-cts-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class CtsSignupComponent {
  userForm: FormGroup;
  constructor(public userService: UserService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [
        this.usernameIsUniqueValidator.bind(this),
        Validators.required,
        Validators.minLength(7)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(7)
      ]],
      usertype: ['', [
        Validators.required,
      ]],
      officertype: ['', [
        // Validators.required,
      ]],
      contact: ['', [
        // Validators.required,
      ]],
      address: ['', [
        // Validators.required,
      ]]
    })
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

  usertypeflex = "100%";
  actualUsertype = "";
  usernameIsUnique = true;

  userTypeChoices = [
    {value: 'Patient', viewValue: 'Patient'},
    {value: 'Officer', viewValue: 'Officer'}];

  officerTypeChoices = [
    {value: 'Tester', viewValue: 'Tester'},
    {value: 'TestCentreManager', viewValue: 'Test Centre Manager'}];

    usernameIsUniqueValidator(control: FormControl): ValidationErrors {
      if(!this.userService.checkUsernameIsUnique(control.value)){
        return {isUnique: true};
      }
      return null;
    }

  userTypeChangeHandler(){
    this.usertypeflex = "100%";
    this.officertype.reset();
    if (this.usertype.value == 'Officer') {
      this.usertypeflex = "50%";
    }
  }

  submitHandler(){
    var actualUsertype = this.usertype.value;
    if (this.usertype.value == 'Officer') {
      actualUsertype = this.officertype.value;
    }

    this.userService.register(
      this.username.value,
      this.password.value,
      actualUsertype,
      this.contact.value,
      this.address.value
    );
    this.userForm.reset();
    for (let name in this.userForm.controls) {
      this.userForm.controls[name].setErrors(null);
    }
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
