import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { Predmet } from '../model/predmet';

@Pipe({ name: 'predSortBy' })
export class PredmetSortByPipe implements PipeTransform {
  public transform(value: Predmet[], order = '', column: string = ''): Predmet[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }
}