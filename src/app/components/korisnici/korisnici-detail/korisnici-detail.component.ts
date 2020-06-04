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
  //public id;
  constructor(
    private _route: ActivatedRoute,
    public _korisnikService:KorisnikService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getById(this.id);
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


}
