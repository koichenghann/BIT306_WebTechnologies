import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitStockFormComponent } from './test-kit-stock-form.component';

describe('TestKitStockFormComponent', () => {
  let component: TestKitStockFormComponent;
  let fixture: ComponentFixture<TestKitStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitStockFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
