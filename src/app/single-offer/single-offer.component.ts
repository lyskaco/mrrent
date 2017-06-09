import { Component, OnInit } from '@angular/core';
import {Title } from '@angular/platform-browser';
import { GeneralService} from '../general.service';
import { AuthService } from '../auth.service';
import { DialogService } from '../dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.scss'],
  animations: [
        trigger("toFixed", [
            state("inactive", style({
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("200ms ease-in")),
            transition("active => inactive", animate("200ms ease-out")),
        ]),
        trigger("moreInfo", [
            state("inactive", style({
            	opacity: 0,
            	transform: 'translateX(-100px)'

            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms ease")),
            //transition("active => inactive", animate("400ms ease")),
        ]),
          trigger("nearby", [
            state("inactive", style({
            	opacity: 0,
            	transform: 'translateX(-100px)'

            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms ease")),
            //transition("active => inactive", animate("400ms ease")),
        ])
    ]
})
export class SingleOfferComponent implements OnInit {
  
  singleOffer404 : boolean;
  singleOffer : any;

  imgIndex : number = 0;
  isLogged : boolean;
  userAccountType : string;
  user_id : number;
  offerId : number;

  userRatings;
  thisOfferRating;

   url : string = '//mrrent.pl/'
  starHover : number;

   nearbyDesc = {
   	atm: 'Banomaty',
   	bar : 'Bary, puby',
   	cafe : 'Kawiarnie',
   	food : 'Jedzenie',
   	groceryOrSupermarket: 'Sklepy i supermarkety',
   	gym : 'Siłownie',
   	hospital : 'Szpitale',
   	park: 'Parki',
   	parking: 'Parkingi',
   	pharmacy: 'Apteki',
   	school: 'Szkoły',
   	shoppingMall: 'Galerie handlowe'
   };
   nearbyArray = [];
   moreInfoDesc = {
   	nosmoking : 'Palenie zabronione',
   	tv : 'Telewizja',
   	wifi : 'Internet',
   	garden : 'Ogród',
   	ac : 'Klimatyzacja',
   	washer : 'Pralka',
   	gym : 'Siłownia',
   	furniture : 'Mieszkanie umeblowane',
   	fireplace : 'Kominek',
   	parking : 'Miejsce parkingowe',
   	pets : 'Zwierzęta dozwolone'
   }
   moreInformation = [
      {
        icon : 'so-no-smoking',
        description : 'Palenie zabronione',
      },
      {
        icon : 'so-tv',
        description : 'Telewizja'
      },
      {
        icon : 'so-wifi',
        description : 'Internet'
      },
      {
        icon : 'so-garden',
        description : 'Ogród'
      },
      {
        icon : 'so-ac',
        description : 'Klimatyzacja'
      },
      {
        icon : 'so-washer',
        description : 'Pralka'
      },
      {
        icon : 'so-gym',
        description : 'Siłownia'
      },
      {
        icon : 'so-furniture',
        description : 'Mieszkanie umeblowane'
      },
      {
        icon : 'so-fireplace',
        description : 'Kominek'
      },
      {
        icon : 'so-parking',
        description : 'Miejsce parkingowe'
      },
      {
        icon : 'so-pets',
        description : 'Zwierzęta dozwolone'
      }
    ]
  constructor(private _title : Title, public snackBar : MdSnackBar, private _general : GeneralService, private _auth : AuthService, private _route : ActivatedRoute, private _dialogService : DialogService) { }
scrollimateOptions: any = {
	  moreInfo : {
	  	currentState: 'inactive',
	  	states: [
	  	{
	  		method: 'percentElement',
	  		value: 10,
	  		state: 'active',
	  		class: 'more-info-trigger'
	  	},
	  	{
	  		method: 'default',
	  		state: 'inactive'
	  	}]
	  },
	  	  nearby : {
	  	currentState: 'inactive',
	  	states: [
	  	{
	  		method: 'percentElement',
	  		value: 10,
	  		state: 'active',
	  		class: 'more-info-trigger'
	  	},
	  	{
	  		method: 'default',
	  		state: 'inactive'
	  	}]
	  },
      toFixed: {
          currentState: "inactive", //currentState is required
          states: [
              {
                  method: "percentTotal", //this will be true when a total of 85% of the page has been scrolled
                  value: 75,
                  state: "active",
                  class: "fixed",
                  sizes: "md-up"
              },
              {
              	  setAtLastChanceTopPx: 900,
                  method: "default",
                  state: "inactive"
              }
          ]
      },
  }
  ngOnDestroy() {
    this._title.setTitle('MrRent');
  }
  ngOnInit() {
  		this.getOfferId().then(res => {
  			this.getSingleOffer(res).then(res => {
  				let singleOffer : any = res;
          this.setTitle(singleOffer.offerTitle + ' - ' + singleOffer.facilityFormattedAddress);
  				if(singleOffer.id && this.user_id) {
	  				this._general.getRatings(this.user_id).subscribe(result => {
	  					let ratings = result.detail.data;
	  					if(ratings){
		  					this.thisOfferRating = ratings.filter((item) => item.offer_id === singleOffer.id);
		  					if(this.thisOfferRating[0]) {
		  						this.starHover = this.thisOfferRating[0].rate;
		  					}
		  				}
	  				});
	  			}
  			});
  			this.getUserInfo();
  			
  		})
  		this._auth.changeSavedOffer(null);

  }
  isBidAccepted() {
        let bids = this.singleOffer.bids;
        bids = bids.filter(item => {
           return item.bidStatus === 'accepted' && item.user.id === this.user_id;
        })  
        return !!bids[0];
  }
  galleryNavigate(dir) {
  	let length = this.singleOffer.images.length;

  	if(this.imgIndex >= length-1 && dir > 0) {
  		this.imgIndex = 0;
  	} else if (this.imgIndex === 0 && dir < 0 ) {
  		this.imgIndex = length - 1;
  	} else {
  		this.imgIndex += dir
  	}
  }
  adminDeleteOffer() {
    this._general.deleteuserOffer(this.singleOffer.id).subscribe(res => {
      if(res.status===200) {
         this.snackBar.open('Usunięto', 'Zamknij', {duration: 1500});
         this._general.redirectTo('');
      }
    })
  }
  getOfferId() {
  	return new Promise((resolve, reject) => {
  		this._route.params.subscribe(res=> {
  			if(res) {
  				this.offerId= res.offer_id;
  				resolve(res.offer_id);
  			}
  		})
  	})
  }

  getSingleOffer(id) {

  	return new Promise((resolve, reject) => {
  		this._general.selectSingleOffer(id).subscribe(res=> {
  			if(res.status === 200) {
  				this.singleOffer = res.detail.data[0];
  				resolve(res.detail.data[0])
          if(this.singleOffer.moreInfo) {
  				  this.singleOffer.moreInfo = this.singleOffer.moreInfo.replace('-','').split(',') // TODO MORE INFO
          }
  				for(let key in this.singleOffer.nearby) {
  					if(['updated_at', 'id', 'created_at', 'offer_id'].indexOf(key) < 0) {
	  					this.nearbyArray.push({
	  						item: key,
	  						description: this.nearbyDesc[key],
	  						amount: this.singleOffer.nearby[key]
	  						})
	  					}
	  				}
  				this.nearbyArray = this.nearbyArray.sort((a, b)=> b.amount-a.amount).splice(0, this.nearbyArray.length - 6);
  				console.log(this.nearbyArray);
  				this.singleOffer.latitude = Number(this.singleOffer.latitude)
  				this.singleOffer.longitude = Number(this.singleOffer.longitude)
  				console.log(this.singleOffer);


  			} else if (res.status === 404){
  				this.singleOffer404 = true;
  			}
  			
  		})
  	})
  		
  }
  setTitle( newTitle : string) {
    this._title.setTitle(newTitle);
  }
  setRate(rate) {
  	if(!this.isLogged) {
  		this._dialogService.showDialogNotify('Powiadomienie', 'Zaloguj się, aby dodawać oferty do ulubionych');
  	} else if (this.isLogged && this.userAccountType==='landlord') {
  		this._dialogService.showDialogNotify('Powiadomienie', 'Tylko wynajmujący użytkownicy mogą dodawać oferty do ulubionych.')
  	} else if (this.isLogged && this.userAccountType === 'tennant') {
  		this._general.setRating(rate, this.user_id, this.singleOffer.id).subscribe(res => {
  			if(res.status === 200) {
  				this._general.getRatings(this.user_id).subscribe(result => {
  					let ratings = result.detail.data;	
  					console.log(ratings);
  					this.thisOfferRating = ratings.filter((item) => item.offer_id === this.singleOffer.id);
  					 if(this.thisOfferRating[0]) {
  						this.starHover = this.thisOfferRating[0].rate;
  					}
  				});
  			}
  		});
  	}
  }
  newBidDialog() {
    if(!this.isLogged) {
      this._auth.changeSavedOffer(this.singleOffer.id);
      this._general.redirectTo('login');
     }   else if (this.isLogged && this.userAccountType==='landlord') {
        this._dialogService.showDialogNotify('Powiadomienie', 'Tylko wynajmujący użytkownicy mogą dodawać nowe oferty.')
     }   else if (this.isLogged && this.userAccountType === 'tennant') {
        this._dialogService.showDialogBid(this.singleOffer.id, this.user_id, this.singleOffer.monthlyFee, this.singleOffer.deposit, this.singleOffer.facilityFormattedAddress, this.singleOffer.offerTitle).subscribe(res=>{
            if(res) {
              this.snackBar.open(res, 'Zamknij', {
                duration : 1500
              })
            }
        })
    }
  }
  messageDialog() {

  	if(!this.isLogged) {
  		this._auth.changeSavedOffer(this.singleOffer.id);
  		this._general.redirectTo('login');
  	} else if (this.isLogged && this.userAccountType==='landlord') {
  		this._dialogService.showDialogNotify('Powiadomienie', 'Tylko wynajmujący użytkownicy mogą kontaktować się z właścicielami.')
  	} else if (this.isLogged &&  ['agent', 'tennant'].indexOf(this.userAccountType)>=0) {
  		this._dialogService.showDialogMessage(this.singleOffer.user_id, this.user_id, this.singleOffer.offerTitle).subscribe(res => {
        if(res) {
            this.snackBar.open(res, 'Zamknij', {
                duration : 1500
              })
           }
      });
  	}
  }

  getUserInfo() {
  	this._auth.isLogged$.subscribe(res=> this.isLogged = res);
  	this._auth.userAccountType$.subscribe(res=> this.userAccountType = res);
  	this._auth.user_id$.subscribe(res=> this.user_id = res);
  }

}
