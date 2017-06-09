import { Directive, ElementRef, Renderer, OnInit, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[parallax]'
})
export class ParralaxDirective {
  nativeElem : any;
  ticking : boolean;
  height : number;
  offsetTopElem : number;
  xd = 1;
  offYsaved : number;
  constructor(public element : ElementRef, public renderer : Renderer) { 
  }
@Input('parallax-backgroundPositionY') backgroundPositionY : number;
@Input('parallax-speed') speed : number;
ngOnInit() {
	this.nativeElem = this.element.nativeElement;
	this.height = this.element.nativeElement.clientHeight;
	this.offsetTopElem = this.element.nativeElement.offsetTop;
	console.log(this.element.nativeElement.style.backgroundPositionY);
}
@HostListener('document: scroll', ['$event'])
onScroll(e) {
	this.backgroundPositionY = Number(this.backgroundPositionY)
	let offY = window.pageYOffset;

	if(offY < this.offsetTopElem + this.height) {
		if(offY>this.offYsaved) {
			this.backgroundPositionY = Number(this.backgroundPositionY - 1*this.speed);
		} else {
			this.backgroundPositionY = Number(this.backgroundPositionY + 1*this.speed);
		}

		window.requestAnimationFrame(()=> {
			this.renderer.setElementStyle(this.nativeElem, 'backgroundPositionY', this.backgroundPositionY + '%');
			
		}) 


		this.offYsaved = offY;
	}
}
}
