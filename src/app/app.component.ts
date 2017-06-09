import { Component, OnInit, NgZone} from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService} from './auth.service';
import { MessageService} from './message.service';
import {MdSnackBar} from '@angular/material';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
	constructor(private route : Router, private snackbar : MdSnackBar, private ngZone : NgZone, private _message : MessageService, private _auth : AuthService, private mdIconRegistry: MdIconRegistry, 
   private sanitizer: DomSanitizer) {
		 		mdIconRegistry
              .addSvgIcon('points',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/points.svg'))
                  .addSvgIcon('auctionn',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/auctionn.svg'))
          .addSvgIcon('contractt',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/contractt.svg'))
           .addSvgIcon('help',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/help.svg'))
                 .addSvgIcon('chatt',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chat.svg'))
          .addSvgIcon('houseIcon',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/house.svg'))
          .addSvgIcon('logo',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/logo.svg'))
           .addSvgIcon('warning',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/warning.svg'))
                 .addSvgIcon('editpen',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/edit.svg'))
                     .addSvgIcon('auction2',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/auction2.svg'))
                 .addSvgIcon('letter',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/letter.svg'))
                 .addSvgIcon('erase',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/erase.svg'))
                 .addSvgIcon('binoculars',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/binoculars.svg'))
                  .addSvgIcon('search',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/search.svg'))
                 .addSvgIcon('favorite',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/favorite.svg'))
                                  .addSvgIcon('doctor',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/doctor.svg'))
                                  .addSvgIcon('manager',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/manager.svg'))
                                  .addSvgIcon('teen',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/teen.svg'))
                                  .addSvgIcon('soldier',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/soldier.svg'))
                                  .addSvgIcon('agent',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/detective.svg'))
                                  .addSvgIcon('businessman',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/businessman.svg'))
                             .addSvgIcon('writer',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/writer.svg'))
                  .addSvgIcon('teacher',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/teacher.svg'))
                 .addSvgIcon('croupier',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/avatars/croupier.svg'))
                 .addSvgIcon('tennant',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/register-rental.svg'))
                 .addSvgIcon('landlord',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/register-house.svg'))
                 .addSvgIcon('inbox',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/inbox.svg'))
                 .addSvgIcon('contract',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/contract.svg'))
                 .addSvgIcon('box',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/box.svg'))
                 .addSvgIcon('plne',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/plane.svg'))
                 .addSvgIcon('edit',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/wrench.svg'))
                      .addSvgIcon('add-offer',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/signs.svg'))
          .addSvgIcon('my-tennants',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/user.svg'))
        .addSvgIcon('my-offers',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/building.svg'))
        .addSvgIcon('settings',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/settings.svg'))
                         .addSvgIcon('pb',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/pb.svg'))
            .addSvgIcon('pencil',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/pencil.svg'))
            .addSvgIcon('chat',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/interface.svg'))
            .addSvgIcon('auction',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/auction.svg'))
		 		.addSvgIcon('usageFee',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/usageFee.svg'))
		 		.addSvgIcon('mediaFee',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/mediaFee.svg'))
		 		.addSvgIcon('deposit',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/001-money.svg'))
		 		.addSvgIcon('monthlyFee',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/002-clock.svg'))
		 		.addSvgIcon('bed-icon',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/bed_icon.svg'))
		 		.addSvgIcon('home-icon',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/home_icon.svg'))
		 		.addSvgIcon('door-icon',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/door_icon.svg'))
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
         .addSvgIcon('so-nosmoking',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/no-smoking.svg'))
         .addSvgIcon('so-tv',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/tv.svg'))
          .addSvgIcon('so-pets',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/pets.svg'))
         .addSvgIcon('so-wifi',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/wifi.svg'))
         .addSvgIcon('so-garden',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/garden.svg'))
         .addSvgIcon('so-ac',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/ac.svg'))
         .addSvgIcon('so-washer',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/washer.svg'))
         .addSvgIcon('so-gym',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/gym.svg'))
         .addSvgIcon('so-furniture',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/furniture.svg'))
         .addSvgIcon('so-fireplace',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/fireplace.svg'))
         .addSvgIcon('so-parking',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/parking.svg'))
         .addSvgIcon('p-parking',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/parking.svg'))
         .addSvgIcon('p-gym',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/gym.svg'))
          .addSvgIcon('p-hospital',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/hospital.svg'))
         .addSvgIcon('p-pharmacy',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/pharmacy.svg'))
         .addSvgIcon('p-bar',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/bar.svg'))
         .addSvgIcon('p-cafe',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/cafe.svg'))
         .addSvgIcon('p-food',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/food.svg'))
         .addSvgIcon('p-park',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/park.svg'))
         .addSvgIcon('p-atm',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/atm.svg'))
         .addSvgIcon('p-groceryOrSupermarket',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/groceryOrSupermarket.svg'))
         .addSvgIcon('p-shoppingMall',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/shoppingMall.svg'))
         .addSvgIcon('p-school',
            sanitizer.bypassSecurityTrustResourceUrl('./assets/svg/single-offer/nearby/school.svg'))
	}
  title = 'app works!';
  user_id : number;
  accountType : string;
  currentRoute : any;
  getUserId() {
      return new Promise((resolve, reject) => {
          this._auth.user_id$.subscribe(res => {
              this.user_id = res;
              this._message.newMessageSocket(this.user_id);
              this._auth.userAccountType$.subscribe(accountType => {
                this.accountType = accountType;
                this._message.newBidsSocket(this.user_id);
              })
              
              if(res) {
                  resolve(res);

              }
          })
      })
  }

  ngOnInit() {
      this.route.events.subscribe(res=> {
          this.currentRoute = res;
      })
      this._message.newBid$.subscribe(res => {
            
            if(res) {
              this.ngZone.run(()=>{
                  if(this.user_id  && this.accountType === 'landlord') {

                      this.snackbar.open('Nowa oferta wynajmu od: '+res.data.from.split(' ')[0], 'ZAMKNIJ');
                      this._message.clearNewMessage();
                  }
              })
                
            }
            
          })
      this._message.newMessage$.subscribe(res => {
            
            if(res) {
              this.ngZone.run(()=>{
                  if(this.user_id  && this.currentRoute.url.indexOf('inbox')<0) {

                      this.snackbar.open('Nowa wiadomość od: '+res.data.from.split(' ')[0], 'ZAMKNIJ');
                      this._message.clearNewMessage();
                  } else if(this.currentRoute.url.indexOf('inbox')>0) {
                      this._message.clearNewMessage();
                  }
              })
                
            }
            
          })

      this.getUserId().then(id => {
          
      })
    
}
}

