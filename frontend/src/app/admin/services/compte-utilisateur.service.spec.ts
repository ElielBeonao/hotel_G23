import { TestBed } from '@angular/core/testing';

import { CompteUtilisateurService } from './compte-utilisateur.service';

describe('ClientService', () => {
  let service: CompteUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
