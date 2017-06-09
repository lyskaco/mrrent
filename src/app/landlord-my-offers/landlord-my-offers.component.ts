import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {GeneralService} from '../general.service';
import {DialogService} from '../dialog.service';
import {MdSnackBar} from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-landlord-my-offers',
  templateUrl: './landlord-my-offers.component.html',
  styleUrls: ['./landlord-my-offers.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX]Y(-50%)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('200ms', style({transform: 'translateY(-50%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class LandlordMyOffersComponent implements OnInit {
  userOffers : any;
  detailShow : any;
  loadingIndicator : boolean;
  user_id;

  url : string = '//mrrent.pl/';

  constructor(private _general : GeneralService, private _auth : AuthService, private _dialog : DialogService, public snackBar : MdSnackBar) { }

  ngOnInit() {
  	this.getUserData().then((res) => {
  		this.user_id = res;
  		this.getUserOffers(res);
  	})
  }

openMessageDialog(tennant_id, subject) {
	console.log(tennant_id);
	console.log(this.user_id);
	this._dialog.showDialogMessage(tennant_id, this.user_id, subject).subscribe(res => {
		 if(res) {
            this.snackBar.open(res, 'Zamknij', {
                duration : 1500
            	})
           }
	})
}
isPending(offer) {
  return offer.offerStatus === "pending";
}
updateBid(bid) {
    this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz zaakceptować ofertę?').subscribe(res => {
       if(res) {
         this._general.bidUpdate(this.detailShow.id, bid.user.id, 'accepted', bid.id, this.user_id).subscribe(result => {
             if(result.status === 200) {
               this._general.redirectTo('landlord/my-tennants');
               this.snackBar.open('Oferta zaakceptowania', 'Zamknij', {
                 duration : 2000
               })
             } else {
               this.snackBar.open('Coś poszło nietak, spróbuj jeszcze raz', 'Zamknij', {
                 duration : 2000
               })
             }
         })
       }
    })

}
deleteBid(id, bid) {
  this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz usunąć ofertę najmu?').subscribe(res => {
    if(res) {
          this._general.bidDelete(id).subscribe(res => {
          console.log(res)
            if(res.status === 200) {
              this.detailShow.bids = this.detailShow.bids.filter(item => {
                   return item != bid;
              })
            }
          })

    }
  })
}
deleteUserOffer(id) {
		this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz usunąć ogłoszenie?').subscribe(res=> 
			{
			if(res) {
				this._general.deleteuserOffer(id).subscribe(response=> {
					if(response.status === 200) {
						this.detailShow = null;
						this.getUserOffers(this.user_id);
						}
					})
				}
			});

}
getUserData() {
	return new Promise((resolve, reject) => {
		this._auth.user_id$.subscribe((res)=> {
			this.user_id = res;
			resolve(res);
		})
	})
}

getUserOffers(id) {
	this.loadingIndicator = true;
	this._general.getUserOffers(id).subscribe((res)=> {
		this.loadingIndicator = false;
		this.userOffers = res.detail.data;
		console.log(this.userOffers);

	})
}
}
