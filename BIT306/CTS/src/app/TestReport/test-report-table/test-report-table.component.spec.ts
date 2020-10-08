import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportTableComponent } from './test-report-table.component';

describe('TestReportTableComponent', () => {
  let component: TestReportTableComponent;
  let fixture: ComponentFixture<TestReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
