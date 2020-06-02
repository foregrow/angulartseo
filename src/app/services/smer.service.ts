import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Smer } from '../model/smer';

@Injectable({
  providedIn: 'root'
})
export class SmerService {

  private _urlGetAll: string = "http://localhost:8080/api/smerovi";
  
  constructor(private http: HttpClient) { }

  getSmerovi() : Observable<Smer[]>{
    return this.http.get<Smer[]>(this._urlGetAll);
  }
}
