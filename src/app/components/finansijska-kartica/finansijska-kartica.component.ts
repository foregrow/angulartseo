import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { FinansijskaKarticaService } from 'src/app/services/finansijska-kartica.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finansijska-kartica',
  templateUrl: './finansijska-kartica.component.html',
  styleUrls: ['./finansijska-kartica.component.css']
})
export class FinansijskaKarticaComponent implements OnInit {

kor;

idUcenika;
kartice = [];
kartica = [];


  constructor(private _ucenikService: UcenikService, 
    private _korisnikService : KorisnikService,
    private _fkService: FinansijskaKarticaService,
    private _router: Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    var korIme = this._korisnikService.getLoggedInUserKorIme();
    
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data
      this.idUcenika = this.kor.ucenik.id;
    });
  
    this._fkService.getFinansijskeKartice()
    .subscribe(data => this.kartice = data);
  }

}

