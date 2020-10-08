import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportDetailComponent } from './test-report-detail.component';

describe('TestReportDetailComponent', () => {
  let component: TestReportDetailComponent;
  let fixture: ComponentFixture<TestReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
