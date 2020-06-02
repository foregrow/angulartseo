import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KorisnikService } from 'src/app/services/korisnik.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnik;
  ngOnInit(){
  
  }
  constructor(private fb: FormBuilder,
    private _korisnikService: KorisnikService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router){}

  loginForm = this.fb.group({
  korisnickoIme: [''],
  lozinka: ['']
  });

  submitLogin(){
    // console.log(this.loginForm.value);
    this._korisnikService.login(this.loginForm.value)
    .subscribe(
    response => {
    // console.log('Success!', response)
    localStorage.setItem('jwt',response.jwt)
    localStorage.setItem('role',response.uloga)
    this._korisnikService.getRedirectedFromLogin(response.uloga),
    error => console.error('Error!', error)
    });
  }



}
