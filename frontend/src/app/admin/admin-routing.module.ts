import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { EtablissementHotelierComponent } from './etablissement-hotelier/etablissement-hotelier.component';
import { EtablissementHotelier, IEtablissementHotelier } from '../shared/models/etablissement-hotelier.model';
import { EtablissementHotelierService } from './services/etablissement-hotelier.service';
import { EMPTY, Observable, flatMap, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { EtablissementHotelierEditFormComponent } from './etablissement-hotelier/edit-form/edit-form.component';

@Injectable({ providedIn: 'root' })
export class EtablissementHotelierResolve implements Resolve<IEtablissementHotelier> {
  constructor(private service: EtablissementHotelierService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtablissementHotelier> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.findById(id).pipe(
        flatMap((project: HttpResponse<EtablissementHotelier>) => {
          if (project.body) {
            return of(project.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EtablissementHotelier());
  }
}


const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    component: ClientComponent
  },
  {
    path: 'hotels',
    component: EtablissementHotelierComponent
  },{
    path: 'hotels/:id',
    resolve: {
      etablissementHotelier: EtablissementHotelierResolve
    },
    data: {
      authorities: ['EMPLOYE']
    },
    loadChildren: ()=> import('./etablissement-hotelier/detail/detail.module').then(m => m.EtablissementHotelierDetailModule) 
  }
  
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
