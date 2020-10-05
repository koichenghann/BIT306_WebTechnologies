import { TestBed } from '@angular/core/testing';

import { TestCentreServiceService } from './test-centre-service.service';

describe('TestCentreServiceService', () => {
  let service: TestCentreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCentreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
