import { Component, OnInit } from '@angular/core';
import { IChambre } from '../../../shared/models/chambre.model';
import { IReservation, Reservation } from '../../../shared/models/reservation.model';
import { ActivatedRoute } from '@angular/router';
import { ChambreService } from '../../../admin/services/chambre.service';
import { ReservationService } from '../../../admin/services/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompteUtilisateur } from '../../../shared/models/compte-utilisateur.model';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'app-client-reservation-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class ClientReservationEditFormComponent implements OnInit{

  isSaving = false;
  chambreDeReservation: IChambre  | null = null;
  reservation: IReservation | null = null;
  client: ICompteUtilisateur | null = null;
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
                chambre: [null, []],
                client: [null, []],
              });
            }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.loadChambreById(params.get('chambreId'));
      this.loadReservationById(params.get('reservationId'));
      this.accountService.currentUser().subscribe((res) => {
        this.client = res;
      });
    });
  }

  loadChambreById(id: string | null): void {
    if (id !== null) {
      this.chambreService.findById(id).subscribe((res) => {
        this.chambreDeReservation = res.body ?? null;
      });
    }
  }

  loadReservationById(id: string | null): void {
    if (id !== null) {
      const reservationId = Number(id);
      this.reservationService.findById(reservationId).subscribe((res) => {
        this.reservation = res.body ?? new Reservation();
        this.reservation.chambre = this.chambreDeReservation ?? undefined;
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  updateForm(reservation: IReservation): void {
    this.editForm.patchValue({
      id_res: reservation.id_res,
      date_debut: reservation.date_debut,
      date_fin: reservation.date_fin,
      date_res: reservation.date_res,
      statut_res: reservation.statut_res,
      client: reservation.client,
      employe: reservation.employe,
    });
  }

  save(): void {
    const reservation = this.createFromForm();
    this.isSaving = true;
    reservation.chambre = this.chambreDeReservation ?? undefined;
    reservation.client = this.client ?? undefined;
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
