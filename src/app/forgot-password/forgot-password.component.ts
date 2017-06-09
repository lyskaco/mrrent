import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  authToken : string;
  messageAfterSubmit : string;
  messageRestore : string;
  email : string;
  isLoading : boolean;
  isLoadingToken : boolean;
  constructor(private _route : ActivatedRoute, private _auth : AuthService, private _dialog : DialogService) { }

  sendToken() {
  	this.isLoadingToken = true;
  	let data = {
  		email : this.email
  	}
  	this._auth.forgotPasswordToken(data).subscribe(res => {
  		this.isLoadingToken = false;
  		if(res.status === 200) {
  			this.messageAfterSubmit = 'Email aktywacyjny został wysłany, sprawdź skrzynkę.';
  		} else if (res.detail.message === "Email doesn't exists in our system, please try to login") {
  			this.messageAfterSubmit = 'Email nie istnieje w naszej bazie';
  		}else{
  			this.messageAfterSubmit = 'Coś poszło nie tak';
  		}
  	})
  }

  sendNewPassword(token) {
  	this.isLoading = true;

  	if(token) {
  		let data = {
  			token : token
  		}
  		this._auth.forgotPasswordRestore(data).subscribe(res => {
  			this.isLoading = false;
  			if(res.status === 200) {
  				this.messageRestore = 'Nowe hasło zostało wysłane na skrzynkę pocztową.'
  			} else {
  				this.messageRestore = 'Niepoprawny token.'
  			}
  		})
  	}
  }
  getRestoreToken() {
  	return new Promise((resolve, reject) => {
  		this._route.params.subscribe(res => {
  			if(res.token) {
  				this.authToken = res.token;
  				resolve(res.token);
  			}
  		})
  	})
  }
  ngOnInit() {
  		this.getRestoreToken().then(res => {
  			this.sendNewPassword(res);
  		})
  }

}
