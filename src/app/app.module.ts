import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PredmetService } from './services/predmet.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { KorisnikService } from './services/korisnik.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RoleGuard } from './role.guard';
import { SmerService } from './services/smer.service';
import { FinansijskaKarticaService } from './services/finansijska-kartica.service';
import { IspitService } from './services/ispit.service';
import { NastavnikService } from './services/nastavnik.service';
import { UcenikService } from './services/ucenik.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

//routingComponents = sve komponente
@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [PredmetService,KorisnikService,AuthGuard,SmerService,FinansijskaKarticaService,IspitService,NastavnikService,PredmetService,UcenikService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true //za multiple interceptors ako su potrebni
  },RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
