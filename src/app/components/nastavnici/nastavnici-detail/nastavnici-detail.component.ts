import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PredmetService } from 'src/app/services/predmet.service';
import { Nastavnik } from 'src/app/model/nastavnik';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';

@Component({
  selector: 'app-nastavnici-detail',
  templateUrl: './nastavnici-detail.component.html',
  styleUrls: ['./nastavnici-detail.component.css']
})
export class NastavniciDetailComponent implements OnInit {

  id;
  ulogovan;
  nastavnik;
  editForm: FormGroup;
  ulogeArray = ['PROFESOR','ASISTENT','DEMONSTRATOR'];
  isSefSmera = false;
  hasKorAcc = false;
  emailExists = false;
  nastavniciEmailovi: string[] = [];
  predmetiNastavnikNePredajeStr: string[]=[];
  addedPredmeti: string[] = [];
  predmetAddIsValid = true;
  constructor(private _route: ActivatedRoute,
    public korisnikService:KorisnikService,
    private router: Router,
    private _nastavnikService: NastavnikService, private fb: FormBuilder, private _predmetService: PredmetService
    ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if(this.id !== 'add'){
      if(this.korisnikService.getRole() === 'ROLE_NASTAVNIK'){
        this.korisnikService.proveraPristupaNastavnika(this.id,this.korisnikService.getLoggedInUserKorIme()).subscribe(
          response =>{},
          error => {
            this.router.navigate([PageNotFoundComponent]);
            return;
          }
        )
      }
    }
    this.ulogovan = this.korisnikService.getLoggedInUserKorIme();
    this.editForm = this.fb.group({
      ime: ['',Validators.required],
      prezime: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      uloga: [this.fb.array(this.ulogeArray)],
      korisnik: [{value: '', disabled: true}],
      smer: [{value: '', disabled: true}],
      predmeti: [''],
      dodatiPredmeti:[{value: '', disabled: true}]
    });

    if(this.ulogovan !== "admin"){
      this.editForm.get('ime').disable();
      this.editForm.get('prezime').disable();
      this.editForm.get('email').disable();
      this.editForm.get('uloga').disable();
    } 

    
    this.getByIdAndSetValues(this.id);
    
    this.email.valueChanges.subscribe(data =>
      {
        this.existingEmail();
      }
    )
    this.getPredmetiNastavnikNePredaje();
  }

  getByIdAndSetValues(id){
    this._nastavnikService.getById(id).subscribe(
       data => {
         this.nastavnik = data;
         var position;
         //console.log(this.nastavnik.predaje);
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

   getPredmetiNastavnikNePredaje(){
     this._predmetService.getPredmetiNastavnikNePredaje(this.id).subscribe(
      data=>{
        var predmeti = data;
        for(var i =0;i<predmeti.length;i++){
          this.predmetiNastavnikNePredajeStr.push(predmeti[i].naziv);
        }
      }
     );
   }
   counter = 0;
   dodatiPredmetiStr;
   izbrisaniItemi: string[]=[];
   addPredmet(){
     this.predmetAddIsValid = false;
     var addedPredmetZaBrisanje: number = -1;
     for(var i=0;i<this.predmetiNastavnikNePredajeStr.length;i++){
       if(this.predmetiNastavnikNePredajeStr[i].toLowerCase() === this.predmeti.value.trim().toLowerCase()){
        addedPredmetZaBrisanje = i;
        this.addedPredmeti.push(this.predmetiNastavnikNePredajeStr[i]);
        this.predmetAddIsValid = true;
        this.predmeti.setValue('');
        if(this.counter === 0){
          this.dodatiPredmetiStr = this.predmetiNastavnikNePredajeStr[i];
        }else{
          this.dodatiPredmetiStr = this.dodatiPredmetiStr + ' ' + this.predmetiNastavnikNePredajeStr[i];
        }
        this.dodatiPredmeti.setValue(this.dodatiPredmetiStr);
        this.counter++;
        this.getByIdAndSetValues(this.id);
        break;
       }
     }
     if(addedPredmetZaBrisanje != -1){
       //brise se ajtem iz liste
       //selectedCategory = this.predmetiNastavnikNePredajeStr.find(item => item. === addedPredmetZaBrisanje);
       this.izbrisaniItemi.push(this.predmetiNastavnikNePredajeStr[addedPredmetZaBrisanje]);
       this.predmetiNastavnikNePredajeStr.splice(addedPredmetZaBrisanje,1);
       
     }
   }
   removePredmet(){
    this.dodatiPredmeti.setValue('');
    //puni se lista ponovo
    this.predmetiNastavnikNePredajeStr = this.predmetiNastavnikNePredajeStr.concat(this.izbrisaniItemi);  
    this.counter = 0;
    this.izbrisaniItemi = [];
    this.addedPredmeti = [];
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
    var predmeti: string;
    if(this.addedPredmeti.length<=0){
      predmeti = 'null';
    }else if(this.addedPredmeti.length === 1){
      predmeti = this.addedPredmeti.join(',');
      predmeti = `${predmeti},`
    }
    else{ 
      predmeti = this.addedPredmeti.join(',');
    }
    var nastavnik: Nastavnik = new Nastavnik(numbId,ime,prezime,email,uloga,null,null,null);
      this._nastavnikService.updateNastavnik(nastavnik,predmeti)
      .subscribe(
        data =>{
          this.nastavnik = data;
          this.dodatiPredmeti.setValue(''); 
          this.getByIdAndSetValues(this.id);
        }
      );
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
  get smer() {
    return this.editForm.get('smer');
  }
  get predmeti() {
    return this.editForm.get('predmeti');
  }
  get dodatiPredmeti() {
    return this.editForm.get('dodatiPredmeti');
  }

}
