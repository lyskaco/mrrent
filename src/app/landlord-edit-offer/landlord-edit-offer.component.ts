import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {GeneralService} from '../general.service';
import {DialogService} from '../dialog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-landlord-edit-offer',
  templateUrl: './landlord-edit-offer.component.html',
  styleUrls: ['./landlord-edit-offer.component.scss']
})
export class LandlordEditOfferComponent implements OnInit {
	user_id;
	userOffer;
	offer_id;
	deletedImages = [];
  url : string = '//mrrent.pl/';
	buildingTypes = ['kamienica', 'blok', 'wolnostojący', 'apartamentowiec', 'loft', 'inny'];
    roomsCount = ['kawalerka', '2', '3', '4', '5', 'więcej niż 5'];
    level = ['suterena', 'parter', '1', '2', '3', '4', 'powyżej 4']
    offerProgress = 'step_one';
    newImages = [];
    loadingIndicator : boolean;
    arrayOfImages = [];
    moreInformation = [
      {
        icon : 'nosmoking',
        description : 'Palenie zabronione'
      },
      {
        icon : 'tv',
        description : 'Telewizja'
      },
      {
        icon : 'wifi',
        description : 'Internet'
      },
      {
        icon : 'garden',
        description : 'Ogród'
      },
      {
        icon : 'ac',
        description : 'Klimatyzacja'
      },
      {
        icon : 'washer',
        description : 'Pralka'
      },
      {
        icon : 'gym',
        description : 'Siłownia'
      },
      {
        icon : 'furniture',
        description : 'Mieszkanie umeblowane'
      },
      {
        icon : 'fireplace',
        description : 'Kominek'
      },
      {
        icon : 'parking',
        description : 'Miejsce parkingowe'
      },
      {
        icon : 'pets',
        description : 'Zwierzęta dozwolone'
      }
    ]
  constructor(private _general : GeneralService, private _auth : AuthService, private _dialog : DialogService, private _route : ActivatedRoute) { }
  ngOnInit() {
  	this.getOfferId().then(res=> {
  		this.offer_id = res;
  		let offer_id = res;
  		this.getUserData().then(id=> {
  			this.getUserOffer(id, res);
  		})
  		
  	});
  }
  onImageChange(event: any, input: any) {
    if(event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e : any) => {
            this.newImages.push({file: event.target.files, src: e.target.result});   
          }
      event.target.files[0] = null;
      console.log(this.newImages);
      // input.value = files.map(f => f.name).join(', ');
    }
  }
  deleteNewImage(image) {
  		this.newImages = this.newImages.filter(item => item !==image);
  }
  deleteImage(image) {
  	let indexOf = this.deletedImages.indexOf(image.id);
    if( indexOf >= 0) {
       this.deletedImages = this.deletedImages.filter((i) => {
           return i !== image.id;
       })
    } else {
      this.deletedImages.push(image.id);
    }
    console.log(this.deletedImages);
  }
  
  moreInfoAction(item) {
    let indexOf = this.userOffer.moreInfo.indexOf(item.icon);
    if( indexOf >= 0) {
       this.userOffer.moreInfo = this.userOffer.moreInfo.filter((i) => {
           return i !== item.icon;
       })
    } else {
      this.userOffer.moreInfo.push(item.icon);
    }
  }
 getOfferId() {
 	return new Promise((resolve, reject) => {
 		this._route.params.subscribe(res => {
 			resolve(res.offer_id)
 		})
 	})
 }
 getUserData() {
	return new Promise((resolve, reject) => {
		this._auth.user_id$.subscribe((res)=> {
			this.user_id = res;
			resolve(res);
		})
	})
}

getUserOffer(user_id, id) {
	this._general.selectSingleOffer(id).subscribe((res)=> {
		if(res.detail.data[0].user_id == user_id) {
			this.userOffer = res.detail.data[0];
			this.userOffer.moreInfo = this.userOffer.moreInfo.split(',');
			console.log(this.userOffer);
		} else {
			this._general.redirectTo('/landlord/my-offers')
		}
		
	})
}
sendOffer() {
    let formData = new FormData(),
        imgArrayLength = this.newImages.length;
    for (let x = 0; x < imgArrayLength; x++) {
      formData.append("image[]", this.newImages[x].file[0], this.newImages[x].file[0].name);
      console.log(this.newImages[x].file[0]);
    }

    let data = {
        offerTitle: this.userOffer.offerTitle,
        offerDescription:this.userOffer.offerDescription,
        buildingType: this.userOffer.buildingType,
        roomsCount: this.userOffer.roomsCount,
        deposit: this.userOffer.deposit,
        monthlyFee: this.userOffer.monthlyFee,
        sqmt: this.userOffer.sqmt,
        user_id : this.user_id,
        offer_id : this.offer_id,
        mediaFee :this.userOffer.mediaFee,
        usageFee : this.userOffer.usageFee,
        moreInfo : this.userOffer.moreInfo,
        deletedImages : this.deletedImages,
        formData : formData
    }
    console.log(data);
    for ( let key in data ) {
      formData.append(key, data[key])
}
    
    this._dialog.showPromptDialog('Czy na pewno chcesz edytować ogłoszenie?', 'Wszystkie oferty od wynajmujących zostaną usuniętę.').subscribe(res=> {
        if(res) {
            this.loadingIndicator = true;
            this._general.updateUserOffer(formData).subscribe(res=>{
            this.loadingIndicator = false;
            if(res.status = 200) {
               this._general.redirectTo('landlord/my-offers');
            }
          })
        }
    })

  }
}
