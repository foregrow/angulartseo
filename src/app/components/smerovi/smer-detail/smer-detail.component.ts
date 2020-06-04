import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { SmerService } from 'src/app/services/smer.service';
import { Smer } from 'src/app/model/smer';

@Component({
  selector: 'app-smer-detail',
  templateUrl: './smer-detail.component.html',
  styleUrls: ['./smer-detail.component.css']
})
export class SmerDetailComponent implements OnInit {


  id;
  smer;
  constructor(private _route: ActivatedRoute,
    public korisnikService:KorisnikService,
    private router: Router,
    private _smerService: SmerService,
    ) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getById(this.id);
  }

  goBackToKorisnici(){
    let selectedId = this.id ? this.id : null;
    this.router.navigate(["/korisnici"]);
  }

  getById(id){
    this._smerService.getById(id).subscribe(
       data => {
         this.smer = data;
       });

   }

}
