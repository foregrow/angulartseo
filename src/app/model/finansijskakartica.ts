import { Ucenik } from './ucenik';

export class FinansijskaKartica{
    //ziroRacun,pozivNaBroj,brojModela
    id: number;
    brojKartice: string;
    suma: number;
    ucenik: Ucenik;
    ziroRacun: string;
    pozivNaBroj: string;
    brojModela: string;
    constructor(id: number,brojKartice:string,
        suma:number,ucenik:Ucenik,ziroRacun: string,
        pozivNaBroj: string,brojModela: string){
        this.id = id;
        this.brojKartice = brojKartice;
        this.suma = suma;
        this.ucenik = ucenik;
        this.ziroRacun = ziroRacun;
        this.pozivNaBroj = pozivNaBroj;
        this.brojModela = brojModela;
    }
}