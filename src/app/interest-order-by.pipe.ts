import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interestOrderBy'
})
export class InterestOrderByPipe implements PipeTransform {

  transform(value: any, arg: any): any {
  	let newArr = [];
    	switch (arg) {
    		case "ascending":
    			 newArr = value.sort((a, b)=> {
    				return a.rate - b.rate;
    			})
    			break;

    		case "descending":
    			 newArr = value.sort((a, b)=> {
    				return b.rate - a.rate;
    			})
    			break;
    		default:
    			 newArr = value.sort((a, b)=> {
    				return a.rate - b.rate;
    			})
    			break;
    	}
    return newArr;
  }

}
