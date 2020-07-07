import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PredmetService } from './services/predmet.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { IspitniRokService } from './services/ispitni-rok.service';
import { DatePipe } from '@angular/common';
import { KolokvijumService } from './services/kolokvijum.service';
import { NanGuardGuard } from './nan-guard.guard';
import { KorisnikFilterPipe } from './filters/kor-filter.pipe';
import { KorisnikSortByPipe } from './filters/kor-sort.pipe';
import { NastavnikFilterPipe } from './filters/nas-filter.pipe';
import { NastavnikSortByPipe } from './filters/nas-sort.pipe';
import { UcenikFilterPipe } from './filters/uce-filter.pipe';
import { UcenikSortByPipe } from './filters/uce-sort.pipe';
import { SmerSortByPipe } from './filters/smer-sort-pipe';
import { SmerFilterPipe } from './filters/smer-filter.pipe';
import { PredmetSortByPipe } from './filters/pred-sort.pipe';
import { PredmetFilterPipe } from './filters/pred-filter.pipe';
import { IspitniRokFilterPipe } from './filters/irok-filter-pipe';
import { IspitniRokSortPipe } from './filters/irok-sort-pipe';
import { IspitFilterPipe } from './filters/ispit-filter.pipe';
import { IspitSortByPipe } from './filters/ispit-sort-pipe';
import { IstorijaFilterPipe } from './filters/istorijaPolaganja-filter-pipe';
import { polozeniFilterPipe } from './filters/polozeni-ispiti-filter-pipe';





//routingComponents = sve komponente
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    KorisnikFilterPipe,KorisnikSortByPipe,
    NastavnikFilterPipe,NastavnikSortByPipe,
    UcenikFilterPipe,UcenikSortByPipe,
    SmerSortByPipe,SmerFilterPipe,
    PredmetSortByPipe,PredmetFilterPipe,
    IspitniRokFilterPipe,IspitniRokSortPipe,
    IspitFilterPipe,IspitSortByPipe,
    IstorijaFilterPipe,polozeniFilterPipe


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [IstorijaFilterPipe,polozeniFilterPipe,
    IspitFilterPipe,IspitSortByPipe,
    IspitniRokFilterPipe,IspitniRokSortPipe,
    PredmetSortByPipe,PredmetFilterPipe,
    SmerSortByPipe,SmerFilterPipe,
    UcenikFilterPipe,UcenikSortByPipe,
    NastavnikFilterPipe,NastavnikSortByPipe,
    KorisnikFilterPipe,KorisnikSortByPipe,
    KolokvijumService,DatePipe,PredmetService,KorisnikService,AuthGuard,SmerService,FinansijskaKarticaService,IspitService,NastavnikService,PredmetService,UcenikService,IspitniRokService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true //za multiple interceptors ako su potrebni
  },RoleGuard,NanGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
