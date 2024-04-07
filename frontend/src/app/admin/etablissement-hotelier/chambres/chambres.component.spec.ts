import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementHotelierChambresComponent } from './chambres.component';

describe('ChambresComponent', () => {
  let component: EtablissementHotelierChambresComponent;
  let fixture: ComponentFixture<EtablissementHotelierChambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementHotelierChambresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtablissementHotelierChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
