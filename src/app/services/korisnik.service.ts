import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { Korisnik } from '../model/korisnik';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  public loggedInKorisnik;
  
  _urlSubmitLogin = 'http://localhost:8080/authenticate'
  _urlGetAll = 'http://localhost:8080/api/korisnici'
  _urlGetByKorisnickoIme = 'http://localhost:8080/api/korisnici/korIme'
  _urlProveraPristupaUcenika = 'http://localhost:8080/api/korisnici/proveraPristupaUcenika'
  _urlProveraPristupaNastavnika = 'http://localhost:8080/api/korisnici/proveraPristupaNastavnika'
  
  constructor(private _http: HttpClient,
              private _router: Router
              ) { }

  proveraPristupaUcenika(idTrazenog,korImeUlogovanog){
    return this._http.get(`${this._urlProveraPristupaUcenika}/${+idTrazenog}/${korImeUlogovanog}`);
  }
  proveraPristupaNastavnika(idTrazenog,korImeUlogovanog){
    return this._http.get(`${this._urlProveraPristupaNastavnika}/${+idTrazenog}/${korImeUlogovanog}`);
  }

  getAllKorisnici(): Observable<any>{
    return this._http.get<Korisnik[]>(this._urlGetAll);
  }
  getByKorisnickoIme(korisnickoIme){
    return this._http.get(`${this._urlGetByKorisnickoIme}/${korisnickoIme}`);
  }

  getById(id){
    var numbid = +id;
    return this._http.get(`${this._urlGetAll}/${numbid}`);
  }

  login(userData){
    console.log(userData);
    return this._http.post<any>(this._urlSubmitLogin, userData);
  }

  addKorisnik(korData:Korisnik,uceIndex, nasEmail){
    return this._http.post<any>(`${this._urlGetAll}/${uceIndex}/${nasEmail}`,korData);
  }

  deleteKorisnik(id): Observable<any>{
    var numbid = +id;
    return this._http.delete(`${this._urlGetAll}/${numbid}`);
  }

  //vraca true ili false
  loggedIn(){
    if(!this.getRole() || !this.getToken()){
      return false;
    }
    return true;
  }



  getLoggedInUserKorIme(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    const kor = decodedToken.sub;
    return kor;
  }

  getToken(){
    return localStorage.getItem('jwt');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  logout(){
    //LoginComponent.korIme = null;
    localStorage.removeItem("jwt");
    localStorage.removeItem('role');
    this._router.navigate(['login'])
  }

  getRedirectedFromLogin(role){
    if(role == 'GRESKA'){
      this._router.navigate(['login']);
    }else{
      if(role == 'ROLE_ADMIN'){
        this._router.navigate(['admin']);
      }else if(role == 'ROLE_UCENIK'){
        this._router.navigate(['ucenik']);
      }else if(role == 'ROLE_NASTAVNIK'){
        this._router.navigate(['nastavnik']);
      }
    }
    
  }

  isAuthorized(roles): boolean {
    var isMatch = false;
    
    var role = localStorage.getItem('role');
    roles.forEach(element => {
      if(element === role){
        isMatch = true;
        return false;
      }
    });
    
    return isMatch;
  }


}
