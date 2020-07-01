import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kolokvijum } from '../model/kolokvijum';

@Injectable({
  providedIn: 'root'
})
export class KolokvijumService {


  private _urlGetAll = "http://localhost:8080/api/kolokvijumi";

  constructor(private _http:HttpClient) { }

  addKolokvijum(klk:Kolokvijum){
    return this._http.post<any>(this._urlGetAll,klk);
  }
}
