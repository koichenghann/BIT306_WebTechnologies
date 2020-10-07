import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitTableComponent } from './test-kit-table.component';

describe('TestKitTableComponent', () => {
  let component: TestKitTableComponent;
  let fixture: ComponentFixture<TestKitTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
