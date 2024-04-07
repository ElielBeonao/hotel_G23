import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLocationComponent } from './location/location.component';
import { ClientReservationComponent } from './reservation/reservation.component';
import { ClientReservationEditFormComponent } from './reservation/edit-form/edit-form.component';

const routes: Routes = [
  {
  path: 'locations',
  component: ClientLocationComponent
  }, 
  {
    path: 'reservations',
    component: ClientReservationComponent
  },
  {
    path: 'reservations/new/:chambreId',
    component: ClientReservationEditFormComponent
  
  },{
    path: 'reservations/edit/:id',
    component: ClientReservationEditFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
