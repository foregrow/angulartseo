import { Ispit } from './../model/ispit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IspitService {

  private _urlGetAll: string = "http://localhost:8080/api/ispiti";

  constructor(private http: HttpClient) { }

  getIspiti() : Observable<Ispit[]>{
    return this.http.get<Ispit[]>(this._urlGetAll);
  }

}