import { Component, OnInit } from '@angular/core';
import { PredmetService } from 'src/app/services/predmet.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {

  public predmeti = [];
  uloga: string;
  
  

  constructor(private _predmetService: PredmetService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {
    /*if(this._korisnikService.loggedInKorisnik.lozinka === 'admin'){
      console.log('jeste');
    }*/
    //console.log('korIme:' +this._korisnikService.loggedInKorisnik.korisnickoIme);
    this._predmetService.getPredmeti()
        .subscribe(data => this.predmeti = data);
    //var auth: Auth = new Auth(this._korisnikService,this._router);
    //auth.getAuth();
  }

  proveraUloge(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this._korisnikService.getToken());
    const korIme = decodedToken.sub;
    var korisnik;
    this._korisnikService.getByKorisnickoIme(korIme)
      .subscribe(data => {
        korisnik = data
        if(korisnik == null || korisnik == undefined){
          this._router.navigate(['login']);
        }
        console.log(korisnik.korisnickoIme);
        if(korisnik.uloga === 'ROLE_ADMIN'){
          this.uloga = 'ROLE_ADMIN';
        }
        if(korisnik.uloga === 'ROLE_KORISNIK'){
          //ovde sad treba nastavnik/ucenik da se uradi
        }
      }
      
        );
  }
}
