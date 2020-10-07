import { TestBed } from '@angular/core/testing';

import { TestKitStockService } from './test-kit-stock.service';

describe('TestKitStockService', () => {
  let service: TestKitStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestKitStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
