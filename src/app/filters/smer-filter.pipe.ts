import { PipeTransform, Pipe } from '@angular/core';
import { Smer } from '../model/smer';

@Pipe({
    name: 'smerFilter'
})
export class SmerFilterPipe implements PipeTransform{
    transform(smerovi: Smer[],searchTerm:any,searchTerm2:any): any[]{
        if(!smerovi || (!searchTerm && !searchTerm2)){
            return smerovi;
        }
        if(searchTerm && !searchTerm2){
            return smerovi.filter(o => 
                (o.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ));
        }else if(!searchTerm && searchTerm2){
            return smerovi.filter(o => 
                (o.nastavnik.ime.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1) ||
                (o.nastavnik.prezime.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2){
            return smerovi.filter(o => 
                (o.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ) &&
                ((o.nastavnik.ime.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1) ||
                (o.nastavnik.prezime.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)));
        }
    }
    
}