import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChambre } from '../../../../shared/models/chambre.model';
import { IReservation, Reservation } from '../../../../shared/models/reservation.model';
import { ICompteUtilisateur } from '../../../../shared/models/compte-utilisateur.model';
import { ChambreService } from '../../../services/chambre.service';
import { ReservationService } from '../../../services/reservation.service';
import { AccountService } from '../../../../core/auth/account.service';


@Component({
  selector: 'app-admin-reservation-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class AdminReservationEditFormComponent implements OnInit{

  isSaving = false;
  reservation: IReservation | null = null;
  employe: ICompteUtilisateur | null = null;
  chambres: IChambre[] = [];
  clients: ICompteUtilisateur[] = [];
  editForm: FormGroup;

  startDateDp: any;
  endDateDp: any;

  constructor(
              protected activatedRoute: ActivatedRoute, 
              private fb: FormBuilder,
              private chambreService: ChambreService, 
              private reservationService: ReservationService,
              private accountService: AccountService
            ) { 
              this.editForm = this.fb.group({
                id_res: [],
                date_debut: [null,[Validators.required]],
                date_fin: [null,[Validators.required]],
                date_res: [],
                statut_res: [0, [Validators.required]],
                chambre: [null, [Validators.required]],
                client: [null, [Validators.required]],
              });
            }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const reservationId = params.get('reservationId');
      this.loadReservationById(reservationId);
    });
  }

  loadReservationById(id: string | null): void {
    if (id !== null) {
      const reservationId = Number(id);
      this.reservationService.findById(reservationId).subscribe((res) => {
        this.reservation = res.body ?? new Reservation();
        this.updateForm(this.reservation);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  updateForm(reservation: IReservation): void {
    // console.info(reservation);
    this.editForm.patchValue({
      id_res: reservation.id_res,
      date_debut: reservation.date_debut,
      date_fin: reservation.date_fin,
      date_res: reservation.date_res,
      statut_res: reservation.statut_res,
      chambre: reservation.chambre,
      client: reservation.client,
      employe: reservation.employe,
    });
  }

  save(): void {
    const reservation = this.createFromForm();
    this.isSaving = true;
    // reservation.chambre = this.chambreDeReservation ?? undefined;
    // reservation.client = this.client ?? undefined;
    if (reservation.id_res !== undefined) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  private createFromForm(): IReservation {
    return {
      ...new Reservation(),
      // id_ic: this.editForm.get(['id_user'])!.value,
      date_debut: this.editForm.get(['date_debut'])!.value,
      date_fin: this.editForm.get(['date_fin'])!.value,
      date_res: this.editForm.get(['date_res'])!.value,
      statut_res: this.editForm.get(['statut_res'])!.value,
      chambre: this.editForm.get(['chambre'])!.value,
      client: this.editForm.get(['client'])!.value,
      employe: this.employe?? undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

}
