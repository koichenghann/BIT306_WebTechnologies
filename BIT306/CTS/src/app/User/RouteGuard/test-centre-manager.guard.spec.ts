import { TestBed } from '@angular/core/testing';

import { TestCentreManagerGuard } from './test-centre-manager.guard';

describe('TestCentreManagerGuard', () => {
  let guard: TestCentreManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TestCentreManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
