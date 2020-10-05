import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCentreProfileComponent } from './test-centre-profile.component';

describe('TestCentreProfileComponent', () => {
  let component: TestCentreProfileComponent;
  let fixture: ComponentFixture<TestCentreProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCentreProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCentreProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
