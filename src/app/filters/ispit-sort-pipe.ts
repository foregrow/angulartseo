import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { Ispit } from '../model/ispit';

@Pipe({ name: 'ispitSortBy' })
export class IspitSortByPipe implements PipeTransform {
  public transform(value: Ispit[], order = '', column: string = ''): Ispit[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    return orderBy(value, [column], [order]);
  }
}