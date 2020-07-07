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
  searchTerm: string;
  searchTerm2: string;
  order:string;
  field:string;
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

  counterKorIme = 0;

  sort(param){
    if(param === 'ime'){
      this.field = 'ime'; 
    }else if(param === 'prezime'){
      this.field = 'prezime'; 
    }else if(param === 'email'){
      this.field = 'email'; 
    }else if(param === 'uloga'){
      this.field = 'uloga'; 
    }
    
    if(this.counterKorIme === 0){
      //desc
      this.order = 'asc';
      this.counterKorIme = 1;
    }else if(this.counterKorIme === 1){
      //asc
      this.order = 'desc';
      this.counterKorIme = 0;
    } 
  }
  
}
