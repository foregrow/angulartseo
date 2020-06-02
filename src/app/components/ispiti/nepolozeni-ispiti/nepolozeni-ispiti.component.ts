import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { IspitService } from 'src/app/services/ispit.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nepolozeni-ispiti',
  templateUrl: './nepolozeni-ispiti.component.html',
  styleUrls: ['./nepolozeni-ispiti.component.css']
})
export class NepolozeniIspitiComponent implements OnInit {

  idUcenika;
  nepolozeniIspiti = [];
  kor;

  constructor(private _ispitService: IspitService,
    private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _router: Router, private _route:ActivatedRoute) { }

  ngOnInit(): void {

    var korIme = this._korisnikService.getLoggedInUserKorIme();
    
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
    });

    this._ispitService.getIspiti()
    .subscribe(
      data => {
       this.nepolozeniIspiti = data
      }
    )
  }

}
