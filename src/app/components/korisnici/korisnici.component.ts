import { Component, OnInit } from '@angular/core';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { KorisnikSortByPipe } from 'src/app/filters/kor-sort.pipe';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  public korisnici = [];
  searchTerm: string;
  korisnickoIme: string;
  order:string;
  field:string;
  constructor(
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private router: Router,
              public korSortPipe: KorisnikSortByPipe) { }

  ngOnInit(): void {
    this.fetchData();

  }
  counterKorIme = 0;

  sort(param){
    if(param === 'korisnickoIme'){
      this.field = 'korisnickoIme';
    }else if(param === 'uloga'){
      this.field = 'uloga';
    }
    if(this.counterKorIme === 0){
      //desc
      this.order = 'asc';
      this.counterKorIme = 1;
    }else if(this.counterKorIme === 1){
      //asc
      this.order = 'desc';
      this.counterKorIme = 0;
    }
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
