import { TestBed } from '@angular/core/testing';

import { FinansijskaKarticaService } from './finansijska-kartica.service';

describe('FinansijskaKarticaService', () => {
  let service: FinansijskaKarticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinansijskaKarticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
