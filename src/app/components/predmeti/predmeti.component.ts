import { Component, OnInit } from '@angular/core';
import { PredmetService } from 'src/app/services/predmet.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {

  public predmeti = [];
  
  

  constructor(private _predmetService: PredmetService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {
    this.getPredmeti();
   
  }

  getPredmeti(){
    this._predmetService.getPredmeti()
    .subscribe(
      data => {
      this.predmeti = data
    });
  }

  detaljiPredmeta(predmet){
    this._router.navigate(['predmeti-detail',predmet.id])
  }
  navigateToAdd(){
    this._router.navigate(['predmeti-detail','add'])

  }
  deletePredmet(id){
    this._predmetService.deletePredmet(id)
    .subscribe(
      data =>{
        this.predmeti = data;
      }
    )
  }

}
