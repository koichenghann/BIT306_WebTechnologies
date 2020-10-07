import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective } from '@angular/forms';
import { UserService } from '../User/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CtsLoginComponent {
  userForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public userService: UserService, private fb: FormBuilder, private route:Router) {}

  users = [];
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
    console.log('list of users: ', this.userService.getUsers());
    //this.users=this.userService.getUsers();
  }


  get username(){
    return this.userForm.get('username');
  }
  get password(){
    return this.userForm.get('password');
  }

  submitHandler(){
    if(!this.userService.login(this.username.value, this.password.value)){
      for (let name in this.userForm.controls) {
        this.userForm.controls[name].setErrors({invalidCredential: true});
      }
      return;
    }
    this.userForm.reset();
    this.formGroupDirective.resetForm();
    switch (this.userService.getCurrentUser().usertype) {
      case 'Patient':
        this.route.navigate(['/signup']);
        break;

      case 'Tester':
        this.route.navigate(['/signup']);
        break;

      case 'TestCentreManager':
        this.route.navigate(['/test-centre-form']);
        break;
    }
    //this.route.navigate(['/signup']);
  }
}
