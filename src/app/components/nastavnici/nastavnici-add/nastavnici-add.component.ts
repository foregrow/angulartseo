import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { Nastavnik } from 'src/app/model/nastavnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nastavnici-add',
  templateUrl: './nastavnici-add.component.html',
  styleUrls: ['./nastavnici-add.component.css']
})
export class NastavniciAddComponent implements OnInit {

  addForm: FormGroup;
  emailExists = false;
  ulogaChosen = false;
  nastavniciEmailovi: string[] = [];
  ulogeArray = ['PROFESOR','ASISTENT','DEMONSTRATOR']
  constructor(private fb: FormBuilder,private _nastavnikService: NastavnikService,
    private _router: Router) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      ime: ['',Validators.required],
      prezime: ['',Validators.required],
      email: ['',Validators.required],
      uloge: [this.fb.array(this.ulogeArray)],
    });
    this.getAllEmailovi();
    this.email.valueChanges.subscribe(data =>
      {
        this.existingEmail();
      }
    )
  }

  existingEmail(){
    if(this.nastavniciEmailovi.includes(this.email.value))
      this.emailExists = true;
    else
    this.emailExists = false;
    
  }
  chosenUloga(){
    if(this.ulogeArray.includes(this.uloge.value))
      this.ulogaChosen = true;
    else
      this.ulogaChosen = false;
  }
  getAllEmailovi(){
    this._nastavnikService.getNastavnici()
      .subscribe(
        data => {
          var nastavnici;
          nastavnici = data
          for (var i = 0; i < nastavnici.length; i++) {
            this.nastavniciEmailovi.push(nastavnici[i].email);
            
          }  
        });
  }

  addNastavnik(){
    var ime =this.ime.value;
    var prezime =this.prezime.value;
    var uloga =this.uloge.value;
    var email =this.email.value;
    var nas: Nastavnik = new Nastavnik(null,ime,prezime,email,uloga,null,null,null);
    this._nastavnikService.addNastavnik(nas)
    .subscribe(
      data =>{
        this._router.navigate(['nastavnici']);
      }
    );
  }

  get ime() {
    return this.addForm.get('ime');
  }
  get prezime() {
    return this.addForm.get('prezime');
  }
  get email() {
    return this.addForm.get('email');
  }
  get uloge() {
    return this.addForm.get('uloge')  as FormArray;
  }

}
