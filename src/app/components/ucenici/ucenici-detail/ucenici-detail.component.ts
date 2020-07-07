import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FinansijskaKartica } from 'src/app/model/finansijskakartica';
import { Ucenik } from 'src/app/model/ucenik';
import { Smer } from 'src/app/model/smer';
import { UcenikService } from 'src/app/services/ucenik.service';
import { SmerService } from 'src/app/services/smer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FinansijskaKarticaService } from 'src/app/services/finansijska-kartica.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Dokument } from 'src/app/model/dokument';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ucenici-detail',
  templateUrl: './ucenici-detail.component.html',
  styleUrls: ['./ucenici-detail.component.css']
})
export class UceniciDetailComponent implements OnInit {

  addEditParam;
  kartica;
  addEditForm: FormGroup;
  polArray = ['ZENSKI','MUSKI']
  finansiranjeArray = ['BUDZET','SAMOFINANSIRANJE']
  smerArray = [];
  polChosen = false;
  finanChosen = false;
  smerChosen = false;
  dokumentiArray = [];
  uploadForm : FormGroup;
  constructor(public korisnikService: KorisnikService,
    private fb: FormBuilder,private _ucenikService: UcenikService,
    private _router: Router,private _smerService:SmerService,
    private _route: ActivatedRoute, private _karticaService: FinansijskaKarticaService,
    private _http: HttpClient) { 
      
    }

    //[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}
  ngOnInit(): void {
    this.addEditParam = this._route.snapshot.paramMap.get('id');
    if(isNaN(this.addEditParam) && this.addEditParam !== 'add'){
      this._router.navigate(['not-found']);
    }
    this.getAllSmerovi();
    this.addEditForm = this.fb.group({
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
      ziroRacun: ['',[Validators.required,Validators.pattern("^[0-9]\*")]],
      pozivNaBroj: ['',[Validators.required,Validators.pattern("^[0-9]\*")]],
      brojModela: ['',[Validators.required,Validators.pattern("^[0-9]\*")]],
      trenutniSmer: [''],
      suma: ['',[Validators.pattern("^[0-9]\*")]]
    });
    
    
    
    if(this.addEditParam !== 'add' && this.addEditParam !== undefined){
      //znaci da je edit..
      this.addEditForm.controls['godinaUpisa'].disable();
      this.addEditForm.controls['trenutniSmer'].disable();
      this.getByIdAndSetValues(this.addEditParam);
    }
  }

  getByIdAndSetValues(id){
    this._karticaService.getByUcenikId(id).subscribe(
       data => {
         this.kartica = data;
         var positionPol;
         var positionFinan;
         var positionSmer;
         if(this.kartica.ucenik !== undefined){
          if(this.kartica.ucenik.pol === 'ZENSKI'){
            positionPol = 0;
           }else if(this.kartica.ucenik.pol === 'MUSKI'){
            positionPol = 1;
          }
          if(this.kartica.ucenik.nacinFinansiranja === 'BUDZET'){
            positionFinan = 0;
           }else if(this.kartica.ucenik.nacinFinansiranja === 'SAMOFINANSIRANJE'){
            positionFinan = 1;
          }
          
          this.dokumentiArray = this.kartica.ucenik.dokumenti;
         }
         
         this.addEditForm.patchValue({
          ime: this.kartica.ucenik.ime,
          prezime: this.kartica.ucenik.prezime,
          godinaUpisa: this.kartica.ucenik.godinaUpisa,
          godinaStudija: this.kartica.ucenik.godinaStudija,
          drzavaRodjenja: this.kartica.ucenik.drzavaRodjenja,
          mestoRodjenja: this.kartica.ucenik.mestoRodjenja,
          adresa: this.kartica.ucenik.adresa,
          datumRodjenja: this.kartica.ucenik.datumRodjenja,
          pol: this.polArray[positionPol],
          email: this.kartica.ucenik.email,
          trenutniSmer:  this.kartica.ucenik.smer.naziv,
          nacinFinansiranja: this.finansiranjeArray[positionFinan],
          ziroRacun: this.kartica.ziroRacun,
          pozivNaBroj: this.kartica.pozivNaBroj,
          brojModela: this.kartica.brojModela,
          suma: this.kartica.suma
        });

        console.log(this.kartica.ucenik.dokumenti);
       });

       this.uploadForm = this.fb.group({
        files: ['']
      });
       
   }
   detalji(obj){
    this._router.navigate(['predmeti-detail',obj.id]);
  }

  preuzmiDokumente(){
    if(this.dokumentiArray.length <= 0){
      alert('Ucenik nema ni jedan elektronski dokument! ');
    }else{
      var fk = new FinansijskaKartica(null,null,null,new Ucenik(this.kartica.ucenik.id,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null),null,null,null);
      this._ucenikService.download(this.kartica.ucenik.id).subscribe(
        data=>{
          console.log('uspeh');
        }
      );
    }
  }

  fileName;
  selectedFile;
  onFileChanged(e: any){

    this.selectedFile = e.target.files[0];
  }

  
  onUpload(){  
    const fileData = new FormData();
    fileData.append('file', this.selectedFile, this.selectedFile.name);
    fileData.append('uid', this.kartica.ucenik.id);
    this._ucenikService.upload(fileData).subscribe(
      data=>{
        alert('Uspesno dodat fajl!');
      }
    )
    
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
    this._smerService.getSmerovi().subscribe(
      data => {
        var smerovi = data
        for (var i = 0; i < smerovi.length; i++) {
            this.smerArray.push(smerovi[i]); 
        }
      }
    );
  }

  get files(){
    return this.uploadForm.get('files');
  }

  submitUcenik(addOrEdit){
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
    var nacinFinansiranja = this.nacinFinansiranja.value;

    var ziroRacun = this.ziroRacun.value;
    var pozivNaBroj = this.pozivNaBroj.value;
    var brojModela = this.brojModela.value;
    var suma = this.suma.value;
    if(addOrEdit==='add'){
      var uc = new Ucenik(null,ime,prezime,null,godinaUpisa,godinaStudija,new Smer(null,null,null,null,smer.oznakaSmera,null,null),
      null,null,null,null,null,drzavaRodjenja,mestoRodjenja,datumRodjenja,pol,nacinFinansiranja,email,adresa,null,null,null,null,null);
  
      var fk = new FinansijskaKartica(null,null,null,uc,ziroRacun,pozivNaBroj,brojModela);
      this._ucenikService.addUcenik(fk)
        .subscribe(
          response => {
            this._router.navigate(['ucenici']);
          },
          error => {
            alert('Doslo je do greske!');
          }
  
        );
    }else if(addOrEdit==='edit'){
      var uc = new Ucenik(this.kartica.ucenik.id,ime,prezime,this.kartica.ucenik.index,godinaUpisa,godinaStudija,new Smer(null,null,null,null,smer.oznakaSmera,null,null),
      null,null,null,null,null,drzavaRodjenja,mestoRodjenja,datumRodjenja,pol,nacinFinansiranja,email,adresa,this.kartica.ucenik.ukupnoECTSBodova,
      this.kartica.ucenik.prosecnaOcena,null,null,null);

      var kartica = new FinansijskaKartica(this.kartica.id,this.kartica.brojKartice,suma,
        uc,ziroRacun,pozivNaBroj,brojModela);

        this._ucenikService.updateUcenik(kartica)
        .subscribe(
          response => {
            this.getByIdAndSetValues(this.addEditParam);
            alert('Izmena uspesna! ');
          },
          error => {
            alert('Doslo je do greske!');
          }
  
        );
    }
    
  }

  get suma() {
    return this.addEditForm.get('suma');
  }
  get ime() {
    return this.addEditForm.get('ime');
  }
  get prezime() {
    return this.addEditForm.get('prezime');
  }
  get godinaUpisa() {
    return this.addEditForm.get('godinaUpisa');
  }
  get godinaStudija() {
    return this.addEditForm.get('godinaStudija');
  }
  get drzavaRodjenja() {
    return this.addEditForm.get('drzavaRodjenja');
  }
  get mestoRodjenja() {
    return this.addEditForm.get('mestoRodjenja');
  }
  get adresa() {
    return this.addEditForm.get('adresa');
  }
  get datumRodjenja() {
    return this.addEditForm.get('datumRodjenja');
  }
  get email() {
    return this.addEditForm.get('email');
  }
  get trenutniSmer() {
    return this.addEditForm.get('trenutniSmer');
  }
  get ziroRacun() {
    return this.addEditForm.get('ziroRacun');
  }
  get pozivNaBroj() {
    return this.addEditForm.get('pozivNaBroj');
  }
  get brojModela() {
    return this.addEditForm.get('brojModela');
  }
  get pol() {
    return this.addEditForm.get('pol')  as FormArray;
  }
  get smer() {
    return this.addEditForm.get('smer')  as FormArray;
  }
  get nacinFinansiranja() {
    return this.addEditForm.get('nacinFinansiranja')  as FormArray;
  }

}
