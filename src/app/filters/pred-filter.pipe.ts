import { PipeTransform, Pipe } from '@angular/core';
import { Predmet } from '../model/predmet';

@Pipe({
    name: 'predFilter'
})
export class PredmetFilterPipe implements PipeTransform{
    transform(predmeti: Predmet[],searchTerm:any,searchTerm2:any): any[]{
        if(!predmeti || (!searchTerm && !searchTerm2)){
            return predmeti;
        }
        if(searchTerm && !searchTerm2){
            return predmeti.filter(o => 
                (o.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2){
            return predmeti.filter(o => 
                (o.smer.oznakaSmera.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1) ||
                (o.smer.naziv.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2){
            return predmeti.filter(o => 
                (o.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
                ((o.smer.oznakaSmera.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1) ||
                (o.smer.naziv.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)));
        }
    }
    
}