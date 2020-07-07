import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { DatePipe } from '@angular/common';
import { SmerService } from 'src/app/services/smer.service';
import { Smer } from 'src/app/model/smer';
import { Predmet } from 'src/app/model/predmet';
import { Ispit } from 'src/app/model/ispit';
import { IspitService } from 'src/app/services/ispit.service';
import { IspitniRok } from 'src/app/model/ispitnirok';
import { KorisnikService } from 'src/app/services/korisnik.service';

@Component({
  selector: 'app-ispitni-rokovi-detail',
  templateUrl: './ispitni-rokovi-detail.component.html',
  styleUrls: ['./ispitni-rokovi-detail.component.css']
})
export class IspitniRokoviDetailComponent implements OnInit {

  param;
  ispitniRok;
  addEditForm: FormGroup;
  addDateForm: FormGroup;
  smeroviArray = [];
  predmetiArray = [];
  dodatiPredmetiArray: Predmet[] = [];
  smerSelected = false;
  predmetSelected = false;
  sviIspitiRoka = [];
  kor;
  constructor(private _route: ActivatedRoute,
    private _ispitniRokService: IspitniRokService,
    public korisnikService : KorisnikService,
    private _ispitService: IspitService,
    private _smerService: SmerService,
    private _router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      nazivRoka: ['',Validators.required],
      pocetakRoka: ['',Validators.required],
      krajRoka: ['',Validators.required]
    });

    this.param = this._route.snapshot.paramMap.get('id');
    if(isNaN(this.param)){
      this._router.navigate(['not-found']);
    }else{
      if(this.param !== 'add' && this.korisnikService.getRole() === 'ROLE_ADMIN'){
        this.addEditForm.controls['nazivRoka'].disable();
        this.getByIdAndSetValues(this.param);
        this.getSmerovi();
        
        this.addDateForm = this.fb.group({
          smerovi: [[null,this.fb.array(this.smeroviArray)]],
          predmeti: [[null,this.fb.array(this.predmetiArray)]],
          datumPolaganja: ['',Validators.required],
          dodatiPredmeti:[{value: '', disabled: true}]
        });
        this.smerovi.valueChanges.subscribe(
          data=>{
            //na biranje smera setujemo predmete tog smera u drugi combobox
            var smer: Smer = this.smerovi.value;
            this.smerSelected = true;
            this.predmetiArray = smer.predmeti;
            if(this.predmetiArray.length > 0){
              this.predmetSelected = true;
              this.predmeti.setValue(this.predmetiArray[0])
            }else{
              this.predmetSelected = false;
            }
          });
        
        }
        if(this.korisnikService.getRole() === 'ROLE_NASTAVNIK' || this.korisnikService.getRole() === 'ROLE_ASISTENT' || this.korisnikService.getRole() === 'ROLE_DEMONSTRATOR'){
          this.getUlogovanaOsoba(this.param);
    
        }
    }
    
      
  }
  
  getUlogovanaOsoba(irid){
    this.korisnikService.getByKorisnickoIme(this.korisnikService.getLoggedInUserKorIme()).subscribe(
      data =>{
        this.kor = data;
        var osoba = this.kor.nastavnik;
        this.getIspitiNastavnikovihPredmeta(irid,osoba.id);
      }
    )
  }
  getIspitiNastavnikovihPredmeta(irid,nid){
    this._ispitService.getIspitiNastavnikovihPredmeta(irid,nid).subscribe(
      data =>{
        this.sviIspitiRoka = data;
      }
    )
  }

  getByIdAndSetValues(param){
    this._ispitniRokService.getById(param).subscribe(
      data => {
        this.ispitniRok = data;
        this.sviIspitiRoka = this.ispitniRok.ispiti;
        this.addEditForm.patchValue({
          nazivRoka: this.ispitniRok.nazivRoka,
          pocetakRoka: this.datePipe.transform(this.ispitniRok.pocetakRoka,"yyyy-MM-ddTHH:mm:ss.SSS"),
          krajRoka: this.datePipe.transform(this.ispitniRok.krajRoka,"yyyy-MM-ddTHH:mm:ss.SSS")
        });
      },error =>{
        console.log(error);
      }
    )
  }

  getSmerovi(){
    this._smerService.getSmerovi().subscribe(
      data => {
        var smerovi = data
        for (var i = 0; i < smerovi.length; i++) {
            this.smeroviArray.push(smerovi[i]); 
        }
      }
    );
  }
  counter = 0;
  izaberiPredmet(){
    var predmet : Predmet = this.predmeti.value;
    var date = new Date(this.datumPolaganja.value);
    var kraj = new Date(this.ispitniRok.krajRoka);
    var pocetak = new Date(this.ispitniRok.pocetakRoka);
    if (this.dodatiPredmetiArray.filter(p => p.id === predmet.id).length > 0) {
      alert('Izabranom predmetu ste vec postavili datum!')
    }else {
      if(date <= kraj && date >= pocetak){
        var prikazPredmeta;
        predmet.datumPolaganja = this.datePipe.transform(this.datumPolaganja.value,"yyyy-MM-ddTHH:mm:ss.SSS");
        this.dodatiPredmetiArray.push(predmet);
        if(this.counter === 0)
          prikazPredmeta = `${predmet.naziv} `;
        else
          prikazPredmeta = `${this.dodatiPredmeti.value} ${predmet.naziv}`;
        this.dodatiPredmeti.setValue(prikazPredmeta);
        this.counter++;
      }else{
        alert('Morate izabrati datum koji je izmedju pocetka i kraja ispitnog roka!')
      }
      
    }
    
  }

  removePredmet(){
    this.dodatiPredmetiArray = [];
    this.dodatiPredmeti.setValue('');
    this.counter = 0;
  }

  submitPredmete(){
    if(this.dodatiPredmetiArray.length > 0){
      
      var ispit = new Ispit(null,null,null,null,null,null,null,null,null,null,null,null,this.dodatiPredmetiArray,null,null)
      this._ispitService.addDatumPolaganjaPredmetima(ispit).subscribe(
        data =>{
          this.dodatiPredmeti.setValue('');
          this.dodatiPredmetiArray = [];
          alert('Uspesno ste dodali datum polaganja!');
          this.getByIdAndSetValues(this.param);
        },error =>{
          console.log(error);
        }
      );
    }else{
      alert('Niste izabrali nijedan predmet!');
    }
  }

  submit(param){
    var pocetakRoka = this.pocetakRoka.value;
    var krajRoka = this.krajRoka.value;

    const diff = new Date(krajRoka).getTime() -  new Date(pocetakRoka).getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60)); 
    if(diffHours <= 0){
      alert('Pocetak ispitnog roka mora biti pre kraja ispitnog roka')
    }else{
      if(param === 'edit'){
        var irok = new IspitniRok(this.ispitniRok.id,null,pocetakRoka,krajRoka,null);
        this._ispitniRokService.update(irok).subscribe(
        data =>{
          this.ispitniRok = data;
          alert('Uspesna izmena!');
        },error =>{
          console.log(error);
        });
      }else if(param === 'add'){
  
      }
    }
    
  }

  get nazivRoka() {
    return this.addEditForm.get('nazivRoka');
  }
  get pocetakRoka() {
    return this.addEditForm.get('pocetakRoka');
  }
  get krajRoka() {
    return this.addEditForm.get('krajRoka');
  }

  get smerovi() {
    return this.addDateForm.get('smerovi') as FormArray;
  }
  get predmeti() {
    return this.addDateForm.get('predmeti') as FormArray;
  }
  get datumPolaganja() {
    return this.addDateForm.get('datumPolaganja');
  }
  get dodatiPredmeti() {
    return this.addDateForm.get('dodatiPredmeti');
  }

}
