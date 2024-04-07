import { Component, Input, OnInit } from '@angular/core';
import { CompteUtilisateur, ICompteUtilisateur } from '../../../shared/models/compte-utilisateur.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompteUtilisateurService } from '../../services/compte-utilisateur.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss'
})
export class EditClientFormComponent implements OnInit {

  @Input()
  client: ICompteUtilisateur = new CompteUtilisateur();
  
  isSaving = false;

  editForm: FormGroup;

  constructor(
    protected compteUtilisateurService: CompteUtilisateurService,
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

  updateForm(compteUtilisateur: ICompteUtilisateur): void {
    this.editForm.patchValue({
      id_user: compteUtilisateur.id_user,
      username: compteUtilisateur.username,
      nom_complet: compteUtilisateur.nom_complet,
      user_type: compteUtilisateur.user_type,
    });
  }

  save(): void {
    this.isSaving = true;
    const compteUtilisateur = this.createFromForm();
    if (compteUtilisateur.id_user !== undefined) {
      this.subscribeToSaveResponse(this.compteUtilisateurService.update(compteUtilisateur));
    } else {
      this.subscribeToSaveResponse(this.compteUtilisateurService.create(compteUtilisateur));
    }
  }


  private createFromForm(): ICompteUtilisateur {
    return {
      ...new CompteUtilisateur(),
      id_user: this.editForm.get(['id_user'])!.value,
      username: this.editForm.get(['username'])!.value,
      nom_complet: this.editForm.get(['nom_complet'])!.value,
      user_type: this.editForm.get(['user_type'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompteUtilisateur>>): void {
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
