import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-ucenik',
  templateUrl: './profil-ucenik.component.html',
  styleUrls: ['./profil-ucenik.component.css']
})
export class ProfilUcenikComponent implements OnInit{

  korisnickoImeParam;
  korisnik;
  
  constructor(private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _router: Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {

  this.korisnickoImeParam = this._korisnikService.getLoggedInUserKorIme();
  
  this._ucenikService.getByKorisnickoIme(this.korisnickoImeParam)
  .subscribe(
    data => {
     this.korisnik = data
    }
  )
  }




}
