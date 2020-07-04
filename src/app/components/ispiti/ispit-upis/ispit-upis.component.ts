import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-ispit-upis',
  templateUrl: './ispit-upis.component.html',
  styleUrls: ['./ispit-upis.component.css']
})
export class IspitUpisComponent implements OnInit {

  predmeti;
  irok;
  constructor(private _ispitService: IspitService,
    private _irokService: IspitniRokService,
    private _korService: KorisnikService) { }

  ngOnInit(): void {
    this.getUlogovanNastavnik();
  }
  getUlogovanNastavnik(){
    this._korService.getByKorisnickoIme(this._korService.getLoggedInUserKorIme()).subscribe(
      data =>{
        var kor = data;
        this.getTrenutniRok(kor);
      }
    )
  }

  getTrenutniRok(kor){
    this._irokService.getTrenutniRok().subscribe(
      data =>{
        this.irok = data;
        this.getUceniciPrijaviliIspit(this.irok.id,kor.nastavnik.id);
      }
    )
  }
  getUceniciPrijaviliIspit(irid,nid){
    this._ispitService.getUceniciPrijaviliIspit(irid,nid).subscribe(
      data =>{
        this.predmeti = data;
        console.log(this.predmeti);
      }
    )
  }

}
