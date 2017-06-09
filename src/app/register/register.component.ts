import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {MdIconRegistry} from '@angular/material';
import { Router } from '@angular/router';
export interface RegisterCredentials  {
	firstName : string,
	lastName : string,
	password : string,
	accountName : string,
	email : string,
	accountType : string,
  telephone : number
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading : boolean = false;
  messageAfterSubmit : string;
  registerCredentials : RegisterCredentials = {
  	firstName : '',
  	lastName: '',
  	password : '',
  	accountName : '',
  	email : '',
    telephone : null,
  	accountType : ''  // change
  }

  constructor(private router : Router, private authService : AuthService, mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
        
    }


  register() {
    this.isLoading = true;
  	this.authService.register(this.registerCredentials).subscribe(res=> {
  		this.isLoading = false;
      if(res.status === 200) {
  			let data = {
  					token : res.detail.data.token,
  					accountType : res.detail.data.accountType,
            id : res.detail.data.id
  				};
  			  this.authService.changeLoginStatus(true);
        	this.authService.setUserObject(data);
  		} else {
         switch(res.status) {
           case 409:
             this.messageAfterSubmit = 'Email istnieje już w naszej bazie';
             break;
         }
      }
  	})
  }
  ngOnInit() {
  }

}
