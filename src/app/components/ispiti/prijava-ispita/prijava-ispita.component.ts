import { NastavnikService } from 'src/app/services/nastavnik.service';
import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetService } from 'src/app/services/predmet.service';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';

@Component({
  selector: 'app-prijava-ispita',
  templateUrl: './prijava-ispita.component.html',
  styleUrls: ['./prijava-ispita.component.css']
})
export class PrijavaIspitaComponent implements OnInit {

  idUcenika;
  nepolozeniPredmeti = [];
  ukCena = 0;
  kor;
  smerId;
  ispitniRok;
  ispitniRokUtoku;
  constructor(private _ispitService: IspitService,
    private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _nastavnikService: NastavnikService,
    private _router: Router, private _route:ActivatedRoute,
    private _predmetService: PredmetService,
    private _ispitniRokService: IspitniRokService) { }

  ngOnInit(): void {
    
    this.getTrenutniRok();
    var korIme = this._korisnikService.getLoggedInUserKorIme();
    this.getUcenikAndSmerId(korIme);

  }

  getUcenikAndSmerId(korIme){
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
      this.smerId = this.kor.ucenik.smer.id;
      this.getNepolozeniPredmeti(this.smerId,this.idUcenika);
    });
  }

  getNepolozeniPredmeti(smerId,idUcenika){
    this._predmetService.getNepolozeniPredmeti(smerId,idUcenika)
    .subscribe(
      data=>{
        this.nepolozeniPredmeti = data;
      });
  }

  getTrenutniRok(){
    this._ispitniRokService.getTrenutniRok()
    .subscribe(
      data =>{
        this.ispitniRok = data;
        if(this.ispitniRok === null || this.ispitniRok === undefined){
          this.ispitniRokUtoku = false;
        }else{
          this.ispitniRokUtoku = true;
        }
      }
    )
  }


}
