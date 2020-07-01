import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { KorisnikService } from './services/korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _korService: KorisnikService, 
    private _router: Router) {}

    canActivate(next:ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if(this._korService.loggedIn()){
        let roles = next.data['roles'] as Array<string>;
        if(roles){
          var match = this._korService.isAuthorized(roles);
          if(match) return true;
          else{
            var roleUlogovanog = this._korService.getRole();
            if(roleUlogovanog === "ROLE_ADMIN"){
              this._router.navigate(['admin']);
              return false;
            }else if(roleUlogovanog === "ROLE_UCENIK"){
              this._router.navigate(['ucenik']);
              return false;
            }else if(roleUlogovanog === "ROLE_NASTAVNIK" || roleUlogovanog === "ROLE_ASISTENT" || roleUlogovanog === "ROLE_DEMONSTRATOR"){
              this._router.navigate(['nastavnik']);
              return false;
            }
            
            return false;
          }
        }else
          return true;
      }
      this._router.navigate(['login']);
      return false;
    }
  
}
