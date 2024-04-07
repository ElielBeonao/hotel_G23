import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetachEtablissementHotelierComponent } from './detach-etablissement-hotelier.component';

describe('DetachEtablissementHotelierComponent', () => {
  let component: DetachEtablissementHotelierComponent;
  let fixture: ComponentFixture<DetachEtablissementHotelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetachEtablissementHotelierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetachEtablissementHotelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
