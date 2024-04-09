import { Component, OnInit } from '@angular/core';
import { ICompteUtilisateur } from '../../../shared/models/compte-utilisateur.model';
import { IEtablissementHotelier } from '../../../shared/models/etablissement-hotelier.model';
import { ILocation, LocationStatut } from '../../../shared/models/location.model';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'app-hotels-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss'
})
export class EtablissementHotelierLocationsComponent implements OnInit{


  serverMessage: any;
  employe: ICompteUtilisateur | null = null;
  locations: ILocation[] = [];
  etablissementHotelier: IEtablissementHotelier | null = null;

  constructor(protected locationService: LocationService, private router: Router, protected activatedRoute: ActivatedRoute, private accountService: AccountService){

  }

  ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ etablissementHotelier }) => (this.etablissementHotelier = etablissementHotelier));
    this.loadLocations(this.etablissementHotelier?.id_eh!);
    this.accountService.currentUser().subscribe((res) => {
      this.employe = res;
    });
  }

  loadLocations(idEtablissement: number): void {
    this.locationService.findByEtablissement(idEtablissement).subscribe((res) => {
      this.locations = res.body ?? [];
      console.info('=>', this.locations);
    });
  }

  edit(location: ILocation): void{
    this.router.navigate(['/admin/hotels', this.etablissementHotelier?.id_eh,'locations','edit', location.id_loc])
  }

  delete(location: ILocation): void{
    this.locationService.delete(location.id_loc!).subscribe(()=>{


    });
  }

  start(location: ILocation): void{
    location.statut_loc = LocationStatut.EN_COURS;
    location.employe = this.employe||undefined;

    this.locationService.update(location).subscribe(() => {
      this.serverMessage = {message: 'Location demarrée', type: 'success'};
      setTimeout(() => {
        this.loadLocations(this.etablissementHotelier?.id_eh!);
        this.serverMessage = null;
      },2000);
    },
    (error) => {

      this.serverMessage = {message: error.error.message, type: 'danger'};
      setTimeout(() => {
        this.serverMessage = null;
      },3000);
    });
  }

  finish(location: ILocation): void{
    location.statut_loc = LocationStatut.TERMINEE;
    location.employe = this.employe||undefined;

    this.locationService.update(location).subscribe(() => {
      this.serverMessage = {message: 'Location terminée', type: 'success'};
      setTimeout(() => {
        this.loadLocations(this.etablissementHotelier?.id_eh!);
        this.serverMessage = null;
      },2000);
    },
    (error) => {

      this.serverMessage = {message: error.error.message, type: 'danger'};
      setTimeout(() => {
        this.serverMessage = null;
      },3000);
    });
  }


}
