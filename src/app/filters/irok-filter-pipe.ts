import { PipeTransform, Pipe } from '@angular/core';
import { IspitniRok } from '../model/ispitnirok';

@Pipe({
    name: 'irokFilter'
})
export class IspitniRokFilterPipe implements PipeTransform{
    transform(rokovi: IspitniRok[],searchTerm:any,searchTerm2:any): any[]{
        if(!rokovi || (!searchTerm && !searchTerm2)){
            return rokovi;
        }
        if(searchTerm && !searchTerm2){
            return rokovi.filter(o => 
                (o.nazivRoka.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2){
            return rokovi.filter(o => 
                (new Date(searchTerm2) <= new Date(o.krajRoka)) &&
                (new Date(searchTerm2) >= new Date(o.pocetakRoka)));
        }else if(searchTerm && searchTerm2){
            return rokovi.filter(o => 
                (o.nazivRoka.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
                ((new Date(searchTerm2) <= new Date(o.krajRoka)) &&
                (new Date(searchTerm2) >= new Date(o.pocetakRoka))));
        }else{
            return rokovi;
        }
    }
    
}