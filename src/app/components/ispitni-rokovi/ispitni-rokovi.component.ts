import { Component, OnInit } from '@angular/core';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ispitni-rokovi',
  templateUrl: './ispitni-rokovi.component.html',
  styleUrls: ['./ispitni-rokovi.component.css']
})
export class IspitniRokoviComponent implements OnInit {

  rokovi;
  constructor(
    private _ispitniRokService: IspitniRokService,
    private _activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._ispitniRokService.getAll().subscribe(
      data => { this.rokovi = data}
    )
  }
  navigateToAddRok(add){
    this.router.navigate(['ispitniRokovi-detail/',add]);
  }
  detaljiRoka(ir){
    this.router.navigate(['ispitniRokovi-detail/',ir.id]);
  }


}
