import { Ispit } from './ispit';

export class IspitniRok{
    id: number;
    nazivRoka: any; //enum
    pocetakRoka: any; //long
    krajRoka: any; //long
    ispiti: Ispit[] = [];

    constructor(id: number,nazivRoka:any,pocetakRoka:any,
        krajRoka:any, ispiti:Ispit[]){
        this.id = id;
        this.nazivRoka = nazivRoka;
        this.pocetakRoka = pocetakRoka;
        this.krajRoka = krajRoka;
        this.ispiti = ispiti;
    }
}