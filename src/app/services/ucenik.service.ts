import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ucenik } from '../model/ucenik';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  private _urlGetAll: string = "http://localhost:8080/api/ucenici";
  private _urlGetUceniciWithoutAccount: string = "http://localhost:8080/api/ucenici/notInKorisnik";
  private _urlGetByKorisnickoIme = 'http://localhost:8080/api/korisnici/korIme';

  constructor(private http: HttpClient) { }

  getUcenici() : Observable<Ucenik[]>{
    return this.http.get<Ucenik[]>(this._urlGetAll);
  }

  getUceniciWithoutAccount() : Observable<Ucenik[]>{
    return this.http.get<Ucenik[]>(this._urlGetUceniciWithoutAccount);
  }
  getByKorisnickoIme(korisnickoIme){
    return this.http.get(`${this._urlGetByKorisnickoIme}/${korisnickoIme}`);
  }
  deleteUcenik(id): Observable<any>{
    var numbid = +id;
    return this.http.delete(`${this._urlGetAll}/${numbid}`);
  }
}
