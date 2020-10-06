import { TestBed } from '@angular/core/testing';

import { TestCentreService } from './test-centre.service';

describe('TestCentreServiceService', () => {
  let service: TestCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
