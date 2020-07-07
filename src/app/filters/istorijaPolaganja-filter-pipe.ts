import { PipeTransform, Pipe } from '@angular/core';
import { Smer } from '../model/smer';
import { Ispit } from '../model/ispit';

@Pipe({
    name: 'istorijaFilter'
})
export class IstorijaFilterPipe implements PipeTransform{
    transform(ispiti: Ispit[],searchTerm:any,searchTerm2:any): any[]{
        if(!ispiti || (!searchTerm && !searchTerm2)){
            return ispiti;
        }
        if(searchTerm && !searchTerm2){
            return ispiti.filter(o => 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.profesor !== null && o.predmet.profesor.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.profesor !== null && o.predmet.profesor.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2){
            return ispiti.filter(o => 
                (o.ocena.toString().indexOf(searchTerm2) !== -1) ||
                (o.ispitniRok.nazivRoka.toString().toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2){
            return ispiti.filter(o => 
                ((o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.profesor.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.profesor.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)) &&
                ((o.ocena.toString().indexOf(searchTerm2) !== -1) ||
                (o.ispitniRok.nazivRoka.toString().toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)));
        }
    }
    
}