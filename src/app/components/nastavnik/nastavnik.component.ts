import { PredmetService } from './../../services/predmet.service';
import { FormBuilder } from '@angular/forms';
import { NastavnikService } from './../../services/nastavnik.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  id;
  korisnik;
  korisnickoImeParam;
  nastavnik;
  public nastavnici = [];

  constructor(private _route: ActivatedRoute,
    public korisnikService:KorisnikService,
    private router: Router,
    private _nastavnikService: NastavnikService, private fb: FormBuilder, private _predmetService: PredmetService
    ) { }

  ngOnInit(): void {

    this.korisnickoImeParam = this.korisnikService.getLoggedInUserKorIme();

    this.korisnikService.getByKorisnickoIme(this.korisnickoImeParam)
    .subscribe(
      data => {
       this.korisnik = data;
       this.id = this.korisnik.nastavnik.id
      }
    )

  }

  rokovi(){
    this.router.navigate(['ispitniRokovi'])
  }
  detaljiNastavnika(){
    this.router.navigate(['nastavnici-detail',this.id])
  }
  upisOcena(){
    this.router.navigate(['ispit-upis'])
  }
}
