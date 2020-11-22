import { Component, OnInit } from '@angular/core';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { User } from '../../User/user.model';
import { Router } from '@angular/router';
import { Test } from '../../Tester/test.model';
import { TesterService } from '../../Tester/tester.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";


@Component({
  selector:'tester-update-form-dialog',
  templateUrl:'tester-update-form-dialog.component.html',
  styleUrls: ['tester-update-form-dialog.component.css']

})
export class TesterUpdateFormDialogComponent implements OnInit{

  constructor(private fb: FormBuilder,
    public testCentreService: TestCentreService,
    public userService: UserService,
    public testerService: TesterService,
    private route:Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog){}

  ngOnInit(): void{

  }



}


