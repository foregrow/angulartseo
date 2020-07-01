import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PredmetService } from 'src/app/services/predmet.service';
import { Observable } from 'rxjs';
import { SmerService } from 'src/app/services/smer.service';
import { Predmet } from 'src/app/model/predmet';
import { Smer } from 'src/app/model/smer';

@Component({
  selector: 'app-predmeti-detail',
  templateUrl: './predmeti-detail.component.html',
  styleUrls: ['./predmeti-detail.component.css']
})
export class PredmetiDetailComponent implements OnInit {

  addEditParam;
  addEditForm: FormGroup;
  filteredPredmeti: Observable<string[]>;
  smerChosen = false;
  smeroviArray = [];
  predmet;
  constructor(private fb: FormBuilder,
    private _korisnikService: KorisnikService,
    private _predmetService: PredmetService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _smerService: SmerService) { }

  ngOnInit(): void {
    this.addEditForm = this.fb.group({
      naziv: ['',Validators.required],
      bodovi: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      smer: [this.fb.array(this.smeroviArray)],
    });
    this.getAllSmerovi();
    this.addEditParam = this._route.snapshot.paramMap.get('id');

    if(this.addEditParam !== 'add'){
      this.getPredmetByIdAndSetValues(this.addEditParam);
      this.addEditForm.controls['naziv'].disable();
      this.addEditForm.controls['smer'].disable();
    }
    
    
  }

  getPredmetByIdAndSetValues(predmetId){
    this._predmetService.getByPredmetId(predmetId)
    .subscribe(
      data=>{
        this.predmet = data;
        var smerCombo = this.smeroviArray.indexOf(`Oznaka:${this.predmet.smer.oznakaSmera},Naziv:${this.predmet.smer.naziv}`);

        this.addEditForm.patchValue({
          naziv : this.predmet.naziv,
          bodovi : this.predmet.brojECTSBodova,
          smer : this.smeroviArray[smerCombo]
        });
      }
    )
  }

  getAllSmerovi(){
    this._smerService.getSmerovi()
    .subscribe(
      data => {
        var smerovi = data;
        for (var i = 0; i < smerovi.length; i++) {
          var concat = `Oznaka:${smerovi[i].oznakaSmera},Naziv:${smerovi[i].naziv}`
          this.smeroviArray.push(concat);
        }  
      });
  }
  


  chosenSmer(){
    if(this.smeroviArray.includes(this.smer.value))
      this.smerChosen = true;
    else
      this.smerChosen = false;
  }

  addPredmet(param){
    var naziv = this.naziv.value;
    var bodovi = this.bodovi.value;
    var smer = this.smer.value;
    var smerOznaka = smer.split(',')[0].substring(7);
    if(param === 'add'){
      var predmet = new Predmet(null,naziv,null,null,null,null,new Smer(null,null,null,null,smerOznaka,null,null),
      bodovi,null,null);
      this._predmetService.addPredmet(predmet).subscribe(
        data =>{
          var predmet = data;
          //this._router.navigate(['predmeti-detail',predmet.id]);
          this._router.navigate(['predmeti']);
        },
        error =>{ 
          alert("Uneti predmet vec postoji u izabranom smeru!");
      }
      );
    }else if(param === 'edit'){
      var predmet = new Predmet(this.predmet.id,null,null,null,null,null,null,bodovi,null,null);
      this._predmetService.updatePredmet(predmet).subscribe(
        response => {
          alert('Izmena uspesna! ');
          this.getPredmetByIdAndSetValues(this.addEditParam);
          this._router.navigate(['predmeti']);
        },
        error => {
          alert('Doslo je do greske!');
        }

      );
    }
  }


  get smer() {
    return this.addEditForm.get('smer')  as FormArray;
  }
  get naziv() {
    return this.addEditForm.get('naziv');
  }
  get bodovi() {
    return this.addEditForm.get('bodovi');
  }

}
