import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitFormComponent } from './test-kit-form.component';

describe('TestKitFormComponent', () => {
  let component: TestKitFormComponent;
  let fixture: ComponentFixture<TestKitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
