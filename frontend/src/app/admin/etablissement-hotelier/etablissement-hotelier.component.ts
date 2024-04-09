import { Component, OnInit } from '@angular/core';
import { IEtablissementHotelier } from '../../shared/models/etablissement-hotelier.model';
import { EtablissementHotelierService } from '../services/etablissement-hotelier.service';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/model/user-account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-etablissement-hotelier',
  templateUrl: './etablissement-hotelier.component.html',
  styleUrl: './etablissement-hotelier.component.scss'
})
export class EtablissementHotelierComponent implements OnInit{

  account: Account | null = null;
  authSubscription?: Subscription;
  etablissementsHoteliers: IEtablissementHotelier[] = [];

  constructor(protected etablissementHotelierService: EtablissementHotelierService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadEtablissementHotelierByCurrentUser();
    this.account = this.accountService.getAuthenticationState();
    // this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

  }

  loadEtablissementHotelierByCurrentUser(){
    this.etablissementHotelierService.findByCurrentUser().subscribe((res) => {
      this.etablissementsHoteliers = res.body ?? [];
    });
  }

  openEtablissementHotelierModal(etablissementHotelier?: IEtablissementHotelier): void{

  }

  delete(etablissementHotelier?: IEtablissementHotelier): void{

  }
}
