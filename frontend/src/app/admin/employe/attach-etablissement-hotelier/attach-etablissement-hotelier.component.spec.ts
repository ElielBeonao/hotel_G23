import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachEtablissementHotelierComponent } from './attach-etablissement-hotelier.component';

describe('AttachEtablissementHotelierComponent', () => {
  let component: AttachEtablissementHotelierComponent;
  let fixture: ComponentFixture<AttachEtablissementHotelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachEtablissementHotelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttachEtablissementHotelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
