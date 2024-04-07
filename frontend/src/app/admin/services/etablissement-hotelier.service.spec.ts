import { TestBed } from '@angular/core/testing';

import { EtablissementHotelierService } from './etablissement-hotelier.service';

describe('EtablissementHotelierService', () => {
  let service: EtablissementHotelierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtablissementHotelierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
