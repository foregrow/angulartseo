import { Ispit } from './../../../model/ispit';
import { FinansijskaKarticaService } from './../../../services/finansijska-kartica.service';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetService } from 'src/app/services/predmet.service';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { Predmet } from 'src/app/model/predmet';

@Component({
  selector: 'app-prijava-ispita',
  templateUrl: './prijava-ispita.component.html',
  styleUrls: ['./prijava-ispita.component.css']
})
export class PrijavaIspitaComponent implements OnInit {

  cekiran = false;
  finansijskaKartica;
  selectedItems = [];
  idUcenika;
  nepolozeniPredmeti = [];
  prijavljeniPredmeti = [];
  ukCena = 0;
  kor;
  smerId;
  ispitniRok;
  ispitniRokUtoku;
  constructor(private _ispitService: IspitService,
    private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _nastavnikService: NastavnikService,
    private _router: Router, private _route:ActivatedRoute,
    private _predmetService: PredmetService,
    private _ispitniRokService: IspitniRokService,
    private _finansijskaKarticaService: FinansijskaKarticaService) { }

  ngOnInit(): void {
    
    
    this.getTrenutniRok();
    var korIme = this._korisnikService.getLoggedInUserKorIme();
    this.getUcenikAndSmerId(korIme);

    this.selectedItems = new Array<string>();
  

  }

  getUcenikAndSmerId(korIme){
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
      this.smerId = this.kor.ucenik.smer.id;
      this.getPredmetiZaPrijavu(this.smerId,this.idUcenika);
      this.getPrijavljeniPredmetiZaIspit(this.idUcenika);
      this.getFinansijskaKartica(this.idUcenika);
    });

  }

  getPredmetiZaPrijavu(smerId,idUcenika){
    this._predmetService.getPredmetiZaPrijavu(smerId,idUcenika)
    .subscribe(
      data=>{
        this.nepolozeniPredmeti = data;
      });
  }
  getPrijavljeniPredmetiZaIspit(idUcenika){
    this._predmetService.getPrijavljeniPredmetiZaIspit(idUcenika)
    .subscribe(
      data=>{
        this.prijavljeniPredmeti = data;
      });
  }

  getTrenutniRok(){
    this._ispitniRokService.getTrenutniRok()
    .subscribe(
      data =>{
        this.ispitniRok = data;
        if(this.ispitniRok === null || this.ispitniRok === undefined){
          this.ispitniRokUtoku = false;
        }else{
          this.ispitniRokUtoku = true;
        }
      }
    )
  }

  getFinansijskaKartica(idUcenika){
    this._finansijskaKarticaService.getByUcenikId(idUcenika)
    .subscribe(
      data=>{
        this.finansijskaKartica = data;
      }
    )
  }
  

  izabran(e: any,predmet:Predmet){
    var predmetDate = new Date(predmet.datumPolaganja);
    const diff = predmetDate.getTime() -  new Date().getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60)); 
    //diff razlika izmedju datuma predmeta i trenutnog datuma, diffHours razlika u satima
    if(diffHours < 24){
      alert('Datum za prijavu ovog ispita je istekao! ');
      e.target.checked = false;
    }else{
      if(e.target.checked)
      { 
        this.selectedItems.push(predmet.id);
        this.ukCena += 200; 
      }
      else
      {
        this.selectedItems = this.selectedItems.filter(m=>m!=predmet.id);
  
        this.ukCena -= 200;
      }
      if(this.selectedItems.length > 0){  //Proveravam da li je je cekirano neko od polja u tabeli
        this.cekiran = true;
      }else{
        this.cekiran = false;
      }
    }
    
    
  }
  

  prijavi(){
    if(this.finansijskaKartica.suma < this.ukCena){
      alert('Nedovoljno sredstava na kartici');
    }else{
      alert('Prijava uspesno obavljena');  
      this.addIspit();
    }
  }

addIspit(){
  var ispit: Ispit = new Ispit(null,null,null,null,null,false,null,null,null,null,null,this.selectedItems,null,null)
  this._ispitService.addIspit(ispit,this.ispitniRok.id,this.idUcenika,this.ukCena)
      .subscribe(
        response =>{
          this.ukCena = 0;
          this.getUcenikAndSmerId(this._korisnikService.getLoggedInUserKorIme())
        },
        error => {
          console.log(error);
        }
      );
  

}
  


}
