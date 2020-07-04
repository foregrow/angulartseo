import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-polozeni-ispiti',
  templateUrl: './polozeni-ispiti.component.html',
  styleUrls: ['./polozeni-ispiti.component.css']
})
export class PolozeniIspitiComponent implements OnInit {

  idUcenika;
  ucenik;
  polozeniIspiti = [];
  kor;
  constructor(private _ispitService: IspitService,
    private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _router: Router, 
    private _route:ActivatedRoute) { }

  ngOnInit(): void {

    var korIme = this._korisnikService.getLoggedInUserKorIme();
    
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
      this.ucenik = this.kor.ucenik;
    });

    this._ispitService.getIspiti()
    .subscribe(
      data => {
       this.polozeniIspiti = data
      }
    )
  }
}
