import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer } from '@angular/platform-browser';
export interface UserData {
	accountName : string;
	accountType : string;
	created_at : string;
	updated_at : string;
	email : string;
	id : number;
	firstName?: string;
	lastName?: string; // obligatory, backend change required!

}

@Component({
  selector: 'app-landlord-dashboard',
  templateUrl: './landlord-dashboard.component.html',
  styleUrls: ['./landlord-dashboard.component.scss']
})
export class LandlordDashboardComponent implements OnInit {
  token : string;
  userData : UserData;
  constructor(private authService : AuthService, mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) { 
}
  getUserToken() {
  	return new Promise((resolve, reject) => {
  		//let token = JSON.parse(sessionStorage.getItem('userToken'));
  		this.authService.userToken$.subscribe(res=> this.token = res);
  		if(this.token) {
  			resolve(this.token);
  		}
  	}) 
  }
  getUserData(token) {
	this.authService.getUser(token).subscribe(res=> {
    this.userData = res.result;
    this.authService.setAvatar(res.result.avatarUrl); 
    console.log(res.result)});
  }
  ngOnInit() {
  		this.getUserToken().then(res=> {
  			let token = res;
  			this.getUserData(token);
  		})

  }


}
