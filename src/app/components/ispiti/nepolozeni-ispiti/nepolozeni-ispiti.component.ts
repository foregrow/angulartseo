import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { IspitService } from 'src/app/services/ispit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetService } from 'src/app/services/predmet.service';

@Component({
  selector: 'app-nepolozeni-ispiti',
  templateUrl: './nepolozeni-ispiti.component.html',
  styleUrls: ['./nepolozeni-ispiti.component.css']
})
export class NepolozeniIspitiComponent implements OnInit {

  idUcenika;
  nepolozeniPredmeti = [];
  kor;
  smerId;

  constructor(private _ispitService: IspitService,
    private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _router: Router, private _route:ActivatedRoute,
    private _predmetService: PredmetService) { }

  ngOnInit(): void {

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

}
