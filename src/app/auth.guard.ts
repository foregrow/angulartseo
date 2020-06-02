import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KorisnikService } from './services/korisnik.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _korService: KorisnikService,
              private _router: Router){}
              
  canActivate(): boolean{
    if(this._korService.loggedIn()){

      return true
    }else{
      //console.log('false')
      this._router.navigate(['login']);
      return false
    }
  }
  
}
