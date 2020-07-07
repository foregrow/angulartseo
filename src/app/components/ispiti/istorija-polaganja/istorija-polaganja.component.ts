import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-istorija-polaganja',
  templateUrl: './istorija-polaganja.component.html',
  styleUrls: ['./istorija-polaganja.component.css']
})
export class IstorijaPolaganjaComponent implements OnInit {

  istorijaPolaganja;
  idUcenika;
  kor;
  searchTerm;
  searchTerm2;
  searchTerm3;
  order;
  field;
  constructor(private _ispitService: IspitService,
    private _korService: KorisnikService) { }

  ngOnInit(): void {
    var korIme = this._korService.getLoggedInUserKorIme();
    this.getUcenikAndSmerId(korIme);
  }

  getUcenikAndSmerId(korIme){
    this._korService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
      this.getIstorijaPolaganja(this.idUcenika);
    });

  }

  getIstorijaPolaganja(uid){
    this._ispitService.getIstorijaPolaganja(uid).subscribe(
      data =>{
        this.istorijaPolaganja = data;
      });
  }

  counterNaziv = 0;

  sort(param){
    if(param === 'predmet.naziv'){
      this.field = 'predmet.naziv'; 
    }else if(param === 'predmet.profesor.ime'){
      this.field = 'predmet.profesor.ime';
    }else if(param === 'predmet.datumPolaganja'){
      this.field = 'predmet.datumPolaganja';
    }else if(param === 'bodoviTeorija'){
      this.field = 'bodoviTeorija';
    }else if(param === 'ocena'){
      this.field = 'ocena';
    }else if(param === 'ispitniRok.nazivRoka'){
      this.field = 'ispitniRok.nazivRoka';
    }
    
    if(this.counterNaziv === 0){
      //desc
      this.order = 'asc';
      this.counterNaziv = 1;
    }else if(this.counterNaziv === 1){
      //asc
      this.order = 'desc';
      this.counterNaziv = 0;
    } 
  }

}
