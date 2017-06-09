import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentRoute : string = '';
  isTall : boolean = false;
  @ViewChild('footer') private footer: ElementRef;
  constructor(private _router : Router) { }

  ngOnInit() {
  	this.getCurrentRoute();
  }

  setTall() {

  	return new Promise((resolve, reject)=> {
  		this.isTall = !this.isTall;
  		this.scrollToBottom();
  		resolve(this.isTall);
  	})

  }
  checkIfTall() {

  	return new Promise((resolve, reject)=> {
  		resolve(this.isTall);
  	})

  }

  scrollToBottom(): void {
        this.footer.nativeElement.scrollTop = this.footer.nativeElement.scrollHeight;
    }
  getCurrentRoute() {
  	this._router.events.subscribe((res : any)=> {

  		this.currentRoute = res.url.replace('/',''); 
  		
  	})
  }
}
