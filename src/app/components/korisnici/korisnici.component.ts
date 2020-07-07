import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  public korisnici = [];
  searchTerm: string;
  korisnickoIme: string;
  constructor(
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.fetchData();

  }

  
  detaljiKorisnika(korisnik){
    var strId : string = String(korisnik.id);
    this.router.navigate(['korisnici-detail/'+strId]);
  }

  fetchData() {
    this._korisnikService.getAllKorisnici()
        .subscribe(data => this.korisnici = data);
}

  deleteKorisnik(id){
    if(id == 1){
      alert('Ne mozete izbrisati zeljenog korisnika!');
      return;
    }
    this._korisnikService.deleteKorisnik(id)
    .subscribe(
      data => this.korisnici = data
    );
    
  }

  navigateToAddKorisnik(){
    this.router.navigate(['korisnici-add']);
  }


}
