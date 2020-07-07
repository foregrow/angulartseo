import { Korisnik } from './../../../model/korisnik';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PredmetService } from 'src/app/services/predmet.service';
import { Nastavnik } from 'src/app/model/nastavnik';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { SmerService } from 'src/app/services/smer.service';
import { Smer } from 'src/app/model/smer';
import { Predmet } from 'src/app/model/predmet';
import { Ispit } from 'src/app/model/ispit';

@Component({
  selector: 'app-nastavnici-detail',
  templateUrl: './nastavnici-detail.component.html',
  styleUrls: ['./nastavnici-detail.component.css']
})
export class NastavniciDetailComponent implements OnInit {

  id;
  ulogovanUloga;
  nastavnik;
  editForm: FormGroup;
  addPredmetForm: FormGroup;
  ulogeArray = ['PROFESOR','ASISTENT','DEMONSTRATOR'];
  isSefSmera = false;
  hasKorAcc = false;
  emailExists = false;
  nastavniciEmailovi: string[] = [];
  
  smeroviArray = [];
  predmetiArray = [];
  predmetiNastavniciPredaju = [];
  predmetiNastavnikPredaje = [];
  dodatiPredmetiArray = [];
  smerSelected = false;
  predmetSelected = false;
  constructor(private _route: ActivatedRoute,
    public korisnikService:KorisnikService,
    public _smerService:SmerService,
    private router: Router,
    private _nastavnikService: NastavnikService, private fb: FormBuilder, private _predmetService: PredmetService
    ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if(isNaN(this.id)){
      this.router.navigate(['not-found']);
    }
    if(this.korisnikService.getRole() ==="ROLE_ADMIN"){
      this.ulogovanUloga = "ROLE_ADMIN";
    }
    
    if(this.korisnikService.getRole() === 'ROLE_NASTAVNIK' || this.korisnikService.getRole() === 'ROLE_ASISTENT' || this.korisnikService.getRole() === 'ROLE_DEMONSTRATOR'){
      this.korisnikService.proveraPristupaNastavnika(this.id,this.korisnikService.getLoggedInUserKorIme()).subscribe(
        response =>{},
        error => {
          this.router.navigate([PageNotFoundComponent]);
          return;
        }
      )
    }
    
    
    this.editForm = this.fb.group({
      ime: ['',Validators.required],
      prezime: ['',Validators.required],
      lozinka:[''],
      lozinkaPonovljena:[''],
      email: ['',[Validators.required,Validators.email]],
      uloga: [this.fb.array(this.ulogeArray)],
      korisnik: [{value: '', disabled: true}],
      smer: [{value: '', disabled: true}]
    });

    if(this.ulogovanUloga !== "ROLE_ADMIN"){
      this.editForm.get('uloga').disable();
    }else if(this.ulogovanUloga === "ROLE_ADMIN"){
      this.addPredmetForm = this.fb.group({
        smerovi: [[null,this.fb.array(this.smeroviArray)]],
        predmeti: [[null,this.fb.array(this.predmetiArray)]],
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

    
    this.getByIdAndSetValues(this.id);
    
    this.email.valueChanges.subscribe(data =>
      {
        this.existingEmail();
      }
    )
    this.getPredmetiNastavniciPredaju();
    this.getPredmetiNastavnikPredaje(this.id);
    this.getSmerovi();

    

  }

  detalji(obj){
    this.router.navigate(['predmeti-detail',obj.id])
  }

  getByIdAndSetValues(id){
    this._nastavnikService.getById(id).subscribe(
       data => {
         this.nastavnik = data;
         var position;
         if(this.nastavnik.uloga === 'PROFESOR'){
          position = 0;
         }else if(this.nastavnik.uloga === 'ASISTENT'){
          position = 1;
        }else if(this.nastavnik.uloga === 'DEMONSTRATOR'){
          position = 2;
        }
         this.editForm.patchValue({
          ime: this.nastavnik.ime,
          prezime: this.nastavnik.prezime,
          email: this.nastavnik.email,
          uloga: this.ulogeArray[position]
        });
        if(this.nastavnik.korisnik != undefined){
          this.hasKorAcc = true;
          this.editForm.patchValue({
            korisnik: this.nastavnik.korisnik.korisnickoIme
          });
        }
        if(this.nastavnik.smer != undefined){
          this.isSefSmera = true;
          this.editForm.patchValue({
            smer: this.nastavnik.smer.naziv
          });
        }
        this.getAllEmailovi();
       });
       
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
  addPredmet(){
    var predmet : Predmet = this.predmeti.value;
    if (this.dodatiPredmetiArray.filter(p => p.id === predmet.id).length > 0) {
      alert('Izabrani predmet ste vec dodali!!')
    }else {
      if(this.predmetiNastavniciPredaju.find(o => o.id === predmet.id) && this.nastavnik.uloga === 'PROFESOR'){
        alert('Izabrani predmet vec ima profesora! ');
      }else if(this.predmetiNastavnikPredaje.find(o => o.id === predmet.id)){
        alert('Ovaj predmet vec predaje izabrani asistent! ');
      }else{
        var prikazPredmeta;
        this.dodatiPredmetiArray.push(predmet);
        if(this.counter === 0)
          prikazPredmeta = `${predmet.naziv} `;
        else
          prikazPredmeta = `${this.dodatiPredmeti.value} ${predmet.naziv}`;
        this.dodatiPredmeti.setValue(prikazPredmeta);
        this.counter++;
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
      
      
      var nastavnik: Nastavnik = new Nastavnik(+this.id,null,null,null,null,null,null,this.dodatiPredmetiArray);
      this._nastavnikService.addPredmeteNastavniku(nastavnik).subscribe(
        data =>{
          this.dodatiPredmeti.setValue('');
          this.dodatiPredmetiArray = [];
          alert('Uspesno ste dodali predmete!');
          this.getByIdAndSetValues(this.id);
        },error =>{
          console.log(error);
        }
      );
    }else{
      alert('Niste izabrali nijedan predmet!');
    }
   }

   getPredmetiNastavniciPredaju(){
     this._predmetService.getPredmetiNastavniciPredaju().subscribe(
      data=>{
        var predmeti = data;
        for(var i =0;i<predmeti.length;i++){
          this.predmetiNastavniciPredaju.push(predmeti[i]);
        }
      }
     );
   }
   getPredmetiNastavnikPredaje(id){
    this._predmetService.getPredmetiNastavnikPredaje(id).subscribe(
     data=>{
       var predmeti = data;
       for(var i =0;i<predmeti.length;i++){
         this.predmetiNastavnikPredaje.push(predmeti[i]);
       }
     }
    );
  }
   
   
   getAllEmailovi(){
    this._nastavnikService.getNastavnici()
      .subscribe(
        data => {
          var nastavnici;
          nastavnici = data
          for (var i = 0; i < nastavnici.length; i++) {
            if(this.nastavnik != undefined){
              if(this.nastavnik.email === nastavnici[i].email){
                continue;
              }
            }
            this.nastavniciEmailovi.push(nastavnici[i].email);
            
          }  
        });
  }

  existingEmail(){
    if(this.nastavniciEmailovi.includes(this.email.value))
      this.emailExists = true;
    else
    this.emailExists = false;
  }

   editNastavnik(){
    var numbId = +this.id;
    var ime = this.ime.value;
    var prezime = this.prezime.value;
    var email = this.email.value;
    var uloga = this.uloga.value;
    var lozinka = this.lozinka.value;
    var lozinkaPonovljena = this.lozinkaPonovljena.value;
    if(lozinka != lozinkaPonovljena){
      alert('Lozinke se ne poklapaju !')
    }else if(lozinka == '' && lozinkaPonovljena == '') {
    var nastavnik: Nastavnik = new Nastavnik(numbId,ime,prezime,email,uloga,null,null,null);
      this._nastavnikService.updateNastavnik(nastavnik)
      .subscribe(
        data =>{
          this.nastavnik = data;
          this.getByIdAndSetValues(this.id);
          alert('Uspesna izmena podataka! ');
          this.router.navigate(['nastavnik']);
        }
      );
    } else {
      var korisnik: Korisnik = new Korisnik(null,null,lozinka,null,null,null);
      this.korisnikService.updateNastavnikPassword(korisnik,numbId)
      .subscribe(
        response => {
          var nastavnik: Nastavnik = new Nastavnik(numbId,ime,prezime,email,uloga,null,null,null);
          this._nastavnikService.updateNastavnik(nastavnik)
          .subscribe(
            data =>{
              this.nastavnik = data;
              this.getByIdAndSetValues(this.id);
              alert('Uspesna izmena podataka! ');
              this.router.navigate(['nastavnik']);
            }
          );
        },
        error => {
          alert('Doslo je do greske');
        }
      )
    }
   }

   get ime() {
    return this.editForm.get('ime');
  }
  get prezime() {
    return this.editForm.get('prezime');
  }
  get email() {
    return this.editForm.get('email');
  }
  get uloga() {
    return this.editForm.get('uloga')  as FormArray;
  }
  get korisnik() {
    return this.editForm.get('korisnik');
  }
  get lozinka(){
    return this.editForm.get('lozinka');
  }
  get lozinkaPonovljena(){
    return this.editForm.get('lozinkaPonovljena');
  }

  get smerovi() {
    if(this.korisnikService.getRole() === 'ROLE_ADMIN')
      return this.addPredmetForm.get('smerovi')  as FormArray;
    
    
  }
  get predmeti() {
    if(this.korisnikService.getRole() === 'ROLE_ADMIN')
      return this.addPredmetForm.get('predmeti')  as FormArray;
  }
  get dodatiPredmeti() {
    if(this.korisnikService.getRole() === 'ROLE_ADMIN') 
      return this.addPredmetForm.get('dodatiPredmeti');
  }

}
