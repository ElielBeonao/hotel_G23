import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '../../shared/models/location.model';
import { DATE_FORMAT } from '../../core/utils/input.constants';
import moment from 'moment';
import { Observable, map } from 'rxjs';


type EntityResponseType = HttpResponse<ILocation>;
type EntityArrayResponseType = HttpResponse<ILocation[]>;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public resourceUrl = '/api/locations';

  constructor(protected http: HttpClient) { }

  create(location: ILocation): Observable<EntityResponseType> {
    return this.http.post<ILocation>(this.resourceUrl, location, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(location: ILocation): Observable<EntityResponseType>{
    return this.http.put<ILocation>(`${this.resourceUrl}/${location.id_loc}`, location, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findById(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocation>(`${this.resourceUrl}/byId/${id}`, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByCurrentUser(): Observable<EntityArrayResponseType> {
    return this.http.get<ILocation[]>(`${this.resourceUrl}/me`, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    
  }

  findByEtablissement(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ILocation[]>(`${this.resourceUrl}/byEtablissementHotelier/${id}`, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<ILocation[]>(this.resourceUrl, { params: options, observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(location: ILocation): ILocation {
    const copy: ILocation = Object.assign({}, location, {
      date_debut: location.date_debut && moment(location.date_debut).isValid() ? moment(location.date_debut).format(DATE_FORMAT) : undefined,
      date_fin: location.date_fin && moment(location.date_fin).isValid() ? moment(location.date_fin).format(DATE_FORMAT) : undefined,
      date_loc:
      location.date_loc && moment(location.date_loc).isValid() ? moment(location.date_loc).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date_debut = res.body.date_debut ? moment(res.body.date_debut) : undefined;
      res.body.date_fin = res.body.date_fin ? moment(res.body.date_fin) : undefined;
      res.body.date_loc = res.body.date_loc ? moment(res.body.date_loc) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((location: ILocation) => {
        location.date_debut = location.date_debut ? moment(location.date_debut) : undefined;
        location.date_fin = location.date_fin ? moment(location.date_fin) : undefined;
        location.date_loc = location.date_loc ? moment(location.date_loc) : undefined;
      });
    }
    return res;
  }
}
