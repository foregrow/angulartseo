import { Predmet } from './predmet';
import { Ucenik } from './ucenik';
import { Ispit } from './ispit';

export class Kolokvijum{
    id: number;
    bodovi: number;
    datumPolaganja: any; //long u javi
    predmet: Predmet;
    ucenik: Ucenik;
    ispit: Ispit;
    constructor(id: number,bodovi:number,datumPolaganja:any,
        predmet:Predmet,ucenik:Ucenik,ispit:Ispit){
        this.id = id;
        this.bodovi = bodovi;
        this.datumPolaganja = datumPolaganja;
        this.predmet = predmet;
        this.ucenik = ucenik;
        this.ispit = ispit;
    }
}