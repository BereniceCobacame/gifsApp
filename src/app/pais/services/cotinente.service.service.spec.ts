import { TestBed } from '@angular/core/testing';

import { Cotinente.ServiceService } from './cotinente.service.service';

describe('Cotinente.ServiceService', () => {
  let service: Cotinente.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cotinente.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
