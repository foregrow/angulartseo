import { Component, OnInit } from '@angular/core';
import { IspitService } from 'src/app/services/ispit.service';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Predmet } from 'src/app/model/predmet';
import { Ispit } from 'src/app/model/ispit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ispit-upis',
  templateUrl: './ispit-upis.component.html',
  styleUrls: ['./ispit-upis.component.css']
})
export class IspitUpisComponent implements OnInit {

  irok;
  addForm: FormGroup;
  predmetiArray = [];
  uceniciArray = [];
  predmetSelected = false;
  ucenikSelected = false;
  constructor(private _ispitService: IspitService,
    private fb: FormBuilder,
    private _irokService: IspitniRokService,
    private _korService: KorisnikService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getUlogovanNastavnik();
    this.addForm = this.fb.group({
      predmeti: [[null,this.fb.array(this.predmetiArray)]],
      ucenici: [[null,this.fb.array(this.uceniciArray)]],
      brojBodova: ['',[Validators.required,Validators.pattern("^[0-9]\*")]]
    }); 

    this.predmeti.valueChanges.subscribe(
      data=>{
        var predmet: Predmet = this.predmeti.value;
        this.predmetSelected = true;
        this.uceniciArray = predmet.uceniciPrijaviliIspit;
        if(this.uceniciArray.length > 0){
          this.ucenikSelected = true;
          this.ucenici.setValue(this.uceniciArray[0])
        }else{
          this.ucenikSelected = false;
        }
      });
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
        this.predmetiArray = data;
      }
    )
  }


  submit(){
    var predmet = this.predmeti.value;
    var datumPolaganja = new Date(predmet.datumPolaganja).getTime();
    const diff = datumPolaganja -  new Date().getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60)); 
    console.log(diffHours);
    if(diffHours >= 0){
      alert('Morate sacekati da se prodje datum i vreme ispita! ');
    }else{
      var ucenik = this.ucenici.value;
      var bodovi = this.brojBodova.value;
      var rok = this.irok;
      var ispit= new Ispit(null,null,null,bodovi,null,null,null,predmet,ucenik,rok,null,null,null,null,null);
      this._ispitService.proslediOcenu(ispit).subscribe(
        data =>{
         //this.getUlogovanNastavnik();
         this.uceniciArray.splice(this.uceniciArray.findIndex(uc => uc.id === ucenik.id), 1);
         if(this.uceniciArray.length <= 0)
           this.ucenikSelected = false;
         else
          this.ucenici.setValue(this.uceniciArray[0]);
         
          alert('Uspesno prosledjivanje ocene! ');
          
        },
        error =>{
          alert('Zeljenom uceniku ste vec prosledili ocenu! ');
        }
      )
    }
  }

  get ucenici() {
    return this.addForm.get('ucenici') as FormArray;
  }
  get predmeti() {
    return this.addForm.get('predmeti') as FormArray;
  }
  get brojBodova() {
    return this.addForm.get('brojBodova');
  }

}
