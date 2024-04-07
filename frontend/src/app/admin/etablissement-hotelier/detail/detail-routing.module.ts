import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtablissementHotelierDetailComponent } from './detail.component';
import { EtablissementHotelierChambresComponent } from '../chambres/chambres.component';
import { EtablissementHotelierEmployesComponent } from '../employes/employes.component';
import { AdminReservationsComponent } from '../reservations/reservations.component';
import { AdminReservationEditFormComponent } from '../reservations/edit-form/edit-form.component';

const routes: Routes = [
  {
    path: '',
    component: EtablissementHotelierDetailComponent,
  },
  {
    path: 'chambres',
    component: EtablissementHotelierChambresComponent
  },
  {
    path: 'employes',
    component: EtablissementHotelierEmployesComponent
  },
  {
    path: 'reservations',
    component: AdminReservationsComponent
  },
  {
    path: 'reservations/edit/:reservationId',
    component: AdminReservationEditFormComponent
  },
  {
    path: 'reservations/new',
    component: AdminReservationEditFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtablissementHotelierDetailRoutingModule { }
