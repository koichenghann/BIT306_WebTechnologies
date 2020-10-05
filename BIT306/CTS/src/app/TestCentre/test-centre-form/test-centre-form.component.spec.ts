import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCentreFormComponent } from './test-centre-form.component';

describe('TestCentreFormComponent', () => {
  let component: TestCentreFormComponent;
  let fixture: ComponentFixture<TestCentreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCentreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCentreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
