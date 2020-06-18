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
    setId(id: number){
        this.id = id;
    }
    setBrojKartice(brojKartice: string){
        this.brojKartice = brojKartice;
    }
    setSuma(suma: number){
        this.suma = suma;
    }
    setUcenik(ucenik: Ucenik){
        this.ucenik = ucenik;
    }
    setZiroRacun(ziroRacun: string){
        this.ziroRacun = ziroRacun;
    }
    setPozivNaBroj(pozivNaBroj: string){
        this.pozivNaBroj = pozivNaBroj;
    }
    setBrojModela(brojModela: string){
        this.brojModela = brojModela;
    }
}