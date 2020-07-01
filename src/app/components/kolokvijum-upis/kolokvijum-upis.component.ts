import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PredmetService } from 'src/app/services/predmet.service';
import { DatePipe } from '@angular/common';
import { UcenikService } from 'src/app/services/ucenik.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Predmet } from 'src/app/model/predmet';
import { Ucenik } from 'src/app/model/ucenik';
import { Kolokvijum } from 'src/app/model/kolokvijum';
import { KolokvijumService } from 'src/app/services/kolokvijum.service';

@Component({
  selector: 'app-kolokvijum-upis',
  templateUrl: './kolokvijum-upis.component.html',
  styleUrls: ['./kolokvijum-upis.component.css']
})
export class KolokvijumUpisComponent implements OnInit {

  addForm: FormGroup;
  predmetSelected = false;
  ucenikSelected = false;
  uceniciArray = [];
  predmetiArray = [];
  brojKlkArray = ['PRVI','DRUGI'];
  brojKlkSelected = false;
  rezultatiSvihKlk = [];
  constructor(private _route: ActivatedRoute,
    private _predmetService: PredmetService,
    private _korisnikService: KorisnikService,
    private _klkService: KolokvijumService,
    private _router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
        datumPolaganja: ['',Validators.required], 
        predmeti: [[null,this.fb.array(this.predmetiArray)]],
        ucenici: [[null,this.fb.array(this.uceniciArray)]],
        brojKlk: [[null,this.fb.array(this.brojKlkArray)]],
        brojBodova: ['',[Validators.required,Validators.pattern("^[0-9]\{2}")]]
      }); 
    var korIme = this._korisnikService.getLoggedInUserKorIme();
    this.getPredmetiUcenici(korIme);

    this.predmeti.valueChanges.subscribe(
      data=>{
        var predmet: Predmet = this.predmeti.value;
        this.predmetSelected = true;
        this.uceniciArray = predmet.ucenici;
        if(this.uceniciArray.length > 0){
          this.ucenikSelected = true;
          this.ucenici.setValue(this.uceniciArray[0])
        }else{
          this.ucenikSelected = false;
        }
      });

      this.brojKlk.valueChanges.subscribe(
        data=>{
          this.brojKlkSelected = true;
        }
      )
  }

  getPredmetiUcenici(korIme){
    this._predmetService.getPredmetiUcenici(korIme).subscribe(
      data=>{
        var predmeti = data;
        for (var i = 0; i < predmeti.length; i++) {
          this.predmetiArray.push(predmeti[i]); 
          for(var j=0;j<predmeti[i].kolokvijumi.length;j++)
            this.rezultatiSvihKlk.push(predmeti[i].kolokvijumi[j]);
        }
      }
    )
  }

  submitKolokvijum(){
    var predmet : Predmet = this.predmeti.value;
    var ucenik : Ucenik = this.ucenici.value;
    var brojBodova = this.brojBodova.value;
    var brojKlk = this.brojKlk.value;
    
    var datumPolaganja = new Date(this.datumPolaganja.value);
    const diff = datumPolaganja.getTime() -  new Date().getTime();
    const diffHours = Math.ceil(diff / (1000 * 60 * 60)); 
    if(diffHours > 0){
      alert('Datum kolokvijuma mora biti u proslosti!')
    }else{
      var datumZaSlanje = this.datePipe.transform(this.datumPolaganja.value,"yyyy-MM-ddTHH:mm:ss.SSS");
      //brojKlk = naziv
      var klk = new Kolokvijum(null,brojBodova,datumZaSlanje,predmet,ucenik,null,brojKlk);
      console.log(klk);
      this._klkService.addKolokvijum(klk).subscribe(
        response=>{
          this.rezultatiSvihKlk = [];
          this.getPredmetiUcenici(this._korisnikService.getLoggedInUserKorIme());
          alert('Uspesan unos broja bodova!');
        },error=>{
          console.log(error);
        });
    }
  }

  get ucenici() {
    return this.addForm.get('ucenici') as FormArray;
  }
  get predmeti() {
    return this.addForm.get('predmeti') as FormArray;
  }
  get datumPolaganja() {
    return this.addForm.get('datumPolaganja');
  }
  get brojBodova() {
    return this.addForm.get('brojBodova');
  }
  get brojKlk() {
    return this.addForm.get('brojKlk') as FormArray;
  }

}
