import { TestBed } from '@angular/core/testing';

import { TestCentreOfficerGuard } from './test-centre-officer.guard';

describe('TestCentreOfficerGuard', () => {
  let guard: TestCentreOfficerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TestCentreOfficerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
