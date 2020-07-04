import { Ucenik } from './ucenik';

export class SpisakUplata{
    id: number;
    svrha: string;
    ucenik: Ucenik;
    suma: number;
    dodato: boolean;
    constructor(id: number,svrha:string,
        ucenik:Ucenik, suma: number, dodato: boolean){
        this.id = id;
        this.svrha = svrha;
        this.suma = suma;
        this.ucenik = ucenik;
        this.dodato = dodato;
    }
}