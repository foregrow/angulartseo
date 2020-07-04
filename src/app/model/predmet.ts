import { Ucenik } from './ucenik';
import { Smer } from './smer';
import { Kolokvijum } from './kolokvijum';
import { Ispit } from './ispit';
import { Nastavnik } from './nastavnik';

export class Predmet {
    id: number;
    naziv: string;
    brojECTSBodova: number;
    datumPolaganja: any;
    ucenici: Ucenik[] = [];
    nastavnici: Nastavnik[] = [];
    ispiti: Ispit[] = [];
    kolokvijumi: Kolokvijum[] = [];
    smer: Smer;
    profesor: Nastavnik;
    uceniciPrijaviliIspit: Ucenik[] = [];

    constructor(id: number,naziv:string,ucenici:Ucenik[],
        nastavnici:Nastavnik[],ispiti:Ispit[],
        kolokvijumi:Kolokvijum[],smer:Smer, brojECTSBodova:number,datumPolaganja:any,profesor:Nastavnik, uceniciPrijaviliIspit: Ucenik[]){
        this.id = id;
        this.naziv = naziv;
        this.brojECTSBodova = brojECTSBodova;
        this.ucenici = ucenici;
        this.nastavnici = nastavnici;
        this.ispiti = ispiti;
        this.kolokvijumi = kolokvijumi;
        this.smer = smer;
        this.datumPolaganja = datumPolaganja;
        this.profesor = profesor;
        this.uceniciPrijaviliIspit = uceniciPrijaviliIspit;
    }
}