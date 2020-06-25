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
  private _urlGetNastavniciWhereSefKatedreNull: string = "http://localhost:8080/api/nastavnici/sefKatedreNull";
  constructor(private http: HttpClient) { }

  getNastavnici() : Observable<Nastavnik[]>{
    return this.http.get<Nastavnik[]>(this._urlGetAll);
  }

  getById(id){
    var numbid = +id;
    return this.http.get(`${this._urlGetAll}/${numbid}`);
  }


  getNastavniciWithoutAccount() : Observable<Nastavnik[]>{
    return this.http.get<Nastavnik[]>(this._urlGetNastavniciWithoutAccount);
  }

  getNastavniciWhereSefKatedreNull() : Observable<Nastavnik[]>{
    return this.http.get<Nastavnik[]>(this._urlGetNastavniciWhereSefKatedreNull);
  }

  addNastavnik(data:Nastavnik){
    return this.http.post<any>(this._urlGetAll,data);
  }

  updateNastavnik(data:Nastavnik,predmeti){
    return this.http.put<any>(`${this._urlGetAll}/${predmeti}`,data);
  }

  deleteNastavnik(id): Observable<any>{
    var numbid = +id;
    return this.http.delete(`${this._urlGetAll}/${numbid}`);
  }
}
