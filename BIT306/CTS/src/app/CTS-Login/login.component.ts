import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { UserService } from '../User/user.service';

@Component({
  selector: 'app-cts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class CtsLoginComponent {
  userForm: FormGroup;
  constructor(public userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }


}
