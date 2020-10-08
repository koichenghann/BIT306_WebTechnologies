import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterManagementFormComponent } from './tester-management-form.component';

describe('TesterManagementFormComponent', () => {
  let component: TesterManagementFormComponent;
  let fixture: ComponentFixture<TesterManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesterManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
