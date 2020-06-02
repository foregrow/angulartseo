import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ucenici',
  templateUrl: './ucenici.component.html',
  styleUrls: ['./ucenici.component.css']
})
export class UceniciComponent implements OnInit {

  public ucenici = [];

  uloga: string;
  constructor(private _ucenikService: UcenikService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {

    this._ucenikService.getUcenici()
        .subscribe(data => this.ucenici = data);
  }

}
