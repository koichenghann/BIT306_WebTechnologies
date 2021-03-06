import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective } from '@angular/forms';
import { UserService } from '../User/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-cts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CtsLoginComponent {
  userForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(public userService: UserService, private fb: FormBuilder, private route:Router) {}

  private loginStatus: Subscription;

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
    // console.log('list of users: ', this.userService.getUsers());

    this.loginStatus = this.userService.getLoginResponseListner().subscribe( response => {
      // alert(JSON.stringify(response.error.message));
      if (response.error.message == "Auth failed - user not found") {
        this.username.setErrors({invalidUsername: true});
        this.password.setErrors({invalidCredential: true});
      } else if (response.error.message == "Auth failed - wrong password") {
        this.username.setErrors({invalidCredential: true});
        this.password.setErrors({invalidPassword: true});
      }



    });


    //this.users=this.userService.getUsers();
  }

  ngOnDestroy(){
    this.loginStatus.unsubscribe();
  }
  get username(){
    return this.userForm.get('username');
  }
  get password(){
    return this.userForm.get('password');
  }

  submitHandler(){
    this.userService.login(this.username.value, this.password.value)
    // if(!this.userService.login(this.username.value, this.password.value)){
    //   for (let name in this.userForm.controls) {
    //     this.userForm.controls[name].setErrors({invalidCredential: true});
    //   }
    //   return;
    // }
    // this.userForm.reset();
    // this.formGroupDirective.resetForm();
    // switch (this.userService.getCurrentUser().usertype) {
    //   case 'Patient':
    //     this.route.navigate(['/patient-dashboard']);
    //     break;
    //
    //   case 'Officer':
    //     this.route.navigate(['/signup']);
    //     break;
    //
    //   case 'Tester':
    //     this.route.navigate(['/tester-dashboard']);
    //     break;
    //
    //   case 'TestCentreManager':
    //     this.route.navigate(['/manager-dashboard']);
    //     break;
    // }
    //this.route.navigate(['/signup']);
  }
}
