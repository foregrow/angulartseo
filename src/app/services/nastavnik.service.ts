import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nastavnik } from '../model/nastavnik';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  private _urlGetAll: string = "http://localhost:8080/api/nastavnici";
  private _urlGetNastavniciWithoutAccount: string = "http://localhost:8080/api/nastavnici/notInKorisnik";
  constructor(private http: HttpClient) { }

  getNastavnici() : Observable<Nastavnik[]>{
    return this.http.get<Nastavnik[]>(this._urlGetAll);
  }

  getNastavniciWithoutAccount() : Observable<Nastavnik[]>{
    return this.http.get<Nastavnik[]>(this._urlGetNastavniciWithoutAccount);
  }
}
