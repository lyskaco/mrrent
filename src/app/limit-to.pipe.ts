import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: any, args: any): any {

    let newArr = value.split(' ').slice(0, args);
    return newArr;
  }

}
