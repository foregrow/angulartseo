import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { Router } from '@angular/router';
import { Nastavnik } from 'src/app/model/nastavnik';
import { Smer } from 'src/app/model/smer';
import { SmerService } from 'src/app/services/smer.service';

@Component({
  selector: 'app-smer-add',
  templateUrl: './smer-add.component.html',
  styleUrls: ['./smer-add.component.css']
})
export class SmerAddComponent implements OnInit {

  addForm: FormGroup;
  nastavnici: Nastavnik[] = []; 
  nastavniciStr: string[] = [];

  constructor(private fb: FormBuilder,
    public _korisnikService: KorisnikService,
    private _nastavnikService: NastavnikService,
    private _router: Router,
    private _smerService: SmerService) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      naziv: ['',Validators.required],
      nastavnikPodaci: [this.fb.array(this.nastavniciStr)],
    });
    this.getNastavniciWhereSefKatedreNull();
  }

  getNastavniciWhereSefKatedreNull(){
    this._nastavnikService.getNastavniciWhereSefKatedreNull().subscribe(
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

  get naziv() {
    return this.addForm.get('naziv');
  }

  get nastavnikPodaci() {
    return this.addForm.get('nastavnikPodaci')  as FormArray;
  }

  addSmer(){
    var naziv = this.naziv.value;
    var email;
    var nastavnik;
    
    if(this.nastavnikPodaci.dirty){
      nastavnik = this.nastavnikPodaci.value;
      try {
        email = nastavnik.split(',')[2].substring(6);
      } catch (error) {
        console.log(error);
      }
    }else{
      email = 'null';
    }
    console.log(email);
    var smer: Smer = new Smer(null,naziv,null,null,null);
    this._smerService.addSmer(smer,email)
    .subscribe(
      data =>{
        this._router.navigate(['smerovi']);
      }
    );
    
  }

}
