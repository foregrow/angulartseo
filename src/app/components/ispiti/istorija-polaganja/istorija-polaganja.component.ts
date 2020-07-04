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

}
