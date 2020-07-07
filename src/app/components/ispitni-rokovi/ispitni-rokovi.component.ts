import { Component, OnInit } from '@angular/core';
import { IspitniRokService } from 'src/app/services/ispitni-rok.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ispitni-rokovi',
  templateUrl: './ispitni-rokovi.component.html',
  styleUrls: ['./ispitni-rokovi.component.css']
})
export class IspitniRokoviComponent implements OnInit {

  rokovi;
  searchTerm;
  searchTerm2
  field;
  order;
  constructor(
    private _ispitniRokService: IspitniRokService,
    private _activatedRoute: ActivatedRoute, 
    private router: Router,
    private datePipe: DatePipe) { }

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
  counter = 0;
  sort(param){
    if(param === 'nazivRoka'){
      this.field = 'nazivRoka'
    }else if(param === 'pocetakRoka'){
      this.field = 'pocetakRoka'
    }else if(param === 'krajRoka'){
      this.field = 'krajRoka'
    }
    if(this.counter === 0){
      //desc
      this.order = 'asc';
      this.counter = 1;
    }else if(this.counter === 1){
      //asc
      this.order = 'desc';
      this.counter = 0;
    }
  }

}
