import { Component, Input, OnInit } from '@angular/core';
import { Chambre, IChambre } from '../../../../shared/models/chambre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChambreService } from '../../../services/chambre.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chambre-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditFormComponent implements OnInit{

  @Input()
  client: IChambre = new Chambre();
  
  isSaving = false;

  editForm: FormGroup;

  constructor(
    protected chambreService: ChambreService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { 
    this.editForm = this.fb.group({
      id_user: [],
      username: [null, [Validators.required]],
      nom_complet: [null, [Validators.required]],
      user_type: [null, [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.updateForm(this.client);
  }

  updateForm(chambre: IChambre): void {
    this.editForm.patchValue({
      id_ic: chambre.id_c,
      intitule_c: chambre.intitule_c,
      air_cond_c: chambre.air_cond_c,
      capacite_c: chambre.capacite_c,
      extensible_c: chambre.extensible_c,
      issue_c: chambre.issue_c,
      prix_c: chambre.prix_c,
      refrigerator_c: chambre.refrigerator_c,
      tv_c: chambre.tv_c,
    });
  }

  save(): void {
    this.isSaving = true;
    const Chambre = this.createFromForm();
    if (Chambre.id_c !== undefined) {
      this.subscribeToSaveResponse(this.chambreService.update(Chambre));
    } else {
      this.subscribeToSaveResponse(this.chambreService.create(Chambre));
    }
  }


  private createFromForm(): IChambre {
    return {
      ...new Chambre(),
      // id_ic: this.editForm.get(['id_user'])!.value,
      intitule_c: this.editForm.get(['intitule_c'])!.value,
      air_cond_c: this.editForm.get(['air_cond_c'])!.value,
      capacite_c: this.editForm.get(['capacite_c'])!.value,
      tv_c: this.editForm.get(['tv_c'])!.value,
      extensible_c: this.editForm.get(['extensible_c'])!.value,
      refrigerator_c: this.editForm.get(['refrigerator_c'])!.value,
      prix_c: this.editForm.get(['prix_c'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChambre>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }


  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.activeModal.close({ success: true });
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }


  cancel(): void {
    this.activeModal.dismiss();
  }
}
