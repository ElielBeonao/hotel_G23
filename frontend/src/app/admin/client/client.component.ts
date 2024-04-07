import { Component, OnInit } from '@angular/core';
import { CompteUtilisateurService } from '../services/compte-utilisateur.service';
import { CompteUtilisateur, ICompteUtilisateur } from '../../shared/models/compte-utilisateur.model';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditClientFormComponent } from './edit-form/edit-form.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  clients: CompteUtilisateur[] = [];

  constructor(protected compteUtilisateurService: CompteUtilisateurService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.compteUtilisateurService.findByUserType('CLIENT')
    .subscribe((res: HttpResponse<CompteUtilisateur[]> ) => {
      this.clients = res.body ?? [];
    });
  }

  openClientModal(client?: ICompteUtilisateur): void {
    const modalRef = this.modalService.open(EditClientFormComponent, { size: 'md', backdrop: 'static' });
    if (client === undefined) {
      client = new CompteUtilisateur();
    }
    client.user_type = 'CLIENT';

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
