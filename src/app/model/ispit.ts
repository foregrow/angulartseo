import { Predmet } from './predmet';
import { Ucenik } from './ucenik';
import { IspitniRok } from './ispitnirok';

export class Ispit{
    id: number;
    datumPolaganja: any; 
    datumPrijave: any; 
    ocena: number;
    bodoviTeorija: number;
    bodoviVezbe: number;
    polozen: boolean;
    cena: number;
    predmet: Predmet;
    ucenik: Ucenik;
    ispitniRok: IspitniRok;

    constructor(id: number,datumPolaganja:any,
        ocena:number,bodoviTeorija:number, bodoviVezbe:number,
        polozen:boolean,cena:number,predmet:Predmet,
        ucenik:Ucenik,ispitniRok:IspitniRok,datumPrijave: any){
        this.id = id;
        this.datumPolaganja = datumPolaganja;
        this.ocena = ocena;
        this.bodoviTeorija = bodoviTeorija;
        this.bodoviVezbe = bodoviVezbe;
        this.polozen = polozen;
        this.cena = cena;
        this.predmet = predmet;
        this.ucenik = ucenik;
        this.ispitniRok = ispitniRok;
        this.datumPrijave = datumPrijave;
    }
}