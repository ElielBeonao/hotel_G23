import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IReservation, ReservationStatut } from '../../../shared/models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { IEtablissementHotelier } from '../../../shared/models/etablissement-hotelier.model';
import { ICompteUtilisateur } from '../../../shared/models/compte-utilisateur.model';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class AdminReservationsComponent implements OnInit {

  employe: ICompteUtilisateur | null = null;
  reservations: IReservation[] = [];
  etablissementHotelier: IEtablissementHotelier | null = null;

  constructor(protected reservationService: ReservationService, private router: Router, protected activatedRoute: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etablissementHotelier }) => (this.etablissementHotelier = etablissementHotelier));
    this.loadReservations(this.etablissementHotelier?.id_eh!);
    this.accountService.currentUser().subscribe((res) => {
      this.employe = res;
    });
  }

  loadReservations(idEtablissement: number): void {
    this.reservationService.findByEtablissement(idEtablissement).subscribe((res) => {
      this.reservations = res.body ?? [];
    });
  }
  add(): void {
    // this.router.navigate(['/client/reservations/new']);
  }

  edit(reservation?: IReservation): void {
    this.router.navigate(['/admin/reservations', reservation?.id_res, 'edit']);
  }

  delete(reservation: IReservation): void {
    this.reservationService.delete(reservation?.id_res!).subscribe(() => {
      // this.loadReservations();
    });
  }

  valider(reservation: IReservation): void {
    reservation.statut_res = ReservationStatut.CONFIRMEE;
    // console.log(reservation);
    this.reservationService.update(reservation).subscribe(() => {
      // this.loadReservations();
    });
  }

  cancel(reservation: IReservation): void {
    reservation.statut_res = ReservationStatut.ANNULEE;
    this.reservationService.update(reservation).subscribe(() => {
      // this.loadReservations();
    });
  }
}
