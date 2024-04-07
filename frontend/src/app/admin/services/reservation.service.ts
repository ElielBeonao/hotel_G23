import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReservation } from '../../shared/models/reservation.model';
import { Observable, map } from 'rxjs';
import { DATE_FORMAT } from '../../core/utils/input.constants';
import moment from 'moment';


type EntityResponseType = HttpResponse<IReservation>;
type EntityArrayResponseType = HttpResponse<IReservation[]>;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public resourceUrl = '/api/reservations';

  constructor(protected http: HttpClient) { }

  create(reservation: IReservation): Observable<EntityResponseType> {
    return this.http.post<IReservation>(this.resourceUrl, reservation, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reservation: IReservation): Observable<EntityResponseType>{
    return this.http.put<IReservation>(`${this.resourceUrl}/${reservation.id_res}`, reservation, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findById(id: number): Observable<EntityResponseType> {
    return this.http.get<IReservation>(`${this.resourceUrl}/byId/${id}`, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByCurrentUser(): Observable<EntityArrayResponseType> {
    return this.http.get<IReservation[]>(`${this.resourceUrl}/me`, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    
  }

  findByEtablissement(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IReservation[]>(`${this.resourceUrl}/byEtablissementHotelier/${id}`, { observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<IReservation[]>(this.resourceUrl, { params: options, observe: 'response' })
    .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reservation: IReservation): IReservation {
    const copy: IReservation = Object.assign({}, reservation, {
      date_debut: reservation.date_debut && reservation.date_debut.isValid() ? reservation.date_debut.format(DATE_FORMAT) : undefined,
      date_fin: reservation.date_fin && reservation.date_fin.isValid() ? reservation.date_fin.format(DATE_FORMAT) : undefined,
      date_res:
      reservation.date_res && reservation.date_res.isValid() ? reservation.date_res.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date_debut = res.body.date_debut ? moment(res.body.date_debut) : undefined;
      res.body.date_fin = res.body.date_fin ? moment(res.body.date_fin) : undefined;
      res.body.date_res = res.body.date_res ? moment(res.body.date_res) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reservation: IReservation) => {
        reservation.date_debut = reservation.date_debut ? moment(reservation.date_debut) : undefined;
        reservation.date_fin = reservation.date_fin ? moment(reservation.date_fin) : undefined;
        reservation.date_res = reservation.date_res ? moment(reservation.date_res) : undefined;
      });
    }
    return res;
  }

}
