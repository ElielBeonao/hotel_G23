import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientComponent } from './client/client.component';
import { ChambreComponent } from './chambre/chambre.component';
import { EmployeComponent } from './employe/employe.component';
import { EtablissementHotelierComponent } from './etablissement-hotelier/etablissement-hotelier.component';
import { SharedModule } from '../shared/shared.module';
import { EditClientFormComponent } from './client/edit-form/edit-form.component';
import { AttachEtablissementHotelierComponent } from './employe/attach-etablissement-hotelier/attach-etablissement-hotelier.component';


@NgModule({
  declarations: [
    ClientComponent,
    EditClientFormComponent,
    ChambreComponent,
    EmployeComponent,
    AttachEtablissementHotelierComponent,
    EtablissementHotelierComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
