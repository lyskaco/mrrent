import { Component, OnInit } from '@angular/core';
import { GeneralService} from '../general.service';
import {IMyOptions } from 'mydatepicker';
import {MdDialogRef} from '@angular/material';

export interface Bid {
	monthlyFee: number;
	deposit: number;
	moveInDate : any;
	contractDuration : string;
}
@Component({
  selector: 'app-dialog-new-bid',
  templateUrl: './dialog-new-bid.component.html',
  styleUrls: ['./dialog-new-bid.component.scss']
})
export class DialogNewBidComponent implements OnInit {
  offerTitle : string;
  offerAddress : string;
  coreDeposit : number;
  coreMonthlyFee : number;
  offer_id : number;
  tennant_id : number;
  pl : any;
  bidUploading : boolean;
  myDatePickerOptions: IMyOptions = {
			dayLabels: { su: "Nie", mo: "Pon", tu: "Wto", we: "Śro", th: "Czw", fr: "Pią", sa: "Sob" },
            monthLabels: { 1: "Sty", 2: "Lut", 3: "Mar", 4: "Kwi", 5: "Maj", 6: "Cze", 7: "Lip", 8: "Sie", 9: "Wrz", 10: "Paź", 11: "Lis", 12: "Gru" },
            dateFormat: "yyyy-mm-dd",
            todayBtnTxt: "Dzisiaj",
            firstDayOfWeek: "mo",
            sunHighlight: true,
            editableDateField: false,
  };

  bid : Bid = {
  	monthlyFee : null,
  	deposit : null,
  	moveInDate : null,
  	contractDuration : null
  }

  constructor( private _general : GeneralService, private _dialog : MdDialogRef<DialogNewBidComponent>) { }

  ngOnInit() {
  }

  dialogClose() {
    this._dialog.close();
  }
  sendBid() {
    let data = {
      offer_id : this.offer_id,
      user_id : this.tennant_id,
      bidMonthlyFee : this.bid.monthlyFee,
      bidDeposit : this.bid.deposit,
      bidMoveInDate : this.bid.moveInDate.jsdate,
      bidContractDuration : this.bid.contractDuration
    }
    this.bidUploading = true;
    this._general.sendBid(data).subscribe(res=> {
      this.bidUploading = false;
        if(res.status === 200) {
            this._dialog.close('Ogłoszenie zostało wysłane.');
        } else {
            this._dialog.close('Wystąpił błąd, spróbuj ponownie.');
        }
    })
  }
}
