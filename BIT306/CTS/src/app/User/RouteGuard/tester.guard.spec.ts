import { TestBed } from '@angular/core/testing';

import { TesterGuard } from './tester.guard';

describe('TesterGuard', () => {
  let guard: TesterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TesterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
