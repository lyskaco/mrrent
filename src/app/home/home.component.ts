import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
        trigger("about", [
            state("inactive", style({
                opacity: 0,
                transform: 'translateY(50%)'
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms cubic-bezier(0.715, 0.005, 0.130, 1.425)")),
            //transition("active => inactive", animate("200ms ease-out")),
        ]),
        trigger("rowItemOne", [
            state("inactive", style({
                opacity: 0,
                transform: 'translateY(50%)'
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms cubic-bezier(0.715, 0.005, 0.130, 1.425)")),
            //transition("active => inactive", animate("200ms ease-out")),
        ]),
        trigger("rowItemTwo", [
            state("inactive", style({
                opacity: 0,
                transform: 'translateX(-50%)'
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms cubic-bezier(0.715, 0.005, 0.130, 1.425)")),
            //transition("active => inactive", animate("200ms ease-out")),
        ]),
        trigger("rowItemThree", [
            state("inactive", style({
                opacity: 0,
                transform: 'translateX(50%)'
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms cubic-bezier(0.715, 0.005, 0.130, 1.425)")),
            //transition("active => inactive", animate("200ms ease-out")),
        ]),
            trigger("rowItemFour", [
            state("inactive", style({
                opacity: 0,
                transform: 'translateX(50%)'
            })),
            state("active", style({
                opacity: 1
            })),
            transition("inactive => active", animate("400ms cubic-bezier(0.715, 0.005, 0.130, 1.425)")),
            //transition("active => inactive", animate("200ms ease-out")),
        ])
    ]
})

export class HomeComponent implements OnInit {
  @ViewChild("search")
  		public searchElementRef: ElementRef;

  place_id;
  searchPlaceID;
  displayOption : string = 'tennant';
  scrollimateOptions: any = {
    about : {
      currentState: 'inactive',
      states: [
      {
        method: 'percentElement',
        value: 20,
        state: 'active'
      },
      {
        method: 'default',
        state: 'inactive'
      }]
    },
    rowItemOne : {
      currentState: 'inactive',
      states: [
      {
        method: 'percentElement',
        value: 20,
        state: 'active'
      },
      {
        method: 'default',
        state: 'inactive'
      }]
    },
     rowItemTwo : {
      currentState: 'inactive',
      states: [
      {
        method: 'percentElement',
        value: 40,
        state: 'active'
      },
      {
        method: 'default',
        state: 'inactive'
      }]
    },
    rowItemThree : {
      currentState: 'inactive',
      states: [
      {
        method: 'percentElement',
        value: 60,
        state: 'active'
      },
      {
        method: 'default',
        state: 'inactive'
      }]
    },
     rowItemFour : {
      currentState: 'inactive',
      states: [
      {
        method: 'percentElement',
        value: 60,
        state: 'active'
      },
      {
        method: 'default',
        state: 'inactive'
      }]
    }

  }
  constructor(private ngZone : NgZone, private router : Router, private mapsAPILoader : MapsAPILoader, private generalService : GeneralService) { }
  searchForOffers() {
  	//this.generalService.selectOffers(this.place_id).subscribe(res=>{console.log(res)})
  	if(this.place_id) {
  		this.router.navigateByUrl('search/'+this.place_id)
  	}
  }
  ngOnInit() {
  	this.mapsAPILoader.load().then(() => {
  	let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"],
        componentRestrictions: {country: "pl"}
      });
      autocomplete.addListener("place_changed", () => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //his.place_id = place.place_id;
          this.ngZone.run(()=> {
          	this.place_id = place.place_id;
          })
  	})
  })
  }


}
