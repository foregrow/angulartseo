import { UcenikService } from 'src/app/services/ucenik.service';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ucenik',
  templateUrl: './ucenik.component.html',
  styleUrls: ['./ucenik.component.css']
})
export class UcenikComponent implements OnInit {

  korisnickoImeParam;
  korisnik;
  index;

  constructor(public korisnikService: KorisnikService,private _ucenikService: UcenikService,private _router: Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {

    this._route.queryParams.subscribe(params => {
      this.korisnickoImeParam = this.korisnikService.getLoggedInUserKorIme();
  
      this._ucenikService.getByKorisnickoIme(this.korisnickoImeParam)
      .subscribe(
        data => {
         this.korisnik = data
         this.index = this.korisnik.ucenik.index
        }
      )
    });

    
  }

  prikazProfilaUcenika(){
     this._router.navigate(['profil-ucenik'])
  }

  finansijskaKartica(){
    this._router.navigate(['finansijska-kartica'])
  }

  polozeniIspiti(){
    this._router.navigate(['polozeni-ispiti'])
  }

  nepolozeniIspiti(){
    this._router.navigate(['nepolozeni-ispiti'])
  }
  prijavaIspita(){
    this._router.navigate(['prijava-ispita'])
  }
  istorijaPolaganja(){
    this._router.navigate(['istorija-polaganja'])
  }
  spisakUplata(){
    this._router.navigate(['spisak-uplata'])
  }

}