import { Component, OnInit } from '@angular/core';
import { SmerService } from 'src/app/services/smer.service';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-smerovi',
  templateUrl: './smerovi.component.html',
  styleUrls: ['./smerovi.component.css']
})
export class SmeroviComponent implements OnInit {

  public smerovi = [];

  constructor(private _smerService: SmerService,
              public _korisnikService: KorisnikService,
              private _activatedRoute: ActivatedRoute, 
              private _router: Router) { }

  ngOnInit(): void {

    this._smerService.getSmerovi()
        .subscribe(data => this.smerovi = data);
  }

  navigateToAddSmer(){
    this._router.navigate(['smerovi-add'])
  }

  detaljiSmera(smer){
    var strId : string = String(smer.id);
    this._router.navigate(['smerovi-detail/'+strId]);
  }

  deleteSmer(id){
    this._smerService.deleteSmer(id)
    .subscribe(
      data => this.smerovi = data
    );
  }
}
