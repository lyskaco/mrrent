
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';
import { MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-tennant-panel',
  templateUrl: './tennant-panel.component.html',
  styleUrls: ['./tennant-panel.component.scss']
})
export class TennantPanelComponent implements OnInit {
   user_id : number;
   userAgreements : any[];
   loading : boolean;
   agreementDetail : any;

  url : string = '//mrrent.pl/';
  constructor(private _auth : AuthService, private _general : GeneralService, private _snack : MdSnackBar, private _dialog : DialogService) { }

  ngOnInit() {
    this.getUserId().then(id => {
      this.getUserAgreements(id);
    })
  }

  tennantDetailsDialog(agr) {
     this._dialog.showTennantDetailsDialog(agr.id, agr.tennantTelephoneNumber, agr.tennantIdNumber).subscribe(res => {
       if(res) {
           this._snack.open('Dodano dane', 'Zamknij', {duration: 1500});
           this.getUserAgreements(this.user_id);
       } else {
            this._snack.open('Coś poszło nie tak', 'Zamknij', {duration: 1500});
       }
     })
  }
  getAgreementDetails(id) {
     this._general.getAgreementDetails(id).subscribe(res => {
       if(res.status === 200 && res.detail.data) {
           this.agreementDetail = res.detail.data;
       }
     })
  }
  getUserId() {
  	return new Promise((resolve, reject) => {
  		this._auth.user_id$.subscribe(id => {
  			this.user_id = id;
  			resolve(id);
  		})	
  	})
  }
  showDialogBroken(agreement) {
    this._dialog.showDialogBroken().subscribe(res => {
        if(res) {
          this._general.tennantAdditionalService(agreement, 'repair').subscribe(res => {
            if(res.status === 200) {
                 this._snack.open('Zgłoszenie wysłane, wkrótce się z Tobą skontaktujemy', 'Zamknij', {duration: 1500});
            }
          })
          
        }
    })
  }
  showDialogCleaning(agreement) {
    this._dialog.showDialogCleaning().subscribe(res => {
        if(res) {
          this._general.tennantAdditionalService(agreement, 'cleaning').subscribe(res => {
            if(res.status === 200) {
                 this._snack.open('Zgłoszenie wysłane, wkrótce się z Tobą skontaktujemy', 'Zamknij', {duration: 1500});
            }
          })
          
        }
    })
  }
  getUserAgreements(id) {
  	this.loading = true;
  	this._general.getUserAgreements(id).subscribe(agreements => {
  		this.loading = false;
  		if(agreements.status === 200) {
  			this.userAgreements = agreements.detail.data;
        this.userAgreements[0].agreementStatus = 'signed';
  		}
  	})
  }
}
