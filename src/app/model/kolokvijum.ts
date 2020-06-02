import { Predmet } from './predmet';

export class Kolokvijum{
    id: number;
    bodovi: number;
    datumPolaganja: any; //long u javi
    predmet: Predmet;

    constructor(id: number,bodovi:number,datumPolaganja:any,
        predmet:Predmet){
        this.id = id;
        this.bodovi = bodovi;
        this.datumPolaganja = datumPolaganja;
        this.predmet = predmet;
    }
}