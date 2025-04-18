import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {

  transform(value: string): string {
    //logic --> return data
    return `onSale ${value} `;

  }

}
