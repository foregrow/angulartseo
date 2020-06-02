import { Ucenik } from './ucenik';

export class Dokument{
    id: number;
    naziv: string;
    tip: string;
    path: string;
    ucenik: Ucenik;

    constructor(id: number,naziv:string,tip:string,
        path:string,ucenik:Ucenik){
        this.id = id;
        this.naziv = naziv;
        this.tip = tip;
        this.path = path;
        this.ucenik = ucenik;
    }
}