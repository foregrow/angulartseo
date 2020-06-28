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

@Component({
  selector: 'app-prijava-ispita',
  templateUrl: './prijava-ispita.component.html',
  styleUrls: ['./prijava-ispita.component.css']
})
export class PrijavaIspitaComponent implements OnInit {

  cekiran = false;
  finansijskaKartica;
  selectedItems: string[];
  idUcenika;
  nepolozeniPredmeti = [];
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
      this.getNepolozeniPredmeti(this.smerId,this.idUcenika);
      this.getFinansijskaKartica(this.idUcenika);
    });

  }

  getNepolozeniPredmeti(smerId,idUcenika){
    this._predmetService.getNepolozeniPredmeti(smerId,idUcenika)
    .subscribe(
      data=>{
        this.nepolozeniPredmeti = data;
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
  

  izabran(e: any,predmetId:string){
    if(e.target.checked)
    { 
      this.selectedItems.push(predmetId);
      this.ukCena += 200;
    
      
    }
    else
    {
      this.selectedItems = this.selectedItems.filter(m=>m!=predmetId);

      this.ukCena -= 200;
    }
    console.log(this.selectedItems);
    if(this.selectedItems.length > 0){  //Proveravam da li je je cekirano neko od polja u tabeli
      this.cekiran = true;
    }else{
      this.cekiran = false;
    }
  }
  

  prijavi(){
    if(this.finansijskaKartica.suma < this.ukCena){
      alert('Nedovoljno sredstava na kartici');
    }else{
      alert('Prijava uspesno obavljena');
      var sumaNaKartici = this.finansijskaKartica.suma - this.ukCena;
      console.log('Suma na kartici: ' + sumaNaKartici); //Moram update sumu na finKartici
      
      this.addIspit();
    }
  }

addIspit(){
  for (let item of this.selectedItems) {
      
      var ispit: Ispit = new Ispit(null,null,null,null,null,false,null,null,null,null,null)
      this._ispitService.addIspit(ispit,this.ispitniRok.id,this.selectedItems[item],this.idUcenika)
      .subscribe(
        data =>{
          this._router.navigate(['ucenik']);
        }
      );

  }

}
  


}
