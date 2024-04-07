import { Component, OnInit } from '@angular/core';
import { IEtablissementHotelier } from '../../../shared/models/etablissement-hotelier.model';
import { ActivatedRoute } from '@angular/router';
import { IChambre } from '../../../shared/models/chambre.model';
import { ChambreService } from '../../services/chambre.service';

@Component({
  selector: 'app-hotel-chambres',
  templateUrl: './chambres.component.html',
  styleUrl: './chambres.component.scss'
})
export class EtablissementHotelierChambresComponent implements OnInit{

  etablissementHotelier: IEtablissementHotelier | null = null;
  chambres: IChambre[] = [];

  constructor(protected activatedRoute: ActivatedRoute, private chambreService: ChambreService){

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissementHotelier }) => (this.etablissementHotelier = etablissementHotelier));
    this.loadChambres();
  }

  loadChambres():void{
    this.chambreService.findByEtablissementHotelier(this.etablissementHotelier?.id_eh!).subscribe((res) => {
      this.chambres = res.body?? [];
    });
  }

  openChambreModal(chambre?: IChambre): void{

  }

  delete(chambre: IChambre): void{

  }
}
