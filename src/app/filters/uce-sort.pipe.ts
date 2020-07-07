import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { Ucenik } from '../model/ucenik';

@Pipe({ name: 'uceSortBy' })
export class UcenikSortByPipe implements PipeTransform {
  public transform(value: Ucenik[], order = '', column: string = ''): Ucenik[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }
}