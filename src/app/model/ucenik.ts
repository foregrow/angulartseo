import { Smer } from './smer';
import { FinansijskaKartica } from './finansijskakartica';
import { Korisnik } from './korisnik';
import { Dokument } from './dokument';
import { Predmet } from './predmet';
import { Ispit } from './ispit';

export class Ucenik{
    
    id: number;
    ime: string;
    prezime: string;
    index: string;
    godinaUpisa: number;
    godinaStudija: number;
    smer: Smer;
    kartica: FinansijskaKartica;
    korisnik: Korisnik;
    dokumenti: Dokument[] = [];
    predmeti: Predmet[] = [];
    ispiti: Ispit[] = [];
    drzavaRodjenja: string;
    mestoRodjenja: string;
    datumRodjenja: any;
    pol: string;
    nacinFinansiranja: string;
    email: string;
    adresa: string;
    ukupnoECTSBodova: number;
    prosecnaOcena: number;
    redniBrojUpisa: string;

    constructor(id: number,ime:string,prezime:string,
        index:string,godinaUpisa:number,godinaStudija:number,
        smer:Smer,kartica:FinansijskaKartica,korisnik:Korisnik,
        dokumenti:Dokument[],predmeti:Predmet[],ispiti:Ispit[],
        drzavaRodjenja: string,mestoRodjenja: string,datumRodjenja: any,pol: string,
        nacinFinansiranja: string,email: string,adresa: string,ukupnoECTSBodova: number,prosecnaOcena: number,
        redniBrojUpisa:string){
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.index = index;
        this.godinaUpisa = godinaUpisa;
        this.godinaStudija = godinaStudija;
        this.smer = smer;
        this.kartica = kartica;
        this.korisnik = korisnik;
        this.dokumenti = dokumenti;
        this.predmeti = predmeti;
        this.ispiti = ispiti;
        this.drzavaRodjenja = drzavaRodjenja;
        this.mestoRodjenja = mestoRodjenja;
        this.datumRodjenja = datumRodjenja;
        this.pol = pol;
        this.nacinFinansiranja = nacinFinansiranja;
        this.email = email;
        this.adresa = adresa;
        this.ukupnoECTSBodova = ukupnoECTSBodova;
        this.prosecnaOcena = prosecnaOcena;
        this.redniBrojUpisa = redniBrojUpisa;
    }
}