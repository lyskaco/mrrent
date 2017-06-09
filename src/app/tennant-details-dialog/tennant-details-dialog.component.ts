import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material'
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-tennant-details-dialog',
  templateUrl: './tennant-details-dialog.component.html',
  styleUrls: ['./tennant-details-dialog.component.scss']
})
export class TennantDetailsDialogComponent implements OnInit {
  
   agreement_id : number;
   idNumber : string;
   idSeries : string;
   buildingNumber : string;
   apartmentNumber : string;
   street : string;
   city : string;
  constructor(public _dialog : MdDialogRef<TennantDetailsDialogComponent>,  private _auth : AuthService ) { }


  uploadLandlordDetails() {

  		let data = {
  			id : this.agreement_id,
  			tennantIdNumber : this.idNumber,
  			tennantIdSeries : this.idSeries,
  			tennantCity : this.city,
  			tennantStreet : this.street,
  			tennantBuildingNumber : this.buildingNumber,
  			tennantApartmentNumber : this.apartmentNumber
  		}

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
