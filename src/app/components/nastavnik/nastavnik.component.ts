import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-nastavnik',
  templateUrl: './nastavnik.component.html',
  styleUrls: ['./nastavnik.component.css']
})
export class NastavnikComponent implements OnInit {

  constructor(private _korisnikService: KorisnikService,private _router: Router) { }

  ngOnInit(): void {
    //console.log('korIme:' +this._korisnikService.loggedInKorisnik.korisnickoIme);
  }

}
