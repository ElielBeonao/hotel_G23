import { Component, OnInit } from '@angular/core';
import { CompteUtilisateur, ICompteUtilisateur } from '../../shared/models/compte-utilisateur.model';
import { HttpResponse } from '@angular/common/http';
import { CompteUtilisateurService } from '../services/compte-utilisateur.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditClientFormComponent } from '../client/edit-form/edit-form.component';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.scss'
})
export class EmployeComponent implements OnInit{

  clients: CompteUtilisateur[] = [];

  constructor(protected compteUtilisateurService: CompteUtilisateurService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.compteUtilisateurService.findByUserType('EMPLOYEE')
    .subscribe((res: HttpResponse<CompteUtilisateur[]> ) => {
      this.clients = res.body ?? [];
    });
  }

  openClientModal(client?: ICompteUtilisateur): void {
    const modalRef = this.modalService.open(EditClientFormComponent, { size: 'md', backdrop: 'static' });
    if (client === undefined) {
      client = new CompteUtilisateur();
    }
    client.user_type = 'EMPLOYEE';

    modalRef.componentInstance.client = client;
    modalRef.result.then(result => {
      if (result.success === true) {
        this.loadAll();
      }
    });
  }

  delete(client: ICompteUtilisateur): void {
    this.compteUtilisateurService.delete(client?.id_user!).subscribe(() => {
      this.loadAll();
    });
  }

}
