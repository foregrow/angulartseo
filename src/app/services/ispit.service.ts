import { Ispit } from './../model/ispit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IspitService {

  private _urlGetAll: string = "http://localhost:8080/api/ispiti";
  private _urlOdjavaIspita: string = "http://localhost:8080/api/ispiti/odjavaIspita";
  private _urlAddDatumPolaganja: string = "http://localhost:8080/api/ispiti/addDatumPolaganja";
  private _urlGetAllUIspitnomRoku: string = "http://localhost:8080/api/ispiti/uIspitnomRoku";
  private _urlIstorijaPolaganja: string = "http://localhost:8080/api/ispiti/istorijaPolaganja";
  private _urlGetUceniciPrijaviliIspit: string = "http://localhost:8080/api/ispiti/uceniciPrijaviliIspit";
  private _urlProslediOcenu: string = "http://localhost:8080/api/ispiti/posledjivanjeOcene"
  //////uceniciPrijaviliIspit/{irid}/{nid}

  constructor(private _http: HttpClient) { }

  getIspiti() : Observable<Ispit[]>{
    return this._http.get<Ispit[]>(this._urlGetAll);
  }
  getIstorijaPolaganja(uid) : Observable<Ispit[]>{
    return this._http.get<Ispit[]>(`${this._urlIstorijaPolaganja}/${+uid}`);
  }
  getAllUIspitnomRoku(irid) : Observable<Ispit[]>{
    return this._http.get<Ispit[]>(`${this._urlGetAllUIspitnomRoku}/${+irid}`);
  }
  proslediOcenu(ispit: Ispit){
    return this._http.put<any>(this._urlProslediOcenu,ispit);
  }
  addIspit(ispitData:Ispit,ispitniRokId, ucenikId,suma){
    return this._http.post<any>(`${this._urlGetAll}/${+ispitniRokId}/${+ucenikId}/${+suma}`,ispitData);
  }

  odjavaIspita(ispitData: Ispit,uid,irid){
    return this._http.put<any>(`${this._urlOdjavaIspita}/${+uid}/${+irid}`,ispitData);
  }
  addDatumPolaganjaPredmetima(ispitData: Ispit){
    return this._http.put<any>(this._urlAddDatumPolaganja,ispitData);
  }
  getUceniciPrijaviliIspit(irid,nid){
    return this._http.get<Ispit[]>(`${this._urlGetUceniciPrijaviliIspit}/${+irid}/${+nid}`);
  }
}