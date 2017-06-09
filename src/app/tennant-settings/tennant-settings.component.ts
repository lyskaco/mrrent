
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { GeneralService } from '../general.service';
import { MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-tennant-settings',
  templateUrl: './tennant-settings.component.html',
  styleUrls: ['./tennant-settings.component.scss']
})
export class TennantSettingsComponent implements OnInit {



  user_id : any;
  iconSelected : string;

  repeat_password : string;
  password : string;
  oldPassword : string;
  icons = ['doctor', 'tennant', 'landlord', 'teacher', 'writer', 'businessman', 'croupier', 'manager', 'soldier', 'teen']
  constructor( private _auth : AuthService, public snackBar : MdSnackBar) { }

  ngOnInit() {
  	this.getUserId();
  }
  changeAvatar() {
  	this._auth.updateAccount({avatar : this.iconSelected}, this.user_id).subscribe(res => {
  		if(res.status === 200) {
        this._auth.setAvatar(this.iconSelected);
  			this.snackBar.open('Zmieniono avatar', 'Zamknij', {
  				duration: 1000
  			})
  		} else {
  			this.snackBar.open('Nie udało się zmienić avatara', 'Zamknij', {
  				duration: 1500
  			})
  		}
  	})
  }
  changePassword() {
      this._auth.updateAccount({oldPassword : this.oldPassword, password: this.password}, this.user_id).subscribe(res => {
      if(res.status === 200) {
        this.snackBar.open('Zmieniono hasło', 'Zamknij', {
          duration: 1000
        })
      } else if (res.status === 422 && res.detail.message === "invalid password, try again") {
        this.snackBar.open('Niepoprawne stare hasło', 'Zamknij', {
          duration: 1500
        })
      }
    })

  }
  getUserId() {
  	return new Promise((resolve, reject) => {
  		this._auth.user_id$.subscribe(res => {
  			if(res) {
  				this.user_id = res;
  				resolve(res);
  			}
  		})
  	})
  }
}
