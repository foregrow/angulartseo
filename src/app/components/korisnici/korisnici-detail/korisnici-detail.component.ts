import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { Korisnik } from 'src/app/model/korisnik';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-korisnici-detail',
  templateUrl: './korisnici-detail.component.html',
  styleUrls: ['./korisnici-detail.component.css']
})
export class KorisniciDetailComponent implements OnInit {

  public korisnik;
  id;
  addEditForm: FormGroup;
  addEditParam;
 


  //public id;
  constructor(
    private _route: ActivatedRoute,
    public _korisnikService:KorisnikService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {


    this.addEditForm = this.fb.group({
      korisnickoIme: ['',Validators.required],
      lozinka: ['',Validators.required],
      uloge: ['',Validators.required],
      ime: ['',Validators.required ],
      prezime: ['',Validators.required ]
    })
    this.addEditParam = this._route.snapshot.paramMap.get('id');
   
      this.addEditForm.controls['korisnickoIme'].disable();
      this.addEditForm.controls['uloge'].disable();
      this.addEditForm.controls['ime'].disable();
      this.addEditForm.controls['prezime'].disable();
      this.getByIdAndSetValues(this.addEditParam);
    
  }

  getByIdAndSetValues(id){
    this._korisnikService.getById(id).subscribe(
      data => {
        this.korisnik = data;
        var uloga;
        var ime;
        var prezime;

        if(this.korisnik.uloga === 'ROLE_ADMIN'){
          uloga = 'admin'
        }else if(this.korisnik.ucenik !== undefined && this.korisnik.ucenik !== null && this.korisnik.ucenik.id !== 0){
          uloga = 'ucenik'
        }else if(this.korisnik.nastavnik !== undefined && this.korisnik.nastavnik !== null && this.korisnik.nastavnik !== 0){
          uloga = 'nastavnik'
        }


      if(this.korisnik.ucenik !== undefined && this.korisnik.ucenik !== null && this.korisnik.ucenik.id !== 0){
        ime = this.korisnik.ucenik.ime
      }else if(this.korisnik.nastavnik !== undefined && this.korisnik.nastavnik !== null && this.korisnik.nastavnik !== 0){
        ime = this.korisnik.nastavnik.ime
      }

      if(this.korisnik.ucenik !== undefined && this.korisnik.ucenik !== null && this.korisnik.ucenik.id !== 0){
        prezime = this.korisnik.ucenik.prezime
      }else if(this.korisnik.nastavnik !== undefined && this.korisnik.nastavnik !== null && this.korisnik.nastavnik !== 0){
        prezime = this.korisnik.nastavnik.prezime
      }



        this.addEditForm.patchValue({
          korisnickoIme: this.korisnik.korisnickoIme,
          //lozinka: this.korisnik.lozinka,
          uloge: uloga,
          ime: ime,
          prezime: prezime
        })
      }
    )
  }

  submitKorisnik(){

    var lozinka = this.lozinka.value;

    var kor = new Korisnik(this.korisnik.id,null, lozinka,null,null,null);
    
    this._korisnikService.updateKorisnik(kor).subscribe(
      response => {
        this.getByIdAndSetValues(this.addEditParam);
      },
      error => {
        alert('Doslo je do greske');
      }
    )
  }

  goBackToKorisnici(){
    let selectedId = this.id ? this.id : null;
    this.router.navigate(["/korisnici"]);
  }

  getById(id){
    this._korisnikService.getById(id).subscribe(
       data => {
         this.korisnik = data;
         console.log(this.korisnik);
       });
   }

   get korisnickoIme() {
    return this.addEditForm.get('korisnickoIme');
  }

  get lozinka() {
    return this.addEditForm.get('lozinka');
  }

  get uloge() {
    return this.addEditForm.get('uloge');
  }

  get ime() {
    return this.addEditForm.get('ime');
  }

  get prezime() {
    return this.addEditForm.get('prezime');
  }
}
