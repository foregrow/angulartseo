import { Component, OnInit } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nastavnici',
  templateUrl: './nastavnici.component.html',
  styleUrls: ['./nastavnici.component.css']
})
export class NastavniciComponent implements OnInit {

  public nastavnici = [];
  
  constructor(private _nastavnikService: NastavnikService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {
    this._nastavnikService.getNastavnici()
        .subscribe(data => this.nastavnici = data);
      
  }

  navigateToAddNastavnik(){
    this._router.navigate(['nastavnici-add'])
  }

  detaljiNastavnika(nas){
    this._router.navigate(['nastavnici-detail',nas.id])
  }

  deleteNastavnik(id){
    this._nastavnikService.deleteNastavnik(id)
    .subscribe(
      data => this.nastavnici = data
    );
  }

  
  
}
