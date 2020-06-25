import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IspitniRokService {

  private _urlGetTrenutniRok = "http://localhost:8080/api/ispitniRok/trenutniRok"
  constructor(private _http:HttpClient) { }

  getTrenutniRok(){
    return this._http.get(`${this._urlGetTrenutniRok}`);
  }
}
