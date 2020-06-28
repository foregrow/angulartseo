import { Ispit } from './../model/ispit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IspitService {

  private _urlGetAll: string = "http://localhost:8080/api/ispiti";

  constructor(private _http: HttpClient) { }

  getIspiti() : Observable<Ispit[]>{
    return this._http.get<Ispit[]>(this._urlGetAll);
  }

  addIspit(ispitData:Ispit,ispitniRokId, predmetId, ucenikId){
    return this._http.post<any>(`${this._urlGetAll}/${ispitniRokId}/${predmetId}/${ucenikId}`,ispitData);
  }

}