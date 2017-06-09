import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from '../auth.service';
import {GeneralService} from '../general.service';
import {DialogService} from '../dialog.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
export interface NewOffer {
	offerTitle: string;
  offerDescription : string;
  roomsCount: number;
	facilityFormattedAddress : string;
	latitude: number;
	longitude: number;
	detailedPlaceId : string;
  sublocalityPlaceId : string;
  neighborhoodPlaceId : string;
  postalCodePlaceId : string;
  voidevoidshipPlaceId : string;
	cityPlaceId : string;
  buildingType: string;
  monthlyFee : number;
  deposit : number;
  mediaFee : number;
  usageFee : number;
  sqmt : number;
  moreInfo : any;
}
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-landlord-create-offer',
  templateUrl: './landlord-create-offer.component.html',
  styleUrls: ['./landlord-create-offer.component.scss'],
  animations: [
    trigger('offerProgressBGP', [
      state('step_one', style({
        backgroundPosition: '0% 50%'
      })),
      state('step_two',   style({
         backgroundPosition: '100% 50%'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),

     trigger('formStepOne', [
      state('active', style({
        opacity: 1,

      })),
      state('notactive',   style({
        opacity: 0,
        transform: 'translateY(-50%)'
      })),
      transition('notactive => active', animate('100ms ease-in 500ms')),
      transition('active => notactive', animate('100ms ease-out'))
    ]),
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms ease', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms ease', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'leaveAnimation', [
        transition(':leave', [
          style({transform: 'scale(1)', opacity: 1}),
          animate('300ms ease', style({transform: 'scale(0)', opacity: 0}))
        ])
      ]
    )

  ]
})

export class LandlordCreateOfferComponent implements OnInit {
  user_id;
  loadingIndicator : boolean = false;
  newOffer : NewOffer = {
  	offerTitle: '',
    neighborhoodPlaceId : '',
    postalCodePlaceId: '',
    sublocalityPlaceId: '',
    offerDescription: '',
  	facilityFormattedAddress : '',
    voidevoidshipPlaceId : '',
  	latitude: null,
  	longitude: null,
  	cityPlaceId: '',
  	detailedPlaceId: '',
    buildingType: '',
    roomsCount: null,
    monthlyFee: 0,
    deposit: 0,
    sqmt : null,
    mediaFee : 0,
    usageFee : 0,
    moreInfo : []

  }
    formOneState = 'active';
    formTwoState = 'notactive';
    createOfferStep : number = 1;
    buildingTypes = ['kamienica', 'blok', 'wolnostojący', 'apartamentowiec', 'loft', 'inny'];
    roomsCount = ['kawalerka', '2', '3', '4', '5', 'więcej niż 5'];
    level = ['suterena', 'parter', '1', '2', '3', '4', 'powyżej 4']
    offerProgress = 'step_one';
    lol : any;
    showFileNames;
    facilityAddress;
    buildingTypeListOpen;
    roomsCountOpen;
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
  
  @ViewChild("search")
  		public searchElementRef: ElementRef;

  constructor(private generalService : GeneralService, 
    private authService : AuthService, 
    private mapsAPILoader : MapsAPILoader, 
    private zone : NgZone, 
    mdIconRegistry: MdIconRegistry, 
    sanitizer: DomSanitizer,
    private _dialog : DialogService) { 
  		mdIconRegistry
         .addSvgIcon('add-offer',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/signs.svg'))
         .addSvgIcon('paper-plane',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/paper-plane.svg'))
         .addSvgIcon('no-smoking',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/nosmoking.svg'))
         .addSvgIcon('tv',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/tv.svg'))
          .addSvgIcon('pets',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/pets.svg'))
         .addSvgIcon('wifi',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/wifi.svg'))
         .addSvgIcon('garden',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/garden.svg'))
         .addSvgIcon('ac',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/ac.svg'))
         .addSvgIcon('washer',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/washer.svg'))
         .addSvgIcon('gym',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/gym.svg'))
         .addSvgIcon('furniture',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/furniture.svg'))
         .addSvgIcon('fireplace',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/fireplace.svg'))
         .addSvgIcon('parking',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/parking.svg'))


  }
  moreInfoAction(item) {
    let indexOf = this.newOffer.moreInfo.indexOf(item.icon);
    if( indexOf >= 0) {
       this.newOffer.moreInfo = this.newOffer.moreInfo.filter((i) => {
           return i !== item.icon;
       })
    } else {
      this.newOffer.moreInfo.push(item.icon);
    }
  }
  checkForEnters(ev) {
    if(ev.keyCode === 13) {
      this.newOffer.offerDescription.replace(/\r?\n/g, '<br />');
    }
  }
  sendOffer() {
    let formData = new FormData(),
        imgArrayLength = this.arrayOfImages.length;
    for (let x = 0; x < imgArrayLength; x++) {
      formData.append("image[]", this.arrayOfImages[x].file[0], this.arrayOfImages[x].file[0].name);
      console.log(this.arrayOfImages[x].file[0]);
    }

    let data = {
        offerTitle: this.newOffer.offerTitle,
        offerDescription:this.newOffer.offerDescription,
        facilityFormattedAddress : this.newOffer.facilityFormattedAddress,
        latitude: this.newOffer.latitude,
        longitude: this.newOffer.longitude,
        cityPlaceId: this.newOffer.cityPlaceId,
        detailedPlaceId: this.newOffer.detailedPlaceId,
        buildingType: this.newOffer.buildingType,
        sublocalityPlaceId : this.newOffer.sublocalityPlaceId,
        neighborhoodPlaceId : this.newOffer.neighborhoodPlaceId,
        postalCodePlaceId : this.newOffer.postalCodePlaceId,
        voidevoidshipPlaceId : this.newOffer.voidevoidshipPlaceId,
        roomsCount: this.newOffer.roomsCount,
        deposit: this.newOffer.deposit,
        monthlyFee: this.newOffer.monthlyFee,
        sqmt: this.newOffer.sqmt,
        user_id : this.user_id,
        mediaFee :this.newOffer.mediaFee,
        usageFee : this.newOffer.usageFee,
        moreInfo : this.newOffer.moreInfo,
        formData : formData
    }

    // let data = {
    //     offerTitle: 'Wygodny apartament na Swobodzie',
    //     offerDescription: 'Opis',
    //     facilityFormattedAddress : 'Swoboda, Poznań, Polska',
    //     latitude: 50,
    //     longitude: 50,
    //     cityPlaceId: "CHadfref897dfrg",
    //     detailedPlaceId: 'CHadfref897dfrg',
    //     buildingType: 'blok',
    //     roomsCount: 'kawalerka',
    //     deposit: 1600,
    //     monthlyFee: 1600,
    //     sqmt: 30,
    //     user_id : 1,
    //     mediaFee : 200,
    //     usageFee : 200,
    //     moreInfo : ['tv', 'wifi', 'fireplace']
    // }
    console.log(data);
    for ( let key in data ) {
      formData.append(key, data[key])
}
       this._dialog.showDialogSummary(data, this.user_id).subscribe(res => {
          if(res) {
            this.loadingIndicator = true;
            this.generalService.createNewOffer(formData).subscribe(res=>{
            this.loadingIndicator = false;
            if(res.status === 200) {
               window.location.href = res.detail.link;
            } else if(res.status === 400) {
                this._dialog.showDialogNotify('Powiadomienie', 'Coś poszło nie tak.');
            }
           })
          }
       })
   

  }
  onImageChange(event: any, input: any) {
    if(event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e : any) => {
            this.arrayOfImages.push({file: event.target.files, src: e.target.result});   
          }
      event.target.files[0] = null;
      // input.value = files.map(f => f.name).join(', ');
    }
  }
  removeFromArray(item : any) {
    let itemToDelete = item;
    this.arrayOfImages = this.arrayOfImages.filter((item)=> {
      return item.src !== itemToDelete.src
    })
  }
  prevDef(e) {
    e.preventDefault();
  }
  ngOnInit() {
    this.authService.user_id$.subscribe(res=> {
      this.user_id = res;
    })
  	this.mapsAPILoader.load().then(() => {
  	  var geocoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {country: "pl"}
      });
      autocomplete.addListener("place_changed", () => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          geocoder.geocode({'location': {lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}, (results, status) => {
          	console.log(results);
          	for(let i = 0; i<results.length; i++) {
          		let typesLength = results[i].types.length;
          		for(let j = 0; j<typesLength; j++) {
          			if(results[i].types[j] === 'locality') {
          				this.newOffer.cityPlaceId = results[i].place_id;
          			}
                if(results[i].types[j] === 'sublocality') {
                  this.newOffer.sublocalityPlaceId = results[i].place_id;
                }
                 if(results[i].types[j] === "neighborhood") {
                  this.newOffer.neighborhoodPlaceId = results[i].place_id;
                }
                 if(results[i].types[j] === "postal_code") {
                  this.newOffer.postalCodePlaceId = results[i].place_id;
                }
                 if(results[i].types[j] === "administrative_area_level_1") {
                   this.newOffer.voidevoidshipPlaceId = results[i].place_id;
                }

          		}
          	}
    		
  		  });
          console.log(place);
         this.zone.run(()=>{
          this.newOffer.facilityFormattedAddress = place.formatted_address;
          this.newOffer.latitude = place.geometry.location.lat();
          this.newOffer.longitude = place.geometry.location.lng();
          this.newOffer.detailedPlaceId = place.place_id;
          console.log(this.newOffer);
         })
          
          //verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }

          //set latitude, longitude and zoom
       });
    });
  }

}
