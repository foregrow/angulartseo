import { PipeTransform, Pipe } from '@angular/core';
import { Smer } from '../model/smer';
import { Ispit } from '../model/ispit';

@Pipe({
    name: 'polozeniFilter'
})
export class polozeniFilterPipe implements PipeTransform{
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
                (o.predmet.brojECTSBodova.toString().indexOf(searchTerm3) !== -1));
        }
    }
    
}