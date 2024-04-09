import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtablissementHotelierDetailRoutingModule } from './detail-routing.module';
import { EtablissementHotelierEmployesComponent } from '../employes/employes.component';
import { EtablissementHotelierChambresComponent } from '../chambres/chambres.component';
import { EtablissementHotelierDetailComponent } from './detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { AdminReservationsComponent } from '../reservations/reservations.component';
import { AdminReservationEditFormComponent } from '../reservations/edit-form/edit-form.component';
import { EtablissementHotelierLocationsComponent } from '../locations/locations.component';


@NgModule({
  declarations: [
    EtablissementHotelierChambresComponent,
    EtablissementHotelierEmployesComponent,
    EtablissementHotelierDetailComponent,
    AdminReservationEditFormComponent,
    AdminReservationsComponent,
    EtablissementHotelierLocationsComponent,
    EtablissementHotelierLocationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EtablissementHotelierDetailRoutingModule
  ]
})
export class EtablissementHotelierDetailModule { }
