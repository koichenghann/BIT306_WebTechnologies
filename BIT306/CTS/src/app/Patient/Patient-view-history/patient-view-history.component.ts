import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector:'patient-view-history',
  templateUrl:'patient-view-history.component.html',
  styleUrls: ['patient-view-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PatientViewHistoryComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'testID', 'patientType', 'testStatus'];
  expandedElement: TestElement | null;
}

export interface TestElement {
  name: string;
  testID: string;
  patientType: string;
  testStatus: string;
  description: string;

}

const ELEMENT_DATA: TestElement[] = [
  {
    name: 'Lionel Messi',
    testID: '00001',
    testStatus: 'Negative',
    patientType: 'Returnee',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,

  }, {
    name: 'Sadio Mane',
    testID: '00002',
    testStatus: 'Positive',
    patientType: 'Infected',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,

  }, {

    name: 'Mo Salah',
    testID: '00003',
    testStatus: 'Negative',
    patientType: 'Suspected',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }
];

