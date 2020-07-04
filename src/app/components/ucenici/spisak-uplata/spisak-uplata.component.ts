import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-spisak-uplata',
  templateUrl: './spisak-uplata.component.html',
  styleUrls: ['./spisak-uplata.component.css']
})
export class SpisakUplataComponent implements OnInit {

  spisakUplata;
  kor;
  idUcenika;
  constructor(private _ucenikService: UcenikService,
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
      this.getSpisakUplata(this.idUcenika);
    });

  }

  getSpisakUplata(uid){
    this._ucenikService.getSpisakUplata(uid).subscribe(
      data =>{
        this.spisakUplata = data;
      });
  }

}
