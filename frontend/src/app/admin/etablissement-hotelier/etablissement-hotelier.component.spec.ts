import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementHotelierComponent } from './etablissement-hotelier.component';

describe('EtablissementHotelierComponent', () => {
  let component: EtablissementHotelierComponent;
  let fixture: ComponentFixture<EtablissementHotelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementHotelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtablissementHotelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
