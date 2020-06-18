import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinansijskaKartica } from '../model/finansijskakartica';

@Injectable({
  providedIn: 'root'
})
export class FinansijskaKarticaService {

  private _urlGetAll = "http://localhost:8080/api/finansijskaKartica";
  private _urlByUcenikId = "http://localhost:8080/api/finansijskaKartica/ucenik";

  constructor(private http: HttpClient) { }

  getFinansijskeKartice() : Observable<FinansijskaKartica[]>{
    return this.http.get<FinansijskaKartica[]>(this._urlGetAll);
  }

  getByUcenikId(ucenikId){
    var numbid = +ucenikId;
    return this.http.get(`${this._urlByUcenikId}/${numbid}`);
  }
}