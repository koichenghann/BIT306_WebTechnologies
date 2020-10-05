import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-centre-form',
  templateUrl: './test-centre-form.component.html',
  styleUrls: ['./test-centre-form.component.css']
})

export class TestCentreFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  foods = [
  {value: 'steak-0', viewValue: 'Steak'},
  {value: 'pizza-1', viewValue: 'Pizza'},
  {value: 'tacos-2', viewValue: 'Tacos'}
];

}
