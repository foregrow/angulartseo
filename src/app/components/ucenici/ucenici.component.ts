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
  searchTerm;
  searchTerm2;
  order:string;
  field:string;
  constructor(private _ucenikService: UcenikService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {

    this._ucenikService.getUcenici()
        .subscribe(data => this.ucenici = data);
  }

  navigateToAddUcenik(){
    this._router.navigate(['ucenici-detail','add'])
  }

  detaljiUcenika(ucenik){
    this._router.navigate(['ucenici-detail',ucenik.id])
  }

  deleteUcenik(id){
    this._ucenikService.deleteUcenik(id)
    .subscribe(
      data => this.ucenici = data
    );
  }

  counter = 0;
  sort(param){
    if(param === 'ime'){
      this.field = 'ime'; 
    }else if(param === 'prezime'){
      this.field = 'prezime'; 
    }else if(param === 'index'){
      this.field = 'index'; 
    }else if(param === 'godinaUpisa'){
      this.field = 'godinaUpisa'; 
    }else if(param === 'godinaStudija'){
      this.field = 'godinaStudija'; 
    }else if(param === 'smer.naziv'){
      this.field = 'smer.naziv'; 
    }

    if(this.counter === 0){
      //desc
      this.order = 'asc';
      this.counter = 1;
    }else if(this.counter === 1){
      //asc
      this.order = 'desc';
      this.counter = 0;
    }
    
  }
}
