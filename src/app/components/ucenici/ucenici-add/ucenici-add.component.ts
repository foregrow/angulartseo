import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SmerService } from 'src/app/services/smer.service';
import { Ucenik } from 'src/app/model/ucenik';
import { Smer } from 'src/app/model/smer';
import { FinansijskaKartica } from 'src/app/model/finansijskakartica';

@Component({
  selector: 'app-ucenici-add',
  templateUrl: './ucenici-add.component.html',
  styleUrls: ['./ucenici-add.component.css']
})
export class UceniciAddComponent implements OnInit {

  addForm: FormGroup;
  polArray = ['ZENSKI','MUSKI']
  finansiranjeArray = ['BUDZET','SAMOFINANSIRANJE']
  smerArray = [];
  polChosen = false;
  finanChosen = false;
  smerChosen = false;
  constructor(private fb: FormBuilder,private _ucenikService: UcenikService,
    private _router: Router,private _smerService:SmerService) { }

    //[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}
  ngOnInit(): void {
    this.addForm = this.fb.group({
      ime: ['',Validators.required],
      prezime: ['',Validators.required],
      godinaUpisa: ['',[Validators.required,Validators.pattern("^[0-9]\{4}")]],
      godinaStudija: ['',[Validators.required,Validators.pattern("^[1-4]\{1}")]],
      drzavaRodjenja: ['',Validators.required],
      mestoRodjenja: ['',Validators.required],
      adresa: ['',Validators.required],
      datumRodjenja: ['',[Validators.required,Validators.pattern("^[0-3][0-9]\.[0-1][0-9]\.[0-9]{4}.")]],
      pol: [this.fb.array(this.polArray)],
      email: ['',[Validators.required,Validators.email]],
      smer: [this.fb.array(this.smerArray)],
      nacinFinansiranja: [this.fb.array(this.finansiranjeArray)],
      ziroRacun: ['',Validators.required],
      pozivNaBroj: ['',Validators.required],
      brojModela: ['',Validators.required]
    });
    this.getAllSmerovi();
  }

  chosenSmer(){
    if(this.smerArray.includes(this.smer.value))
      this.smerChosen = true;
    else
      this.smerChosen = false;
  }
  chosenPol(){
    if(this.polArray.includes(this.pol.value))
      this.polChosen = true;
    else
      this.polChosen = false;
  }
  chosenFinan(){
    if(this.finansiranjeArray.includes(this.nacinFinansiranja.value))
      this.finanChosen = true;
    else
      this.finanChosen = false;
  }

  getAllSmerovi(){
    this._smerService.getSmerovi()
    .subscribe(
      data => {
        var smerovi;
        smerovi = data
        for (var i = 0; i < smerovi.length; i++) {
          var concat = `Oznaka:${smerovi[i].oznakaSmera},Naziv:${smerovi[i].naziv}`
          this.smerArray.push(concat);
        }  
      });
  }


  addUcenik(){
    var ime = this.ime.value;
    var prezime = this.prezime.value;
    var godinaUpisa = this.godinaUpisa.value;
    var godinaStudija = this.godinaStudija.value;
    var drzaval = this.drzavaRodjenja.value.toLowerCase();
    var mestol = this.mestoRodjenja.value.toLowerCase();
    var adresal = this.adresa.value.toLowerCase();
    
    var drzavaRodjenja = drzaval.charAt(0).toUpperCase() + drzaval.slice(1);
    var mestoRodjenja = drzaval.charAt(0).toUpperCase() + mestol.slice(1);
    var adresa = drzaval.charAt(0).toUpperCase() + adresal.slice(1);
    
    var datumRodjenja = this.datumRodjenja.value;
    var email = this.email.value;

    var pol = this.pol.value;
    var smer = this.smer.value;
    var smerOznaka = smer.split(',')[0].substring(7);
    var nacinFinansiranja = this.nacinFinansiranja.value;

    var ziroRacun = this.ziroRacun.value;
    var pozivNaBroj = this.pozivNaBroj.value;
    var brojModela = this.brojModela.value;
    
    var uc = new Ucenik(null,ime,prezime,null,godinaUpisa,godinaStudija,new Smer(null,null,null,null,smerOznaka,null,null),
    null,null,null,null,null,drzavaRodjenja,mestoRodjenja,datumRodjenja,pol,nacinFinansiranja,email,adresa,null,null,null);

    var fk = new FinansijskaKartica(null,null,null,uc,ziroRacun,pozivNaBroj,brojModela);
    this._ucenikService.addUcenik(fk)
    .subscribe(
      response =>{
        this._router.navigate(['ucenici']);
      },
      error => alert('Doslo je do greske!')
    );
    
    
  }

  get ime() {
    return this.addForm.get('ime');
  }
  get prezime() {
    return this.addForm.get('prezime');
  }
  get godinaUpisa() {
    return this.addForm.get('godinaUpisa');
  }
  get godinaStudija() {
    return this.addForm.get('godinaStudija');
  }
  get drzavaRodjenja() {
    return this.addForm.get('drzavaRodjenja');
  }
  get mestoRodjenja() {
    return this.addForm.get('mestoRodjenja');
  }
  get adresa() {
    return this.addForm.get('adresa');
  }
  get datumRodjenja() {
    return this.addForm.get('datumRodjenja');
  }
  get email() {
    return this.addForm.get('email');
  }
  get ziroRacun() {
    return this.addForm.get('ziroRacun');
  }
  get pozivNaBroj() {
    return this.addForm.get('pozivNaBroj');
  }
  get brojModela() {
    return this.addForm.get('brojModela');
  }
  get pol() {
    return this.addForm.get('pol')  as FormArray;
  }
  get smer() {
    return this.addForm.get('smer')  as FormArray;
  }
  get nacinFinansiranja() {
    return this.addForm.get('nacinFinansiranja')  as FormArray;
  }

}
