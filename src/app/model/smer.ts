import { Nastavnik } from './nastavnik';
import { Ucenik } from './ucenik';
import { Predmet } from './predmet';

export class Smer{
    id: number;
    naziv: string;
    brojECTSBodova: number;
    oznakaSmera: string;
    nastavnik: Nastavnik;
    ucenici: Ucenik[] = [];
    predmeti: Predmet[] = [];

    constructor(id: number,naziv:string,bodovi:number,nastavnik:Nastavnik,oznakaSmera: string,
        ucenici:Ucenik[],predmeti:Predmet[]){
        this.id = id;
        this.naziv = naziv;
        this.brojECTSBodova = bodovi;
        this.nastavnik = nastavnik;
        this.ucenici = ucenici;
        this.predmeti = predmeti;
        this.oznakaSmera = oznakaSmera;
    }
}