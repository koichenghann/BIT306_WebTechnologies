import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitStockTableComponent } from './test-kit-stock-table.component';

describe('TestKitStockTableComponent', () => {
  let component: TestKitStockTableComponent;
  let fixture: ComponentFixture<TestKitStockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitStockTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKitStockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
