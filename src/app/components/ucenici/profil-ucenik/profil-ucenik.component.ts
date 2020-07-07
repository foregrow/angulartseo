import { Korisnik } from './../../../model/korisnik';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-ucenik',
  templateUrl: './profil-ucenik.component.html',
  styleUrls: ['./profil-ucenik.component.css']
})
export class ProfilUcenikComponent implements OnInit{

  korisnickoImeParam;
  korisnik;
  editForm: FormGroup;
  cekiran = false;
  
  constructor(private _korisnikService: KorisnikService,
    private _ucenikService: UcenikService,
    private _router: Router, private _route:ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  this.korisnickoImeParam = this._korisnikService.getLoggedInUserKorIme();
  
  this._ucenikService.getByKorisnickoIme(this.korisnickoImeParam)
  .subscribe(
    data => {
     this.korisnik = data
    }
  )

    this.editForm = this.fb.group({
      lozinka: ['',Validators.required],
      lozinkaPonovljena: ['',Validators.required]
    });



  }

  onKey(event) {
    const inputValue = event.target.value;
    if (inputValue != ''){
      this.cekiran = true;
    } if (inputValue == ''){
      this.cekiran = false;
    }
  }


  updatePassword(){
    var lozinka = this.lozinka.value;
    var lozinkaPonovljena = this.lozinkaPonovljena.value;
    var id = this.korisnik.id;
    if(lozinka != lozinkaPonovljena){
      alert('Lozinke se ne poklapaju !')
    } else {
      var korisnik: Korisnik = new Korisnik(+id,null,lozinka,null,null,null);
      this._korisnikService.updateKorisnik(korisnik)
      .subscribe(
        response =>{
          alert('Uspesna izmena lozinke! ');
          this._router.navigate(['ucenik']);
        },
        error => {
          alert('Doslo je do greske');
        }
      );
    }
  }

  get lozinka(){
    return this.editForm.get('lozinka');
  }
  get lozinkaPonovljena(){
    return this.editForm.get('lozinkaPonovljena');
  }




}
