import { PipeTransform, Pipe } from '@angular/core';
import { Smer } from '../model/smer';
import { Ispit } from '../model/ispit';

@Pipe({
    name: 'istorijaFilter'
})
export class istorijaFilterPipe implements PipeTransform{
    transform(ispiti: Ispit[],searchTerm:any,searchTerm2:any,searchTerm3:any): any[]{
        if(!ispiti || (!searchTerm && !searchTerm2)){
            return ispiti;
        }
        if(searchTerm && !searchTerm2 && !searchTerm3){
            return ispiti.filter(o => 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2 && !searchTerm3){
            return ispiti.filter(o => 
                (o.ocena.toString().indexOf(searchTerm2) !== -1));
        }else if(!searchTerm && !searchTerm2 && searchTerm3){
            return ispiti.filter(o => 
                (o.ispitniRok.nazivRoka.toLowerCase().indexOf(searchTerm3.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2 && searchTerm3){
            return ispiti.filter(o => 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
                (o.ocena.toString().indexOf(searchTerm2)) &&
                 (o.ispitniRok.nazivRoka.toLowerCase().indexOf(searchTerm3.toLowerCase()) !== -1));
        }
    }
    
}