import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';
import { MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-landlord-my-tennants',
  templateUrl: './landlord-my-tennants.component.html',
  styleUrls: ['./landlord-my-tennants.component.scss']
})
export class LandlordMyTennantsComponent implements OnInit {
   user_id : number;
   userAgreements : any[];
   loading : boolean;
   agreementDetail : any;

  statusArr = ['Waiting_For_Landlord', 'Waiting_For_Tennant', 'Generating_The_Contract', 'Signed'];
  url : string = '//mrrent.pl/'
  constructor(private _auth : AuthService, private _general : GeneralService, private _snack : MdSnackBar, private _dialog : DialogService) { }

  ngOnInit() {
    this.getUserId().then(id => {
      this.getUserAgreements(id);
    })
  }

  landlordDetailsDialog(agr) {
     this._dialog.showLandlordDetailsDialog(agr.id, agr.mortgageNumber, agr.telephoneNumber, agr.idNumber, agr.accountNumberCry).subscribe(res => {
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
  getUserAgreements(id) {
  	this.loading = true;
  	this._general.getUserAgreements(id).subscribe(agreements => {
  		this.loading = false;
  		if(agreements.status === 200) {
  			this.userAgreements = agreements.detail.data;
        console.log(agreements.detail.data);
  		}
  	})
  }
}
