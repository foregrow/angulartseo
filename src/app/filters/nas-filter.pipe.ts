import { PipeTransform, Pipe } from '@angular/core';
import { Nastavnik } from '../model/nastavnik';

@Pipe({
    name: 'nasFilter'
})
export class NastavnikFilterPipe implements PipeTransform{
    transform(nastavnici: Nastavnik[],searchTerm:string,searchTerm2:string): any[]{
        if(!nastavnici || (!searchTerm && !searchTerm2)){
            return nastavnici;
        }
        if(searchTerm && !searchTerm2){
            return nastavnici.filter(o => 
                (o.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2){
            return nastavnici.filter(o => 
                (o.email.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1) ||
                (o.uloga.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1));
        }else if(searchTerm && searchTerm2){
            return nastavnici.filter(o => 
                (searchTerm && o.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
                o.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
                (searchTerm2 && o.email.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1 ||
                (o.uloga.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)));
        }
    }
    
}