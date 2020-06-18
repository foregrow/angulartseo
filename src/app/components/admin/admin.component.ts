import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  constructor(public korisnikService: KorisnikService,private _router: Router) { }

  ngOnInit(): void {
    //console.log('korIme:' +this._korisnikService.loggedInKorisnik.korisnickoIme);
  }

  
  
  prikazKorisnika(){
    this._router.navigate(['/korisnici']);
  }
  prikazNastavnika(){
    this._router.navigate(['/nastavnici']);
  }
  prikazUcenika(){
    this._router.navigate(['/ucenici']);
  }
  prikazSmerova(){
    this._router.navigate(['/smerovi']);
  }
  prikazPredmeta(){
    this._router.navigate(['/predmeti']);
  }
  prikazIspita(){
    this._router.navigate(['/ispiti']);
  }


}
