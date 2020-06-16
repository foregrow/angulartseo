import { Ucenik } from './ucenik';
import { Smer } from './smer';
import { Kolokvijum } from './kolokvijum';
import { Ispit } from './ispit';
import { Nastavnik } from './nastavnik';

export class Predmet {
    id: number;
    naziv: string;
    brojECTSBodova: number;
    ucenici: Ucenik[] = [];
    nastavnici: Nastavnik[] = [];
    ispiti: Ispit[] = [];
    kolokvijumi: Kolokvijum[] = [];
    smerovi: Smer[] = [];

    constructor(id: number,naziv:string,ucenici:Ucenik[],
        nastavnici:Nastavnik[],ispiti:Ispit[],
        kolokvijumi:Kolokvijum[],smerovi:Smer[], brojECTSBodova:number){
        this.id = id;
        this.naziv = naziv;
        this.brojECTSBodova = brojECTSBodova;
        this.ucenici = ucenici;
        this.nastavnici = nastavnici;
        this.ispiti = ispiti;
        this.kolokvijumi = kolokvijumi;
        this.smerovi = smerovi;
    }
}