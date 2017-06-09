import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedUser : boolean;
  accountType : string;
  avatar : string;
  constructor(private authService : AuthService) { }

  ngOnInit() {
  	this.authService.isLogged$.subscribe(res=>this.isLoggedUser = res);
    this.authService.userAccountType$.subscribe(res=> this.accountType = res);
    this.authService.userAvatar$.subscribe(res => this.avatar = res);
  }

  logout() {
  	let data = {
  		accountType: null,
  		token: null,
      id: null
  	}
  	this.authService.changeLoginStatus(false);
  	this.authService.setUserObject(data);
  }

}
