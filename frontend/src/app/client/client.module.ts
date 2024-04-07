import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLocationComponent } from './location/location.component';
import { ClientReservationComponent } from './reservation/reservation.component';
import { SharedModule } from '../shared/shared.module';
import { ClientReservationEditFormComponent } from './reservation/edit-form/edit-form.component';


@NgModule({
  declarations: [
    ClientLocationComponent,
    ClientReservationComponent,
    ClientReservationEditFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
