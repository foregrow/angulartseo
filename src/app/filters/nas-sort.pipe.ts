import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { Nastavnik } from '../model/nastavnik';

@Pipe({ name: 'nasSortBy' })
export class NastavnikSortByPipe implements PipeTransform {
  public transform(value: Nastavnik[], order = '', column: string = ''): Nastavnik[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }
}