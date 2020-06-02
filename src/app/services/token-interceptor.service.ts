import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http'
import { KorisnikService } from './korisnik.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector: Injector) { }

  intercept(req, next){
    let korService = this.injector.get(KorisnikService);
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${korService.getToken()}`
      }
    })
    return next.handle(tokenizedRequest);
  }
}
