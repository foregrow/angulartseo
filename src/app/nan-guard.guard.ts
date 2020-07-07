import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KorisnikService } from './services/korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class NanGuardGuard implements CanActivate {
  constructor(){}
    
canActivate(): boolean{
  return true;
}
  
}
