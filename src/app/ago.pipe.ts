import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from "@angular/core";
@Pipe({
	name:'Ago',
	pure:false
})
export class AgoPipe implements PipeTransform, OnDestroy {
	private timer: number;
	constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
	transform(value:string) {
		this.removeTimer();
		let d = new Date(value);
		let now = new Date();
		let seconds = Math.round(Math.abs((now.getTime() - d.getTime())/1000));
		let timeToUpdate = this.getSecondsUntilUpdate(seconds) *1000;
		this.timer = this.ngZone.runOutsideAngular(() => {
			if (typeof window !== 'undefined') {
				return window.setTimeout(() => {
					this.ngZone.run(() => this.changeDetectorRef.markForCheck());
				}, timeToUpdate);
			}
			return null;
		});
		let minutes = Math.round(Math.abs(seconds / 60));
		let hours = Math.round(Math.abs(minutes / 60));
		let days = Math.round(Math.abs(hours / 24));
		let months = Math.round(Math.abs(days/30.416));
		let years = Math.round(Math.abs(days/365));
		if (seconds <= 10) {
			return 'teraz'
		}
		if (seconds <= 45) {
			return 'parę sekund temu';
		} else if (seconds <= 90) {
			return 'minutę temu';
		} else if (minutes <= 45) {
			if(Number(minutes.toString().split('')[0]) !== 1 && Number(minutes.toString().split('')[1]) >= 2 && Number(minutes.toString().split('')[1]) < 5){
				return minutes + ' minuty temu';
			} else if(minutes.toString().split('').length < 2 && Number(minutes.toString().split('')[0]) < 5){
				return minutes + ' minuty temu';
			}
			else {
				return minutes + ' minut temu';
			}
			
		} else if (minutes <= 90) {
			return ' godzinę temu';
		} else if (hours <= 22) {

			if(Number(hours.toString().split('')[0]) !== 1 && Number(hours.toString().split('')[1]) >= 2 && Number(hours.toString().split('')[1]) < 5){
				return hours + ' godziny temu';
			} else if(hours.toString().split('').length < 2 && Number(hours.toString().split('')[0]) < 5){
				return hours + ' godziny temu';
			}
			else {
				return hours + ' godzin temu';
			}

		} else if (hours <= 36) {
			return ' dzień temu';
		} else if (days <= 25) {
			
			return days + ' dni temu'
		} else if (days <= 45) {
			return 'miesiąc temu';
		} else if (days <= 345) {
			return months + ' miesięcy temu';
		} else if (days <= 545) {
			return 'rok temu';
		} else { // (days > 545)
			return years + ' lat temu';
		}
	}
	ngOnDestroy(): void {
		this.removeTimer();
	}
	private removeTimer() {
		if (this.timer) {
			window.clearTimeout(this.timer);
			this.timer = null;
		}
	}
	private getSecondsUntilUpdate(seconds:number) {
		let min = 60;
		let hr = min * 60;
		let day = hr * 24;
		if (seconds < min) { // less than 1 min, update ever 2 secs
			return 2;
		} else if (seconds < hr) { // less than an hour, update every 30 secs
			return 30;
		} else if (seconds < day) { // less then a day, update every 5 mins
			return 300;
		} else { // update every hour
			return 3600;
		}
	}
}