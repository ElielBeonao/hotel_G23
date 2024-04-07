import { Component, OnInit } from '@angular/core';
import { IEtablissementHotelier } from '../../../shared/models/etablissement-hotelier.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class EtablissementHotelierDetailComponent implements OnInit {
  etablissementHotelier: IEtablissementHotelier | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissementHotelier }) => (this.etablissementHotelier = etablissementHotelier));
  }

  previousState(): void {
    window.history.back();
  }


}
