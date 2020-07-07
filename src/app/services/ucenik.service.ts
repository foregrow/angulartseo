import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ucenik } from '../model/ucenik';
import { Observable } from 'rxjs';
import { FinansijskaKartica } from '../model/finansijskakartica';
import { Dokument } from '../model/dokument';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  private _urlGetAll: string = "http://localhost:8080/api/ucenici";
  private _urlGetUceniciWithoutAccount: string = "http://localhost:8080/api/ucenici/notInKorisnik";
  private _urlGetByKorisnickoIme = 'http://localhost:8080/api/korisnici/korIme';
  private _urlSpisakUplata: string = "http://localhost:8080/api/ucenici/spisakUplata";
  private _urlUploadDokumenti: string = "http://localhost:8080/api/ucenici/uploadDokumenti";
  private _urlDownloadDokumenti: string = "http://localhost:8080/api/ucenici/downloadFile";
  private _urlDeleteDokument: string = "http://localhost:8080/api/ucenici/dokument"
  
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
  getSpisakUplata(uid){
    return this.http.get(`${this._urlSpisakUplata}/${+uid}`);
  }
  //finansijska kartica sadrzi ucenika
  addUcenik(fkdto:FinansijskaKartica){
    return this.http.post<any>(this._urlGetAll,fkdto);
  }
  download(id){
    return this.http.get(`${this._urlDownloadDokumenti}/${+id}`,{observe: 'response', responseType: 'blob' as 'json'});
  }
  upload(data){
    return this.http.post<Ucenik>(this._urlUploadDokumenti, data, { observe: 'response' });
  }
  updateUcenik(fkdto:FinansijskaKartica){
    return this.http.put<any>(`${this._urlGetAll}`,fkdto);
  }
  deleteUcenik(id): Observable<any>{
    var numbid = +id;
    return this.http.delete(`${this._urlGetAll}/${numbid}`);
  }

  deleteDokument(id){
    var did = +id;
    return this.http.delete(`${this._urlDeleteDokument}/${did}`);
  }
  downloadFile(id,ucenik: Ucenik){
    this.http.get(`${this._urlDownloadDokumenti}/${+id}`,{
      observe: 'response',responseType: 'arraybuffer'} 
     ).subscribe(resp => {
      this.downloadF(resp,ucenik);
     });

  }

  downloadF(data: any,ucenik: Ucenik) {
      let file = new File([data],"");
      FileSaver.saveAs(file,ucenik.index);
  }
}
