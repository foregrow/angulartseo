import { Korisnik } from './korisnik';
import { Smer } from './smer';
import { Predmet } from './predmet';

export class Nastavnik{
    id: number;
    ime: string;
    prezime: string;
    email: string;
    uloga: any; //enum
    korisnik: Korisnik;
    smer: Smer;
    predmeti: Predmet[] = [];

    constructor(id: number,ime:string,prezime:string,email:string,
        uloga:any, korisnik:Korisnik,smer:Smer,predmeti:Predmet[]){
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.uloga = uloga;
        this.korisnik = korisnik;
        this.smer = smer;
        this.predmeti = predmeti;
    }
}