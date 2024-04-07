import { Component, OnInit } from '@angular/core';
import { IReservation, ReservationStatut } from '../../shared/models/reservation.model';
import { ReservationService } from '../../admin/services/reservation.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ClientReservationComponent implements OnInit {

  reservations: IReservation[] = [];

  constructor(protected reservationService: ReservationService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.findByCurrentUser().subscribe((res) => {
      this.reservations = res.body ?? [];
    });
  }
  add(): void {
    // this.router.navigate(['/client/reservations/new']);
  }

  edit(reservation?: IReservation): void {
    this.router.navigate(['/client/reservations', reservation?.id_res, 'edit']);
  }

  delete(reservation: IReservation): void {
    this.reservationService.delete(reservation?.id_res!).subscribe(() => {
      this.loadReservations();
    });
  }

  cancel(reservation: IReservation): void {
    reservation.statut_res = ReservationStatut.ANNULEE;
    this.reservationService.update(reservation).subscribe(() => {
      this.loadReservations();
    });
  }
}
