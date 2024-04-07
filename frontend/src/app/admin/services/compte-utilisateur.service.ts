import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompteUtilisateur } from '../../shared/models/compte-utilisateur.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<ICompteUtilisateur>;
type EntityArrayResponseType = HttpResponse<ICompteUtilisateur[]>;

@Injectable({
  providedIn: 'root'
})
export class CompteUtilisateurService {

  public resourceUrl = '/api/users';

  constructor(protected http: HttpClient) { }

  create(compteUtilisateur: ICompteUtilisateur): Observable<EntityResponseType> {
    return this.http.post<ICompteUtilisateur>(this.resourceUrl, compteUtilisateur, { observe: 'response' });
  }

  update(compteUtilisateur: ICompteUtilisateur): Observable<EntityResponseType>{
    return this.http.put<ICompteUtilisateur>(`${this.resourceUrl}/${compteUtilisateur.id_user}`, compteUtilisateur, { observe: 'response' });
  }

  findBy(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompteUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByUserType(userType: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICompteUtilisateur[]>(`${this.resourceUrl}/userType/${userType}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<ICompteUtilisateur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
