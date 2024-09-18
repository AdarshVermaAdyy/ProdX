import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupNamePipe',
  standalone: true
})
export class GroupNamePipePipe implements PipeTransform {

  transform(value: string): unknown {
     if(!value) return value;
      let formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
      const regex = /([A-Z])/g;
      formattedValue = formattedValue.replace(regex, ` $1`);

      // if(formattedValue.length > 15){
      //   formattedValue = formattedValue.slice(0, 15) + ' ' + formattedValue.slice(15);
      // }
      return formattedValue;
  }

}
