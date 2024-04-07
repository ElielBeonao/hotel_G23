import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChaineHoteliere } from '../../shared/models/chaine-hoteliere.model';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<IChaineHoteliere>;
type EntityArrayResponseType = HttpResponse<IChaineHoteliere[]>;


@Injectable({
  providedIn: 'root'
})
export class ChaineHoteliereService {

  public resourceUrl = '/api/chaines-hotelieres';

  constructor(protected http: HttpClient) { }

  create(chaineHoteliere: IChaineHoteliere): Observable<EntityResponseType> {
    return this.http.post<IChaineHoteliere>(this.resourceUrl, chaineHoteliere, { observe: 'response' });
  }

  update(chaineHoteliere: IChaineHoteliere): Observable<EntityResponseType>{
    return this.http.put<IChaineHoteliere>(this.resourceUrl, chaineHoteliere, { observe: 'response' });
  }

  findBy(id: number): Observable<EntityResponseType> {
    return this.http.get<IChaineHoteliere>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = req;
    return this.http.get<IChaineHoteliere[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
