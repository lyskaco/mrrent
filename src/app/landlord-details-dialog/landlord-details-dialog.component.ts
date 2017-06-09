import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material'
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-landlord-details-dialog',
  templateUrl: './landlord-details-dialog.component.html',
  styleUrls: ['./landlord-details-dialog.component.scss']
})
export class LandlordDetailsDialogComponent implements OnInit {
  
   agreement_id : number;
   idNumber : string;
   idSeries : string;
   mortgageNumber : string;
   buildingNumber : string;
   apartmentNumber : string;
   city : string;
   street : string;
   accountNumber : number;
  constructor(public _dialog : MdDialogRef<LandlordDetailsDialogComponent>,  private _auth : AuthService ) { }


  uploadLandlordDetails() {

  		let data = {
  			id : this.agreement_id,
  			idNumber : this.idNumber,
  			accountNumber : this.accountNumber,
  			mortgageNumber : this.mortgageNumber,
  			buildingNumber : this.buildingNumber,
  			apartmentNumber : this.apartmentNumber,
  			city : this.city,
  			street : this.street,
  			idSeries : this.idSeries
  		}
  		console.log(data);
  		this._auth.updateAgreementData(data).subscribe(res => {
  			if(res.status === 200) {
  				this._dialog.close(true);
  			} else {
  				this._dialog.close();
  			}
  		})
  }
  ngOnInit() {
  }

}
