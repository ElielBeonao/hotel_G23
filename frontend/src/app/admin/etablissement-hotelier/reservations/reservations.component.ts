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

  serverMessage: any;
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
    this.router.navigate(['/admin/hotels',this.etablissementHotelier?.id_eh,'reservations', reservation?.id_res, 'edit']);
  }

  delete(reservation: IReservation): void {
    this.reservationService.delete(reservation?.id_res!).subscribe(() => {
      // this.loadReservations();
    });
  }

  valider(reservation: IReservation): void {
    reservation.statut_res = ReservationStatut.CONFIRMEE;
    reservation.employe = this.employe||undefined;
    // reservation.employee = this.employe;
    // console.log(reservation);
    this.reservationService.update(reservation).subscribe(() => {
      this.serverMessage = {message: 'Reservation validée', type: 'success'};
      setTimeout(() => {
        this.loadReservations(this.etablissementHotelier?.id_eh!);
        this.serverMessage = null;
      },2000);
      // this.loadReservations(this.etablissementHotelier?.id_eh!);
    },
    (error) => {

      this.serverMessage = {message: error.error.message, type: 'danger'};
      setTimeout(() => {
        this.serverMessage = null;
      },3000);
    });
  }

  cancel(reservation: IReservation): void {
    reservation.statut_res = ReservationStatut.ANNULEE;
    reservation.employe = this.employe||undefined;
    this.reservationService.update(reservation).subscribe(() => {
      this.serverMessage = {message: 'Reservation annulée', type: 'success'};
      setTimeout(() => {
        this.loadReservations(this.etablissementHotelier?.id_eh!);
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
