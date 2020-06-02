import { TestBed } from '@angular/core/testing';

import { SmerService } from './smer.service';

describe('SmerService', () => {
  let service: SmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
