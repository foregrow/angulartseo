import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Smer } from '../model/smer';
import { IspitniRok } from '../model/ispitnirok';

@Injectable({
  providedIn: 'root'
})
export class IspitniRokService {

  private _urlGetAll = "http://localhost:8080/api/ispitniRok";
  private _urlGetTrenutniRok = "http://localhost:8080/api/ispitniRok/trenutniRok";
  constructor(private _http:HttpClient) { }

  getAll() : Observable<IspitniRok[]>{
    return this._http.get<IspitniRok[]>(this._urlGetAll);
  }

  getTrenutniRok(){
    return this._http.get(`${this._urlGetTrenutniRok}`);
  }

  getById(id){
    return this._http.get(`${this._urlGetAll}/${+id}`);
  }

  update(data: IspitniRok){
    return this._http.put<any>(this._urlGetAll,data);
  }

  
}
