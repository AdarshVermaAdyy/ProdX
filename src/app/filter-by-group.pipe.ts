import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByGroup',
  standalone: true
})
export class FilterByGroupPipe implements PipeTransform {

  transform(options:any[], group:any) {
    return options.filter(option=> option.group === group);
  }

}
