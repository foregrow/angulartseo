import { PipeTransform, Pipe } from '@angular/core';
import { Korisnik } from '../model/korisnik';

@Pipe({
    name: 'korFilter'
})
export class KorisnikFilterPipe implements PipeTransform{
    transform(korisnici: Korisnik[], searchTerm: string): Korisnik[]{
        if(!korisnici || !searchTerm){
            return korisnici;
        }
        return korisnici.filter(o => 
            o.korisnickoIme.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 || 
            o.uloga.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
    
}