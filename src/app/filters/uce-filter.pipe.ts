import { PipeTransform, Pipe } from '@angular/core';
import { Ucenik } from '../model/ucenik';

@Pipe({
    name: 'uceFilter'
})
export class UcenikFilterPipe implements PipeTransform{
    transform(ucenici: Ucenik[],searchTerm:any,searchTerm2:any): any[]{
        if(!ucenici || (!searchTerm && !searchTerm2)){
            return ucenici;
        }
        if(searchTerm && !searchTerm2){
            return ucenici.filter(o => 
                (o.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.index.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2){
            return ucenici.filter(o => 
                (o.godinaUpisa.toString().indexOf(searchTerm2) !== -1)  ||
                (o.godinaStudija.toString().indexOf(searchTerm2) !== -1) ||
                (o.smer.naziv.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2){
            return ucenici.filter(o => 
                (o.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.index.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
                ((o.godinaUpisa.toString().indexOf(searchTerm2) !== -1) ||
                (o.godinaStudija.toString().indexOf(searchTerm2) !== -1) ||
                (o.smer.naziv.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)));
        }
    }
    
}