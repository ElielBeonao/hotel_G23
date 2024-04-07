import { TestBed } from '@angular/core/testing';

import { ChaineHoteliereService } from './chaine-hoteliere.service';

describe('ChaineHoteliereService', () => {
  let service: ChaineHoteliereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaineHoteliereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
