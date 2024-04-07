import { Injectable } from '@angular/core';
import { IEtablissementHotelier } from '../../shared/models/etablissement-hotelier.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IEtablissementHotelier>;
type EntityArrayResponseType = HttpResponse<IEtablissementHotelier[]>;

@Injectable({
  providedIn: 'root'
})
export class EtablissementHotelierService {
 
  public resourceUrl = '/api/etablissements-hoteliers';

  constructor(protected http: HttpClient) { }

  create(etablissementHotelier: IEtablissementHotelier): Observable<EntityResponseType> {
    return this.http.post<IEtablissementHotelier>(this.resourceUrl, etablissementHotelier, { observe: 'response' });
  }

  update(EtablissementHotelier: IEtablissementHotelier): Observable<EntityResponseType>{
    return this.http.put<IEtablissementHotelier>(this.resourceUrl, EtablissementHotelier, { observe: 'response' });
  }

  findById(id: number): Observable<EntityResponseType> {
    return this.http.get<IEtablissementHotelier>(`${this.resourceUrl}/byId/${id}`, { observe: 'response' });
  }

  findByCurrentUser(): Observable<EntityArrayResponseType> {
    return this.http.get<IEtablissementHotelier[]>(`${this.resourceUrl}/me`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<IEtablissementHotelier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
