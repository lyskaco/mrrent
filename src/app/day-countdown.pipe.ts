import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayCountdown'
})
export class DayCountdownPipe implements PipeTransform {

  transform(value: any, offerDur: any): any {
    	let endDate = new Date(value),
        nowDate = new Date(),
        offerDuration = offerDur || 30;
    	endDate.setDate(endDate.getDate() + offerDuration);
    	let timeDiff = endDate.getTime() - nowDate.getTime();
    	let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    		if(diffDays === 1) {
    			return diffDays + ' dzień';
    		} else {
    			return diffDays + ' dni';
    		}

  }

}
