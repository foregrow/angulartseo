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
  
  constructor(private http: HttpClient) { }

  getPredmeti() : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(this._urlGetAll);
  }
  getPredmetiNastavnikNePredaje(id) : Observable<Predmet[]>{
    return this.http.get<Predmet[]>(`${this._urlGetAllNastavnikNePredaje}/${+id}`);
  }
}
