import { PipeTransform, Pipe } from '@angular/core';
import { Ispit } from '../model/ispit';

@Pipe({
    name: 'ispitFilter'
})
export class IspitFilterPipe implements PipeTransform{
    transform(ispiti: Ispit[],searchTerm:any,searchTerm2:any,searchTerm3:any): any[]{
        if(!ispiti || (!searchTerm && !searchTerm2 && !searchTerm3)){
            return ispiti;
        }
        if(searchTerm && !searchTerm2 && !searchTerm3){
            return ispiti.filter(o => 
                (o.ucenik.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.ucenik.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) || 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.smer.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
        }else if(!searchTerm && searchTerm2  && !searchTerm3){
            return ispiti.filter(o => 
                (new Date(searchTerm2) === new Date(o.datumPolaganja)) ||
                (new Date(searchTerm2) === new Date(o.datumPrijave)));
        }else if(!searchTerm && !searchTerm2  && searchTerm3){
            return ispiti.filter(o => 
                (o.ocena.toString().indexOf(searchTerm3) !== -1));
        }else if(searchTerm && searchTerm2  && !searchTerm3){
            return ispiti.filter(o => 
                ((o.ucenik.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.ucenik.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) || 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.smer.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)) &&
                (((new Date(searchTerm2) === new Date(o.datumPolaganja)) ||
                (new Date(searchTerm2) === new Date(o.datumPrijave)))));
        }else if(searchTerm && !searchTerm2  && searchTerm3){
            return ispiti.filter(o => 
                ((o.ucenik.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
                o.ucenik.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) || 
                (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
                (o.predmet.smer.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)) &&
                (o.ocena.toString().indexOf(searchTerm3) !== -1));
        }else if(!searchTerm && searchTerm2  && searchTerm3){
            return ispiti.filter(o => 
                ((new Date(searchTerm2) === new Date(o.datumPolaganja) ||
                (new Date(searchTerm2) === new Date(o.datumPrijave)) &&
                (o.ocena.toString().indexOf(searchTerm3) !== -1))));
        }else if(searchTerm && searchTerm2  && searchTerm3){
            o => 
            ((o.ucenik.ime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
            (o.ucenik.prezime.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) || 
            (o.predmet.naziv.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
            (o.predmet.smer.oznakaSmera.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) &&
            ((new Date(searchTerm2) === new Date(o.datumPolaganja) ||
                (new Date(searchTerm2) === new Date(o.datumPrijave)) &&
                (o.ocena.toString().indexOf(searchTerm3) !== -1))));
        }
    }
    
}