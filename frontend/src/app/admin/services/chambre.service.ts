import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChambre } from '../../shared/models/chambre.model';
import { IChambreFilter } from '../../core/model/chambre.filter.model';
import { DATE_FORMAT } from '../../core/utils/input.constants';

type EntityResponseType = HttpResponse<IChambre>;
type EntityArrayResponseType = HttpResponse<IChambre[]>;

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  public resourceUrl = '/api/chambres';

  constructor(protected http: HttpClient) { }

  create(etablissementHotelier: IChambre): Observable<EntityResponseType> {
    return this.http.post<IChambre>(this.resourceUrl, etablissementHotelier, { observe: 'response' });
  }

  update(Chambre: IChambre): Observable<EntityResponseType>{
    return this.http.put<IChambre>(`${this.resourceUrl}/${Chambre.id_c}`, Chambre, { observe: 'response' });
  }

  findById(id: string): Observable<EntityResponseType> {
    return this.http.get<IChambre>(`${this.resourceUrl}/byId/${id}`, { observe: 'response' });
  }

  findByEtablissementHotelier(etablissementHotelierId: number): Observable<EntityArrayResponseType> {
    return this.http.get<IChambre[]>(`${this.resourceUrl}/byEtablissementHotelier/${etablissementHotelierId}`, { observe: 'response' });
  }

  findByFilter(chambreFilter: IChambreFilter): Observable<EntityArrayResponseType> {
    const copy = this.convertDateFromClient(chambreFilter);
    return this.http.post<IChambre[]>(`${this.resourceUrl}/filter`, copy, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<IChambre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chambreFilter: IChambreFilter): IChambreFilter {
    const copy: IChambreFilter = Object.assign({}, chambreFilter, {
      startDate: chambreFilter.startDate && chambreFilter.startDate.isValid() ? chambreFilter.startDate.format(DATE_FORMAT) : undefined,
      endDate: chambreFilter.endDate && chambreFilter.endDate.isValid() ? chambreFilter.endDate.format(DATE_FORMAT) : undefined,
    });

    return copy;
  }

}
