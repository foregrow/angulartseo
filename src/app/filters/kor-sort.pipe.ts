import { PipeTransform, Pipe } from '@angular/core';
import { Korisnik } from '../model/korisnik';

@Pipe({ name: 'sortBy' })
export class KorisnikSortPipe implements PipeTransform {

    transform(array: Korisnik[], field: string): Korisnik[] {
        if (!Array.isArray(array)) {
          return;
        }
        console.log(array);
        array.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
      }
}