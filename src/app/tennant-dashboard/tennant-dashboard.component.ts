import { Component, OnInit, NgZone } from '@angular/core';
import { GeneralService } from '../general.service';
import {MessageService} from '../message.service';
import { AuthService } from '../auth.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-tennant-dashboard',
  templateUrl: './tennant-dashboard.component.html',
  styleUrls: ['./tennant-dashboard.component.scss']
})
export class TennantDashboardComponent implements OnInit {
  isLogged : boolean;
  user_id : number;
  token : any;

  messages : any;
  userAccountType : string;
  userData :any;

  constructor(private ngZone : NgZone, private snackbar : MdSnackBar, private _message : MessageService, private _auth : AuthService, private _general : GeneralService) { 

  }
 getSavedOffer() {
 	this._auth.savedOffer$.subscribe(res => {
 		if(res) {
 			console.log(res + 'savedOffer');
 			this._general.redirectTo('offer/'+res);
 		}
 	})
 }
 getUserId() {
     return new Promise((resolve, rejecr)=>{
          this._auth.user_id$.subscribe(res => {
              if(res) {
                resolve(res)
                this.user_id = res;
              }
          })
     })
    
 }

 getUserToken() {
  	return new Promise((resolve, reject) => {
  		//let token = JSON.parse(sessionStorage.getItem('userToken'));
  		this._auth.userToken$.subscribe(res=> this.token = res);
  		if(this.token) {
  			resolve(this.token);
  		}
  	}) 
  }
  getUserData(token) {
	    this._auth.getUser(token).subscribe(res=> {
        this.userData = res.result;
        this._auth.setAvatar(res.result.avatarUrl); 
      });
  }
  ngOnInit() {
      this._message.newMessage$.subscribe(res => {
            console.log(res);
            if(res) {
              this.ngZone.run(()=>{
                  this.userData.unreadMessages = res.data.unread;
                  this._message.clearNewMessage();
              })
                
            }
            
          })
  		this.getSavedOffer();
      this.getUserId().then(id => {  
      })
  		this.getUserToken().then(res=> {
  			
  			let token = res;
  			this.getUserData(token);
  		});

  }
}
