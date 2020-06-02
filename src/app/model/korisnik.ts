import { Ucenik } from './ucenik';
import { Nastavnik } from './nastavnik';

export class Korisnik{
    id: number;
    korisnickoIme: string;
    lozinka: string;
    uloga: any; //enum
    ucenik: Ucenik;
    nastavnik: Nastavnik;

    constructor(korisnickoIme:string,lozinka:string,
        uloga:any, ucenik: Ucenik,nastavnik:Nastavnik){
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
        this.uloga = uloga;
        this.ucenik = ucenik;
        this.nastavnik = nastavnik;
    }
}