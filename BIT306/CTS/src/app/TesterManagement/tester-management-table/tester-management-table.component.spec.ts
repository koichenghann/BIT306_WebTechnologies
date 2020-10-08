import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterManagementTableComponent } from './tester-management-table.component';

describe('TesterManagementTableComponent', () => {
  let component: TesterManagementTableComponent;
  let fixture: ComponentFixture<TesterManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesterManagementTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
