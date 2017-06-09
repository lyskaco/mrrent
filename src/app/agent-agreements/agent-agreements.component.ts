import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import {AuthService} from '../auth.service';
import {DialogService} from '../dialog.service';
import {MessageService} from '../message.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-agent-agreements',
  templateUrl: './agent-agreements.component.html',
  styleUrls: ['./agent-agreements.component.scss']
})
export class AgentAgreementsComponent implements OnInit {
  allAgreements : any;
  user_id : number;
  constructor(private _snack:MdSnackBar, private _auth : AuthService, private _general : GeneralService, private _dialog : DialogService, private _message : MessageService) { }

  ngOnInit() {
  	this._auth.user_id$.subscribe(res => {
  		this.user_id = res;
  	})
  	this.getAllAgreements();
  }

  startThread(agr) {
  		this._dialog.showDialogMessageAgent(agr.landlordData.UserData.id, this.user_id, agr.tennantData.UserData.id, agr.id).subscribe(res=> {
  			if(res) {
  				this._snack.open(res, 'ZAMKNIJ', {duration: 1500});
  			}
  		})
  }
  deleteAgr(id) {
  	this._dialog.showPromptDialog('Usunięcie agreementu', 'Czy na pewno chcesz usunąć?').subscribe(isTrue => {
  		if(isTrue) {
	  		this._general.deleteAgreement(id).subscribe(res => {
		  		if(res.status === 200) {
		  			alert('Usunięto.');
		  			this.getAllAgreements();
		  		} else {
		  			alert('Coś poszło nietak');
		  		}
	  			})
	  		}
	  	})
  }
  getAllAgreements() {
  	this._general.getAllAgreements().subscribe(res => {
  		if(res.detail) {
  			console.log(res.detail);
  			this.allAgreements = res.detail;
  		}
  	})
  }
}
