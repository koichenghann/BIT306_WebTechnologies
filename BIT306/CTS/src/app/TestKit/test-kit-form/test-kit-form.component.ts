import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl, FormGroupDirective  } from '@angular/forms';
import { TestKitService } from '../test-kit.service';
import { TestCentreService } from '../../TestCentre/test-centre.service';
import { UserService } from '../../User/user.service';
import { TestKit } from '../test-kit.model';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-test-kit-form',
  templateUrl: './test-kit-form.component.html',
  styleUrls: ['./test-kit-form.component.css']
})
export class TestKitFormComponent implements OnInit {
  testKitForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  //@Input() selectedTestKit: TestKit;

  constructor(public userService: UserService, public testCentreService: TestCentreService, public testKitService: TestKitService, private fb: FormBuilder, private route:Router) { }

  ngOnInit(): void {
    this.testKitForm = this.fb.group({
      id: ['', [
        Validators.required
      ]],
      centre: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      stock: [0, [
        Validators.required,
        Validators.min(0)
      ]]
    });
    this.id.disable();
    this.centre.disable();
    this.currentTestCentre = this.testCentreService.getTestCentre(this.userService.getCurrentUser().username);
    this.setMode();
  }

  get id(){
    return this.testKitForm.get('id');
  }
  get centre(){
    return this.testKitForm.get('centre');
  }
  get name(){
    return this.testKitForm.get('name');
  }
  get stock(){
    return this.testKitForm.get('stock');
  }

  selectedTestKit;
  currentTestCentre;
  mode = 'add';

  setMode(){
    this.mode = 'add';
    this.selectedTestKit = this.testKitService.getSelectedTestKit();
    if (this.selectedTestKit != undefined) {
      this.mode = 'edit';
      this.populateForm();
      return;
    }
    this.id.setValue(this.testKitService.generateID());
    this.centre.setValue(this.currentTestCentre.id);
  }
  populateForm() {
    this.id.setValue(this.selectedTestKit.id);
    this.centre.setValue(this.selectedTestKit.centre);
    this.name.setValue(this.selectedTestKit.name);
    this.stock.setValue(this.selectedTestKit.stock);
  }
  submitHandler() {
    if ( this.testKitForm.invalid ) {
      return;
    }
    if ( this.mode == 'add' ) {
      this.testKitService.addTestKit(this.id.value, this.centre.value, this.name.value, this.stock.value);
    } else {
      this.testKitService.updateTestKit(this.id.value, this.centre.value, this.name.value, this.stock.value);
      this.testKitService.clearSelectedTestKit();
    }
    this.close();
  }
  clearTable(){
    this.testKitForm.reset();
    this.formGroupDirective.resetForm();
    this.testKitForm.setErrors({'invalid': true});
  }
  close() {
    this.clearTable;
    this.route.navigate(['/test-kit-table']);
  }

}
