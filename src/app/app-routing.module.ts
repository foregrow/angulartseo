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

import { SmerAddComponent } from './components/smerovi/smer-add/smer-add.component';
import { SmerDetailComponent } from './components/smerovi/smer-detail/smer-detail.component';
import { NastavniciDetailComponent } from './components/nastavnici/nastavnici-detail/nastavnici-detail.component';
import { NastavniciAddComponent } from './components/nastavnici/nastavnici-add/nastavnici-add.component';
import { UceniciDetailComponent } from './components/ucenici/ucenici-detail/ucenici-detail.component';
import { UceniciAddComponent } from './components/ucenici/ucenici-add/ucenici-add.component';
const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    
    {path: 'ucenik', component: UcenikComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_UCENIK']
      }},
    {path: 'nastavnik', component: NastavnikComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_NASTAVNIK']
      }},

    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard,RoleGuard],
    data: {
        roles: ['ROLE_ADMIN']
      }},
    

    {path: 'korisnici', component: KorisniciComponent, canActivate: [AuthGuard]},
    {path: 'korisnici-detail/:id', component: KorisniciDetailComponent, canActivate: [AuthGuard]},
    {path: 'korisnici-add', component: KorisniciAddComponent, canActivate: [AuthGuard]},
    
    {path: 'nastavnici', component: NastavniciComponent, canActivate: [AuthGuard]},
    {path: 'nastavnici-detail/:id', component: NastavniciDetailComponent, canActivate: [AuthGuard]},
    {path: 'nastavnici-add', component: NastavniciAddComponent, canActivate: [AuthGuard]},

    {path: 'ucenici', component: UceniciComponent, canActivate: [AuthGuard]},
    {path: 'ucenici-detail/:id', component: UceniciDetailComponent, canActivate: [AuthGuard]},
    {path: 'ucenici-add', component: UceniciAddComponent, canActivate: [AuthGuard]},

    {path: 'smerovi', component: SmeroviComponent, canActivate: [AuthGuard]},
    {path: 'smerovi-detail/:id', component: SmerDetailComponent, canActivate: [AuthGuard]},
    {path: 'smerovi-add', component: SmerAddComponent, canActivate: [AuthGuard]},
    
    {path: 'predmeti', component: PredmetiComponent, canActivate: [AuthGuard]},
    {path: 'ispiti', component: IspitiComponent, canActivate: [AuthGuard]},

    {path: 'profil-ucenik', component: ProfilUcenikComponent, canActivate: [AuthGuard,RoleGuard],
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
      }}
    
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}

export const routingComponents = [LoginComponent,
UcenikComponent, NastavnikComponent, AdminComponent, 
KorisniciComponent,NastavniciComponent,NastavniciDetailComponent,NastavniciAddComponent,UceniciComponent,
SmeroviComponent,PredmetiComponent,IspitiComponent,SmerAddComponent,SmerDetailComponent,
KorisniciDetailComponent,KorisniciAddComponent,
ProfilUcenikComponent,FinansijskaKarticaComponent,PolozeniIspitiComponent,NepolozeniIspitiComponent,PrijavaIspitaComponent,
UceniciAddComponent,UceniciDetailComponent]