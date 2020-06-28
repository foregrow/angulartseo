import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { SmerService } from 'src/app/services/smer.service';
import { Smer } from 'src/app/model/smer';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Nastavnik } from 'src/app/model/nastavnik';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { PredmetService } from 'src/app/services/predmet.service';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Predmet } from 'src/app/model/predmet';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
@Component({
  selector: 'app-smer-detail',
  templateUrl: './smer-detail.component.html',
  styleUrls: ['./smer-detail.component.css']
})
export class SmerDetailComponent implements OnInit {

  addOrId;
  addEditForm: FormGroup;
  nastavnici: Nastavnik[] = []; 
  nastavniciStr: string[] = [];
  smer;
  sviPredmeti = [];
  filteredPredmeti: Observable<string[]>;
  dodatiPredmeti = [];
  constructor(private fb: FormBuilder,
    public _korisnikService: KorisnikService,
    private _nastavnikService: NastavnikService,
    private _router: Router,
    private _smerService: SmerService,
    private _route: ActivatedRoute,
    private _predmetService: PredmetService) { }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      naziv: ['',Validators.required],
      oznakaSmera: ['',[Validators.required,Validators.pattern("^[A-Za-z]{2}")]],
      bodovi: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      sefKatedre: [''],
      nastavnikPodaci: [this.fb.array(this.nastavniciStr)],
      predmeti: [''],
      dodatiPred: [{value: '', disabled: true}]
    });
    this.getNastavniciWhereSefKatedreNull();
    this.addOrId = this._route.snapshot.paramMap.get('id');
    if(this.addOrId !== 'add'){
      this.getByIdAndSetValues(this.addOrId);
      this.addEditForm.controls['oznakaSmera'].disable();
      this.addEditForm.controls['sefKatedre'].disable();
      /*this.filteredPredmeti = this.predmeti.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );*/
    }
    
  }
  /*private _filter(value: string): string[]{
    const filterValue= value.toLowerCase();
    
    return this.sviPredmeti.filter
    (pred => pred.naziv.toLowerCase().includes(filterValue));
      
  }*/

  /*dodatiPredmetiString = "";
  izbrisaniPredmeti: Predmet[] = [];
  predmetPostoji = true;
  addPredmet(){
    this.predmetPostoji = false;
    var dodatPredmet = this.predmeti.value.trim();
    var dodatZaBrisanje: number = -1;
    for(var i=0;i<this.sviPredmeti.length;i++){
      if(this.sviPredmeti[i].naziv === dodatPredmet){
        dodatZaBrisanje = i;
        this.dodatiPredmeti.push(this.sviPredmeti[i]);
        this.predmeti.setValue('');
        this.dodatiPredmetiString = `${this.dodatiPredmetiString}${dodatPredmet} `
        this.dodatiPred.setValue(this.dodatiPredmetiString);
        this.predmetPostoji = true;
        break;
      }
    }
    if(dodatZaBrisanje != -1){
      //brise se ajtem iz liste
      this.izbrisaniPredmeti.push(this.sviPredmeti[dodatZaBrisanje]);
      this.sviPredmeti.splice(dodatZaBrisanje,1);  
    }
    
  }

  removePredmet(){
    this.dodatiPred.setValue('');
    //puni se lista ponovo
    this.sviPredmeti = this.sviPredmeti.concat(this.izbrisaniPredmeti);  
    this.izbrisaniPredmeti = [];
    this.dodatiPredmeti = [];
  }*/

  getNastavniciWhereSefKatedreNull(){
    this._nastavnikService.getNastavniciWhereSefKatedreNull().subscribe(
      data => {
        this.nastavnici = data
        if(this.nastavnici.length > 0){
          for (var i = 0; i < this.nastavnici.length; i++) {
            if(this.nastavnici[i].uloga === 'PROFESOR'){
              let concated = `Ime:${this.nastavnici[i].ime},Prezime:${this.nastavnici[i].prezime},Email:${this.nastavnici[i].email},Uloga:${this.nastavnici[i].uloga}`;
              this.nastavniciStr.push(concated);
            }
            
          }
        }
        
      }
    );
  }

  /*displayFn(obj){
    //prikaz u autocomplete ce biti naziv predmeta a ne Object [object]
    return obj ? obj.naziv : undefined;
  }*/

  get naziv() {
    return this.addEditForm.get('naziv');
  }
  get oznakaSmera() {
    return this.addEditForm.get('oznakaSmera');
  }

  get bodovi() {
    return this.addEditForm.get('bodovi');
  }

  get sefKatedre() {
    return this.addEditForm.get('sefKatedre');
  }
  
  get nastavnikPodaci() {
    return this.addEditForm.get('nastavnikPodaci')  as FormArray;
  }
  get predmeti() {
    return this.addEditForm.get('predmeti');
  }
  get dodatiPred() {
    return this.addEditForm.get('dodatiPred');
  }
  

  getByIdAndSetValues(id){
    this._smerService.getById(id).subscribe(
       data => {
        this.smer = data;
    
        this.addEditForm.patchValue({
        naziv: this.smer.naziv,
        oznakaSmera: this.smer.oznakaSmera,
        bodovi: this.smer.brojECTSBodova,
        sefKatedre: `${this.smer.nastavnik.ime} ${this.smer.nastavnik.prezime}`
      });
        //this.getAllPredmeti(this.smer.id);
       },
       error => {
         alert('Greska');
       });
  }
  /*getAllPredmeti(idSmera){
    this._predmetService.getPredmetiNotInSmer(idSmera).subscribe(
      data =>{
        this.sviPredmeti = data;
      });
  }*/

  addSmer(param){
    var naziv = this.naziv.value;
    var oznakaSmera = this.oznakaSmera.value;
    var email;
    var nastavnik;
    var brojBodova = this.bodovi.value;
    if(this.nastavnikPodaci.dirty){
      nastavnik = this.nastavnikPodaci.value;
      try {
        email = nastavnik.split(',')[2].substring(6);
      } catch (error) {
        alert("Greska!");
        return;        
      }
    }else{
      email = 'null';
    }
    if(param === 'add'){
      var smer: Smer = new Smer(null,naziv,brojBodova,null,oznakaSmera.toUpperCase(),null,null);
      this._smerService.addSmer(smer,email)
      .subscribe(
        data =>{
          this._router.navigate(['smerovi']);
        });
    }else if(param === 'edit'){
      var smer: Smer = new Smer(this.smer.id,naziv,brojBodova,null,this.smer.oznakaSmera,null,null);
      this._smerService.updateSmer(smer,email)
      .subscribe(
        data =>{
          alert('Izmena uspesna! ');
          this.getByIdAndSetValues(this.smer.id);
        });
    }
    
    
  }

}
