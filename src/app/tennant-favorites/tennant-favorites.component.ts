import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { GeneralService} from '../general.service';
import { DialogService } from '../dialog.service';
import { MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-tennant-favorites',
  templateUrl: './tennant-favorites.component.html',
  styleUrls: ['./tennant-favorites.component.scss']
})
export class TennantFavoritesComponent implements OnInit {
  user_id : number;
  userFavorites : any;
  userBids : any;
  loadingIndicatorBid : boolean;
  loadingIndicator : boolean;

  orderDirection : string = 'descending';
  constructor(private _auth : AuthService, private _general : GeneralService, private _dialog : DialogService, private snackBar : MdSnackBar) { }

  ngOnInit() {
  	this.getUserId().then(res => {
  		this.getUserInterests(res);
      this.bidUserGet(res);
  	})
  }
  bidUserGet(id) {
    this.loadingIndicatorBid = true;
     this._general.bidUserGet(id).subscribe(res => {
       this.loadingIndicatorBid = false;
       if (res) {
         this.userBids = res.detail.data;
         console.log(this.userBids);
       }
     })
  }
  deleteInterest(interest) {
  	this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz usunąć z ulubionych?').subscribe(result => {
  		if(result) {
  			  	this._general.deleteRating(interest.id).subscribe(res => {
  					if(res.status === 200) {
			  			this.snackBar.open('Usunięto z ulubionych', 'Zamknij', {duration: 1500});
			  			this.userFavorites = this.userFavorites.filter(item => {
			  				return item.id !== interest.id;
			  			})

			  		} else {
			  			this.snackBar.open('Nie udało się usunąć z ulubionych', 'Zamknij', {duration: 1500});
			  		}
  			})
  		}
  	})
  }
  isBidAccepted(bid) {
    return bid.bidStatus === 'accepted';
  }
  openMessageDialog(receiver_id, subject) {
  		this._dialog.showDialogMessage(receiver_id, this.user_id, subject).subscribe(res => {
  			if(res) {
  				this.snackBar.open(res, 'Zamknij', {duration: 1500});
  			}
  		})
  }
  deleteBid(bid) {
    this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz usunąć swoją ofertę?').subscribe(res => {
      if(res) {
         this._general.bidDelete(bid.id).subscribe(result=> {
            if(result.status === 200) {
              this.bidUserGet(this.user_id);
              this.snackBar.open('Oferta usunięta', 'Zamknij', {duration: 1500});
            }
         })
      }
    })
  }
  openBidDialog(interest) {
  		this._dialog.showDialogBid(interest.offer.id, this.user_id, interest.offer.monthlyFee,
  		 interest.offer.deposit, interest.offer.facilityFormattedAddress, interest.offer.offerTitle).subscribe(res => {
  		 	if(res) {
            this.bidUserGet(this.user_id);
  		 	    this.snackBar.open(res, 'Zamknij', {duration: 1500});
  		   }
  		 })
  }
  toggleOrderDirection() {
  	if(this.orderDirection === 'descending') {
  		this.orderDirection = 'ascending';
  	} else {
  		this.orderDirection = 'descending';
  	}
  }
  getUserInterests(id) {
    this.loadingIndicator = true;
  	this._general.getRatings(id).subscribe(res=> {
      this.loadingIndicator = false;
  		if(res.detail.data) {
  			this.userFavorites = res.detail.data;
  			console.log(this.userFavorites);
  		}
  	})
  }
  getUserId() {
  	return new Promise((resolve, reject) => {
  		this._auth.user_id$.subscribe(res=>{
  			if(res) {
  				resolve(res);
  				this.user_id = res;
  			}
  		})
  	})
  }
}
