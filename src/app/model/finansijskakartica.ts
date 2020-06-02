import { Ucenik } from './ucenik';

export class FinansijskaKartica{
    id: number;
    brojKartice: string;
    suma: number;
    ucenik: Ucenik;

    constructor(id: number,brojKartice:string,
        suma:number,ucenik:Ucenik){
        this.id = id;
        this.brojKartice = brojKartice;
        this.suma = suma;
        this.ucenik = ucenik;
    }
}