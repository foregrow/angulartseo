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
  cekiranOdjava = false;
  finansijskaKartica;
  selectedItems = [];
  selectedItemsOdjava = [];
  idUcenika;
  nepolozeniPredmeti = [];
  prijavljeniPredmeti = [];
  odjavljeniPredmeti = [];
  ukCena = 0;
  ukCenaOdjava = 0;
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
    this.selectedItems = new Array<string>();
  

  }

  getUcenikAndSmerId(korIme){
    this._korisnikService.getByKorisnickoIme(korIme)
    .subscribe(data => {
      this.kor = data;
      this.idUcenika = this.kor.ucenik.id;
      this.smerId = this.kor.ucenik.smer.id;
      this.getPredmetiZaPrijavu(this.smerId,this.idUcenika,this.ispitniRok.id);
      this.getPrijavljeniPredmetiZaIspit(this.idUcenika,this.ispitniRok.id);
      this.getFinansijskaKartica(this.idUcenika);
    });

  }

  getPredmetiZaPrijavu(smerId,idUcenika,iRok){
    this._predmetService.getPredmetiZaPrijavu(smerId,idUcenika,iRok)
    .subscribe(
      data=>{
        this.nepolozeniPredmeti = data;
      });
  }
  getPrijavljeniPredmetiZaIspit(idUcenika,iRok){
    this._predmetService.getPrijavljeniPredmetiZaIspit(idUcenika,iRok)
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
          var korIme = this._korisnikService.getLoggedInUserKorIme();
          this.getUcenikAndSmerId(korIme);
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

  izabranOdjava(e: any,predmet:Predmet){
    var predmetDate = new Date(predmet.datumPolaganja);
    const diff = predmetDate.getTime() -  new Date().getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60)); 
    //diff razlika izmedju datuma predmeta i trenutnog datuma, diffHours razlika u satima
    if(diffHours < 24){
      alert('Ispit se moze odjaviti najkasnije 1 dan pred isti! ');
      e.target.checked = false;
    }else{
      if(e.target.checked)
      { 
        this.selectedItemsOdjava.push(predmet.id);
    
      }
      else
      {
        this.selectedItemsOdjava = this.selectedItemsOdjava.filter(m=>m!=predmet.id);
      }
      if(this.selectedItemsOdjava.length > 0){  //Proveravam da li je je cekirano neko od polja u tabeli
        this.cekiranOdjava = true;
      }else{
        this.cekiranOdjava = false;
      }
    }
    
    
  }

  odjavi(){
    var ispit: Ispit = new Ispit(null,null,null,null,null,false,null,null,null,null,null,this.selectedItemsOdjava,null,null,null)
    this._ispitService.odjavaIspita(ispit,this.idUcenika,this.ispitniRok.id)
        .subscribe(
          response => { 
            this.selectedItemsOdjava = [];
            this.cekiranOdjava = false;
            this.getTrenutniRok();
          },
          error => {
            console.log(error);
          }
        );
  }

addIspit(){
  var ispit: Ispit = new Ispit(null,null,null,null,null,false,null,null,null,null,null,this.selectedItems,null,null,null)
  this._ispitService.addIspit(ispit,this.ispitniRok.id,this.idUcenika,this.ukCena)
      .subscribe(
        response =>{
          this.ukCena = 0;
          this.selectedItems = [];
          this.cekiran = false;
          this.getTrenutniRok();
          
        },
        error => {
          console.log(error);
        }
      );
  

}
  


}
