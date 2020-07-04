import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

import { UcenikComponent } from './components/ucenik/ucenik.component';
import { NastavnikComponent } from './components/nastavnik/nastavnik.component';
import { AdminComponent } from './components/admin/admin.component';

import { PredmetiComponent } from './components/predmeti/predmeti.component';
import { KorisniciComponent } from './components/korisnici/korisnici.component';
import { NastavniciComponent } from './components/nastavnici/nastavnici.component';
import { UceniciComponent } from './components/ucenici/ucenici.component';
import { SmeroviComponent } from './components/smerovi/smerovi.component';
import { IspitiComponent } from './components/ispiti/ispiti.component';

import { KorisniciDetailComponent } from './components/korisnici/korisnici-detail/korisnici-detail.component';
import { RoleGuard } from './role.guard';
import { KorisniciAddComponent } from './components/korisnici/korisnici-add/korisnici-add.component';
import { ProfilUcenikComponent } from './components/ucenici/profil-ucenik/profil-ucenik.component';
import { FinansijskaKarticaComponent } from './components/finansijska-kartica/finansijska-kartica.component';
import { PolozeniIspitiComponent } from './components/ispiti/polozeni-ispiti/polozeni-ispiti.component';
import { NepolozeniIspitiComponent } from './components/ispiti/nepolozeni-ispiti/nepolozeni-ispiti.component';
import { PrijavaIspitaComponent } from './components/ispiti/prijava-ispita/prijava-ispita.component';

import { SmerDetailComponent } from './components/smerovi/smer-detail/smer-detail.component';
import { NastavniciDetailComponent } from './components/nastavnici/nastavnici-detail/nastavnici-detail.component';
import { NastavniciAddComponent } from './components/nastavnici/nastavnici-add/nastavnici-add.component';
import { UceniciDetailComponent } from './components/ucenici/ucenici-detail/ucenici-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PredmetiDetailComponent } from './components/predmeti/predmeti-detail/predmeti-detail.component';
import { IspitniRokoviComponent } from './components/ispitni-rokovi/ispitni-rokovi.component';
import { IspitniRokoviDetailComponent } from './components/ispitni-rokovi/ispitni-rokovi-detail/ispitni-rokovi-detail.component';
import { KolokvijumUpisComponent } from './components/kolokvijum-upis/kolokvijum-upis.component';
import { IstorijaPolaganjaComponent } from './components/ispiti/istorija-polaganja/istorija-polaganja.component';
import { SpisakUplataComponent } from './components/ucenici/spisak-uplata/spisak-uplata.component';
import { IspitUpisComponent } from './components/ispiti/ispit-upis/ispit-upis.component';
const routes: Routes = [
    {path: '', redirectTo: 'ucenik', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    
    {path: 'ucenik', component: UcenikComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'nastavnik', component: NastavnikComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_NASTAVNIK','ROLE_ASISTENT','ROLE_DEMONSTRATOR']
      }},

    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    

    {path: 'korisnici', component: KorisniciComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    {path: 'korisnici-detail/:id', component: KorisniciDetailComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    {path: 'korisnici-add', component: KorisniciAddComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    
    {path: 'nastavnici', component: NastavniciComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    {path: 'nastavnici-detail/:id', component: NastavniciDetailComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN','ROLE_NASTAVNIK','ROLE_ASISTENT','ROLE_DEMONSTRATOR']
      }},
    {path: 'nastavnici-add', component: NastavniciAddComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},

    {path: 'ucenici', component: UceniciComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    {path: 'ucenici-detail/:id', component: UceniciDetailComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},

    {path: 'smerovi', component: SmeroviComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    {path: 'smerovi-detail/:id', component: SmerDetailComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    
    {path: 'predmeti', component: PredmetiComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
      {path: 'predmeti-detail/:id', component: PredmetiDetailComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
          roles: ['ROLE_ADMIN']
        }},
          
      {path: 'kolokvijum-upis', component: KolokvijumUpisComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
          roles: ['ROLE_ASISTENT']
        }},

      {path: 'ispiti', component: IspitiComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
        roles: ['ROLE_ADMIN']
      }},
      {path: 'ispit-upis', component: IspitUpisComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
        roles: ['ROLE_NASTAVNIK']
      }},
      {path: 'istorija-polaganja', component: IstorijaPolaganjaComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
        roles: ['ROLE_UCENIK']
      }},

      {path: 'ispitniRokovi', component: IspitniRokoviComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
        roles: ['ROLE_ADMIN']
      }},
      {path: 'ispitniRokovi-detail/:id', component: IspitniRokoviDetailComponent, canActivate: [AuthGuard,RoleGuard],
      data: {
        roles: ['ROLE_ADMIN']
      }},

    {path: 'profil-ucenik', component: ProfilUcenikComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
      {path: 'spisak-uplata', component: SpisakUplataComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'finansijska-kartica', component: FinansijskaKarticaComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'polozeni-ispiti', component: PolozeniIspitiComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'nepolozeni-ispiti', component: NepolozeniIspitiComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'prijava-ispita', component: PrijavaIspitaComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'not-found', component: PageNotFoundComponent},
      {path: '**', redirectTo: 'ucenik', pathMatch: 'full'},
    
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}

export const routingComponents = [PageNotFoundComponent,LoginComponent,
UcenikComponent, NastavnikComponent, AdminComponent, 
KorisniciComponent,NastavniciComponent,NastavniciDetailComponent,NastavniciAddComponent,UceniciComponent,
SmeroviComponent,PredmetiComponent,IspitiComponent,SmerDetailComponent,
KorisniciDetailComponent,KorisniciAddComponent,
ProfilUcenikComponent,FinansijskaKarticaComponent,PolozeniIspitiComponent,NepolozeniIspitiComponent,PrijavaIspitaComponent,
UceniciDetailComponent,PredmetiDetailComponent,IspitniRokoviComponent,IspitniRokoviDetailComponent,
KolokvijumUpisComponent, IstorijaPolaganjaComponent,SpisakUplataComponent,IspitUpisComponent]