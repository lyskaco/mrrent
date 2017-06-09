import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
export interface LoginCredentials {
	email : string,
	password : string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginCredentials : LoginCredentials = {
  	email : '',
  	password : ''
  }
  messageAfterSubmit : string;
  isLoading : boolean = false;
  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }


  login() {
  		let data = {
  			email: this.loginCredentials.email,
  			password: this.loginCredentials.password
  		}
      this.isLoading = true;
  		this.authService.login(data).subscribe(res=> {
        this.isLoading = false;
  			if(res.status === 200) {
          console.log(res);
  				let data = {
  					token : res.detail.token,
  					accountType : res.detail.accountType,
            id : res.detail.id
  				};

       		 	this.authService.changeLoginStatus(true);
        		this.authService.setUserObject(data);
      		} else {
            switch(res.status) {
                case 422: 
                  this.messageAfterSubmit = 'Niepoprawny email lub hasło.';
                  break;

            }
          }
  		})
  }
}
