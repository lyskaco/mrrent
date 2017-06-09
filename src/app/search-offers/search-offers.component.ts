import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { GeneralService } from '../general.service';
import { MapsAPILoader,  SebmGoogleMap, GoogleMapsAPIWrapper} from 'angular2-google-maps/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
export interface Offer {
	buildingType : string;
	cityPlaceId : string;
	created_at : string;
	deposit : number;
	monthlyFee : number;
	detailedPlaceId : string;
	id : number;
  facilityFormattedAddress: string;
  moreInfo : any;
	images : any;
	latitude: number;
	longitude : number;
	offerDescription : string;
	offerTitle : string;
	roomsCount : string;
	sqmt : number;
	updated_at : string;
	used_id : number;
  imgIndex : number;
}
export interface SelectedOffers {
	[index: number]: Offer;
}
declare const MarkerClusterer : any;

@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.scss'],
  animations: [
     trigger(
      'filterContainer', [
        transition(':enter', [
          style({transform: 'translateY(-30%)', opacity: 0}),
          animate('300ms cubic-bezier(0.715, 0.005, 0.130, 1.425)', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms cubic-bezier(0.715, 0.005, 0.130, 1.425)', style({transform: 'translateY(-30%)', opacity: 0}))
        ])
      ]
    ),
  ]
})

export class SearchOffersComponent implements OnInit {
  place_id : string;
  selectedOffers : Offer[];
  zoom : number;
  clusteredOffers = [];
  // [{id:, lat, lng, quantity}]
  singleOffers;

  buildingTypes = ['kamienica', 'blok', 'wolnostojący', 'apartamentowiec', 'loft', 'inny'];
  roomsCount = ['kawalerka', '2', '3', '4', '5', 'więcej niż 5'];

  mapLat : number;
  mapLong : number;
  googleMapLat: any;
  googleMapLong: any;
  url : string = '//mrrent.pl/';
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
   moreInfo = ['nosmoking',
     'tv',
     'wifi',
     'garden',
     'ac',
     'washer',
     'gym',
     'furniture',
     'fireplace',
     'parking',
     'pets']

moreInfoArray = '';
moreInfoArrayA = [];
toggleFilterContainer : any;
endSpin : any;
filterBuildingType : string;
filterRoomsCount : string;
searchPlaceID : any;
placeIdFilter : any = '';
roomsCountOpen : any;
buildingTypeListOpen : any;
facilityAddress : any;
lol : any;
showFileNames : any;
offersLoading : boolean;
gMap : any;
paginateArray = [];
paginateLength;
markers : google.maps.Marker[];
geocoder : google.maps.Geocoder;
markerCluster : any;
infowindows : any = {};

    @ViewChild("search")
      public searchElementRef: ElementRef;
    @ViewChild("mapwrapper")
      public map: ElementRef;

  constructor(private _location : Location, private mapsAPILoader : MapsAPILoader, private generalService : GeneralService, private ngZone : NgZone, private activatedRoute : ActivatedRoute) { 
  }

  returnSVG(item) {
    // console.log('./assets/svg/00'+item.quantity+'.svg');
    return './assets/svg/00'+item.quantity+'.svg'
  }
  moreInfoFilter(item) {
    if(this.moreInfoArray.indexOf(item)>=0) {
      this.moreInfoArray = this.moreInfoArray.replace(','+item, '');
      this.moreInfoArrayA = this.moreInfoArrayA.filter((i)=> item !== i);
    } else {
      this.moreInfoArray += ','+item
      this.moreInfoArrayA.push(item);
    }
    console.log(this.moreInfoArray);
  }
  selectBuildingType(type) {
    this.filterBuildingType = (this.filterBuildingType === type ? null : type);
  }
  selectRoomsCount(type) {
    this.filterRoomsCount = (this.filterRoomsCount === type ? null : type);
  }
  getAllOffers() {
    this.offersLoading = true;
    return new Promise((resolve, reject) => {
      this.generalService.selectOffers(this.place_id).subscribe((res)=> {
      this.offersLoading = false;
      resolve(res.detail.offers)
      if(res.detail.offers) {
        console.log(res.detail.offers);
        this.selectedOffers = res.detail.offers;
        // this.clusteredOffers = res.detail.clustered;
        this.selectedOffers.forEach((item) => {
          item.latitude = Number(item.latitude);
           item.longitude = Number(item.longitude);
            item.imgIndex = 0; 
            if(item.moreInfo) {
            item.moreInfo = item.moreInfo.replace('-','').split(',')}
            })
        // this.clusteredOffers.forEach((item) => {item.latitude = Number(item.latitude); item.longitude = Number(item.longitude)})
      } else {
        this.selectedOffers = null;
      }
    })
    })
  }
  getPlaceId() {
  	return new Promise((resolve,reject) => {
  		this.activatedRoute.params.subscribe(res=> {
  			if(res) {
  				this.place_id = res.place_id;
  				resolve(res.place_id);
  			}
  		})
  	})
  }
  moveCarousel(direction, index) {
    let imgArray = this.selectedOffers[index].images,
        imgLength = imgArray.length;

        console.log(imgLength );
    if((this.selectedOffers[index].imgIndex >= imgLength - 1) && direction>0) {
      this.selectedOffers[index].imgIndex = 0;
    }  else if ((this.selectedOffers[index].imgIndex <= 0) && direction< 0) {
      this.selectedOffers[index].imgIndex = imgLength - 1;
    } else {
      this.selectedOffers[index].imgIndex = this.selectedOffers[index].imgIndex + direction;
    }
  }
  infoWindowComposer() {
    for(let key in this.infowindows) {
        this.infowindows[key] = new google.maps.InfoWindow({
          maxWidth: 250,
          content: `
           <div style='text-align:center'>
           <h3 style='text-align:center;width:100%; color:#5D37B3;font-weight:900'>`+ this.infowindows[key].offerTitle +`</h3>
           <ul>
               <li style='background-color:#07D0FF; font-weight:600; padding: 2px 5px; border-radius:3px;list-style-type:none; display:inline-block;font-size:10px;color:#FFF'>Czynsz: `+ this.infowindows[key].monthlyFee+`PLN</li>
               <li style='background-color:#07D0FF; font-weight:600; padding: 2px 5px; border-radius:3px;list-style-type:none; display:inline-block;font-size:10px;color:#FFF'>Kaucja: `+ this.infowindows[key].deposit+`PLN</li>
           </ul>
           </div>`
       });
    }
  }
  clusterClick() {

     google.maps.event.addListener(this.markerCluster,'clusterclick', 
        (cluster) => {
          event.stopPropagation()
          let clusteredMarkers = cluster.getMarkers();
          this.placeIdFilter = '';
          this.ngZone.run(()=>{
            clusteredMarkers.map((item)=> {
              this.placeIdFilter += item.title + ' ';
            })
          })

        });
  }
  markerComposer() {
    this.markers = this.selectedOffers.map((location, i) => {
                        this.infowindows[location.id] = {
                            offerTitle : location.offerTitle,
                            image: location.images[0].path,
                            monthlyFee: location.monthlyFee,
                            deposit: location.deposit,
                            animation: google.maps.Animation.DROP
                        }
                        
                        return new google.maps.Marker({
                            position: {lat: location.latitude, lng: location.longitude},
                            title : location.id.toString(),
                            icon: {
                               url: './assets/svg/kkk.svg'

                            }
                        });
                     });
  }
  markerClick() {
    this.markers.map((item:any)=> {
      item.addListener('click', (ev) => {
        this.placeIdFilter = '';
        this.ngZone.run(()=>{
          this.placeIdFilter = item.title;
          })
        this.infowindows[item.title].open(this.gMap, item);
      })
  })
  }

  ngOnInit() {
  		this.getPlaceId().then((res)=> {
  			this.getAllOffers().then(res=> {
            this.mapsAPILoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder;
           this.geocoder.geocode({'placeId': this.place_id}, (results, status) => { 
             this.ngZone.run(()=> {
                this.mapLat = this.googleMapLat = results[0].geometry.location.lat();
                this.mapLong = this.googleMapLong = results[0].geometry.location.lng();     
                this.gMap = new google.maps.Map(this.map.nativeElement, {
                    zoom: 11,
                    center: {lat: this.mapLat, lng:this.mapLong}
                  }); 
                 this.gMap.addListener('click', () => {  // zoom out the map when marker or cluster is not targetted
                    this.gMap.setZoom(11);
                    this.placeIdFilter = '';  // apply
                    this.ngZone.run(()=> {
                       this.placeIdFilter = '';
                    })
                  });



                 if(this.selectedOffers) {
                    this.markerComposer(); // generate markers and infowindows based on selectedOffers
                    this.infoWindowComposer();
                    this.markerCluster = new MarkerClusterer(this.gMap, this.markers,
                        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                          });
                    this.clusterClick(); // adds an item to filter when the click is performed
                    this.markerClick(); // adds the array of items to filter -||-
                  } 
                })
 
            })

        
        

          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ['geocode'],
              componentRestrictions: {country: "pl"}
            });
            autocomplete.addListener("place_changed", () => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                 this.geocoder.geocode({'placeId': place.place_id}, (results, status) => {
                   this.place_id = place.place_id;
                   this._location.replaceState('/search/'+place.place_id); // change url without reloading
                   this.getAllOffers().then(res=> {
                       this.ngZone.run(()=> {
                        this.placeIdFilter = '';
                        this.mapLat = this.googleMapLat = results[0].geometry.location.lat();
                        this.mapLong = this.googleMapLong = results[0].geometry.location.lng();     
               this.gMap = new google.maps.Map(this.map.nativeElement, {
                    zoom: 11,
                    center: {lat: this.mapLat, lng:this.mapLong}
                  }); 
                 this.gMap.addListener('click', () => {
                    this.gMap.setZoom(11);
                    this.placeIdFilter = '';
                    this.ngZone.run(()=> {
                       this.placeIdFilter = '';
                    })
                  });

                if(this.selectedOffers) {
                  this.markerComposer();
                  this.infoWindowComposer();

                  this.markerCluster = new MarkerClusterer(this.gMap, this.markers,
                      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                  this.clusterClick();
                  this.markerClick()

          } 

                  })
                   })

                    
        
                    });
                
          })
  })
        });
  		})
  	
  }

}
