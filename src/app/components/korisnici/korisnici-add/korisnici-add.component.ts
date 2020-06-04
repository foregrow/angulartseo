import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Ucenik } from 'src/app/model/ucenik';
import { Korisnik } from 'src/app/model/korisnik';
import { Nastavnik } from 'src/app/model/nastavnik';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korisnici-add',
  templateUrl: './korisnici-add.component.html',
  styleUrls: ['./korisnici-add.component.css']
})
export class KorisniciAddComponent implements OnInit {

  
  addForm: FormGroup;

  korImena: string[] = [];
  korisniciObj = [];
  ucenici: Ucenik[] = []; //lista svih vracenih ucenika sa backenda
  uceniciStr: string[] = []; //ucenikovi fieldovi concatovani u string

  nastavnici: Nastavnik[] = []; 
  nastavniciStr: string[] = []; 

  get korisnickoIme() {
    return this.addForm.get('korisnickoIme');
  }

  get lozinka() {
    return this.addForm.get('lozinka');
  }

  get uloge() {
    return this.addForm.get('uloge')  as FormArray;
  }

  get ucenikPodaci() {
    return this.addForm.get('ucenikPodaci')  as FormArray;
  }

  get nastavnikPodaci() {
    return this.addForm.get('nastavnikPodaci')  as FormArray;
  }
  
  ulogeArray = ['ADMIN','UCENIK','NASTAVNIK'];

  constructor(private fb: FormBuilder,
    public _korisnikService: KorisnikService,
    public _ucenikService: UcenikService,
    public _nastavnikService: NastavnikService,
    private _router: Router) { 
      
    }

    ngOnInit(): void {
      this.addForm = this.fb.group({
        korisnickoIme: ['',Validators.required],
        lozinka: ['',Validators.required],
        uloge: [this.fb.array(this.ulogeArray)],
        ucenikPodaci: [this.fb.array(this.uceniciStr)],
        nastavnikPodaci: [this.fb.array(this.nastavniciStr)]
      });
      
      this.getUceniciWithoutAccount();
      this.getNastavniciWithoutAccount();
      this.getAllKorisnickaImena();

      //na promenu vrednosti u input polju poziva se funkcija koja proverava da li je korisnicko ime zauzeto ili nije
      this.korisnickoIme.valueChanges.subscribe(data =>
        {
          this.existingKorIme();
        }
      )
      
    }

    getUceniciWithoutAccount(){
      this._ucenikService.getUceniciWithoutAccount().subscribe(
        data => {
          this.ucenici = data
          if(this.ucenici.length > 0){
            for (var i = 0; i < this.ucenici.length; i++) {
              let concated = `Ime:${this.ucenici[i].ime},Prezime:${this.ucenici[i].prezime},Index:${this.ucenici[i].index},God upisa:${this.ucenici[i].godinaUpisa},God studija:${this.ucenici[i].godinaStudija}`;
              this.uceniciStr.push(concated);
            }
          }
          
        }
      );
    }

    getNastavniciWithoutAccount(){
      this._nastavnikService.getNastavniciWithoutAccount().subscribe(
        data => {
          this.nastavnici = data
          if(this.nastavnici.length > 0){
            for (var i = 0; i < this.nastavnici.length; i++) {
              let concated = `Ime:${this.nastavnici[i].ime},Prezime:${this.nastavnici[i].prezime},Email:${this.nastavnici[i].email},Uloga:${this.nastavnici[i].uloga}`;
              this.nastavniciStr.push(concated);
            }
          }
          
        }
      );
    }

    getAllKorisnickaImena(){
      this._korisnikService.getAllKorisnici()
        .subscribe(
          data => {
            this.korisniciObj = data
            for (var i = 0; i < this.korisniciObj.length; i++) {
              this.korImena.push(this.korisniciObj[i].korisnickoIme);
              
            }  
          });
    }

  korImeExists = false;
  korIzabran = false;
  ucenikIzabran = false;
  nastavnikIzabran = false;


  ucenikObjekatIzabran = false;
  nastavnikObjekatIzabran = false;

  ucenikChosen(){
    if(this.uceniciStr.includes(this.ucenikPodaci.value)){
      this.ucenikObjekatIzabran = true;
    }else{
      this.ucenikObjekatIzabran = false;
    }
  }
  nastavnikChosen(){
    if(this.nastavniciStr.includes(this.nastavnikPodaci.value)){
      this.nastavnikObjekatIzabran = true;
    }else{
      this.nastavnikObjekatIzabran = false;
    }
  }
  chosenKorisnik(){
    if(this.uloge.value==="ADMIN"){
      this.korIzabran = true;
      this.ucenikIzabran = false;
      this.nastavnikIzabran = false;
    }else if(this.uloge.value==="UCENIK"){
      this.korIzabran = true;
      this.ucenikIzabran = true;
      this.nastavnikIzabran = false;
    }else if(this.uloge.value==="NASTAVNIK"){
      this.korIzabran = true;
      this.ucenikIzabran = false;
      this.nastavnikIzabran = true;
    }else{
      this.korIzabran = false;
    }
  }
 

  existingKorIme(){
    if(this.korImena.includes(this.korisnickoIme.value))
      this.korImeExists = true;
    else
    this.korImeExists = false;
  }
  addKorisnika(){
  
    var korIme =this.korisnickoIme.value;
    var lozinka =this.lozinka.value;
    var uloga =this.uloge.value;
    var index;
    var email;
    if(uloga === 'UCENIK'){
      uloga = 'ROLE_KORISNIK';
      var ucenik =this.ucenikPodaci.value;
      index = ucenik.split(',')[2].substring(6);
      email = 'null';
    }else if(uloga === 'NASTAVNIK'){
      uloga = 'ROLE_KORISNIK';
      var nastavnik = this.nastavnikPodaci.value;
      email = nastavnik.split(',')[2].substring(6);
      index = 'null';
    }else{
      uloga = 'ROLE_ADMIN'
      email = 'null';
      index = 'null';
    }
    var kor: Korisnik = new Korisnik(korIme,lozinka,
      uloga,null,null);

    this._korisnikService.addKorisnik(kor,index,email)
    .subscribe(
      data =>{
        this._router.navigate(['korisnici']);
      }
    );
    
  }

}
