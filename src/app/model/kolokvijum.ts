import { Predmet } from './predmet';
import { Ucenik } from './ucenik';
import { Ispit } from './ispit';

export class Kolokvijum{
    id: number;
    bodovi: number;
    datumPolaganja: any; 
    predmet: Predmet;
    ucenik: Ucenik;
    ispit: Ispit;
    naziv: string;
    constructor(id: number,bodovi:number,datumPolaganja:any,
        predmet:Predmet,ucenik:Ucenik,ispit:Ispit, naziv: string){
        this.id = id;
        this.bodovi = bodovi;
        this.datumPolaganja = datumPolaganja;
        this.predmet = predmet;
        this.ucenik = ucenik;
        this.ispit = ispit;
        this.naziv = naziv;
    }
}