import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Smer } from '../model/smer';

@Injectable({
  providedIn: 'root'
})
export class SmerService {

  private _urlGetAll: string = "http://localhost:8080/api/smerovi";
  private _urlGetByNazivPredmeta: string = "http://localhost:8080/api/smerovi/nazivPredmeta"
  constructor(private http: HttpClient) { }

  getById(id){
    var numbid = +id;
    return this.http.get(`${this._urlGetAll}/${numbid}`);
  }

  getSmerovi() : Observable<Smer[]>{
    return this.http.get<Smer[]>(this._urlGetAll);
  }

  getByNazivPredmeta(naziv: string) : Observable<Smer[]>{
    return this.http.get<Smer[]>(`${this._urlGetByNazivPredmeta}/${naziv}`);
  }

  addSmer(smerData:Smer,emailNas){
    return this.http.post<any>(`${this._urlGetAll}/${emailNas}`,smerData);
  }
  updateSmer(smerData:Smer,emailNas){
    return this.http.put<any>(`${this._urlGetAll}/${emailNas}`,smerData);
  }
  deleteSmer(id): Observable<any>{
    var numbid = +id;
    return this.http.delete(`${this._urlGetAll}/${numbid}`);
  }
}
