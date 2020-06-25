import { Injectable } from '@angular/core';
import { Predmet } from '../model/predmet';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PredmetService {

  private _urlGetAll: string = "http://localhost:8080/api/predmeti";
  private _urlGetAllNastavnikNePredaje: string = "http://localhost:8080/api/predmeti/nastavnikNePredaje";
  private _urlGetNepolozeniPredmeti: string = "http://localhost:8080/api/predmeti/nepolozeniPredmeti";
  //private _urlGetPredmetiNotInSmer: string = "http://localhost:8080/api/predmeti/notInSmer";
  
  constructor(private http: HttpClient) { }

  getPredmeti() : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(this._urlGetAll);
  }
  /*getPredmetiNotInSmer(idSmera) : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this._urlGetPredmetiNotInSmer}/${+idSmera}`);
  }*/
  getPredmetiNastavnikNePredaje(id) : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this._urlGetAllNastavnikNePredaje}/${+id}`);
  }
  getNepolozeniPredmeti(smerId,ucenikId) : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this._urlGetNepolozeniPredmeti}/${+smerId}/${+ucenikId}`);
  }
}
