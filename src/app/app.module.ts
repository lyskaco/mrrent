import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MdSliderModule, MdSlideToggleModule, MdSnackBar, MdSnackBarModule, MdButtonModule, MdProgressSpinnerModule, MdInputModule, MdIconModule, MdDialogModule, MdTooltipModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgmCoreModule } from "angular2-google-maps/core";
import {Ng2ScrollimateModule} from 'ng2-scrollimate';
import { MyDatePickerModule } from 'mydatepicker';
import { RecaptchaModule } from 'ng-recaptcha';

//import 'hammerjs';

import {PreventLoggedInAccessService} from './prevent-logged-in-access.service';
import {PreventNotLoggedInAccessService} from './prevent-not-logged-in-access.service';
import {DialogService} from './dialog.service';
import {AuthService} from './auth.service';
import {GeneralService} from './general.service';
import {MessageService} from './message.service';
import {MessageSocketsService} from './message-sockets.service';
import { LandlordDashboardComponent } from './landlord-dashboard/landlord-dashboard.component';
import { TennantDashboardComponent } from './tennant-dashboard/tennant-dashboard.component';
import { LandlordCreateOfferComponent } from './landlord-create-offer/landlord-create-offer.component';
import { SearchOffersComponent } from './search-offers/search-offers.component';
import { OffersFilterPipe } from './offers-filter.pipe';
import {OffersFilterPipeRoomsCount, MoreInfoFilter, OffersFilterPipeBuildingType, OffersFilterPipeSqmtMax, OffersFilterPipeSqmtMin, OffersFilterPipeFeeMin, OffersFilterPipeFeeMax, OffersFilterPipeDepositMin, OffersFilterPipeDepositMax, DetailedPlaceIdFilter} from './offers-filter.pipe';
import { LandlordMyOffersComponent } from './landlord-my-offers/landlord-my-offers.component';
import { SingleOfferComponent } from './single-offer/single-offer.component';
import { DialogNotifyComponent } from './dialog-notify/dialog-notify.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';
import { ParralaxDirective } from './parralax.directive';
import { LandlordEditOfferComponent } from './landlord-edit-offer/landlord-edit-offer.component';
import { DialogPromptComponent } from './dialog-prompt/dialog-prompt.component';
import { DialogNewBidComponent } from './dialog-new-bid/dialog-new-bid.component';
import { LimitToPipe } from './limit-to.pipe';
import { LandlordInboxComponent } from './landlord-inbox/landlord-inbox.component';
import { LandlordMyTennantsComponent } from './landlord-my-tennants/landlord-my-tennants.component';
import { LandlordSettingsComponent } from './landlord-settings/landlord-settings.component';
import { TennantFavoritesComponent } from './tennant-favorites/tennant-favorites.component';
import { TennantInboxComponent } from './tennant-inbox/tennant-inbox.component';
import { TennantPanelComponent } from './tennant-panel/tennant-panel.component';
import { TennantSettingsComponent } from './tennant-settings/tennant-settings.component';
import { InterestOrderByPipe } from './interest-order-by.pipe';
import { DialogSummaryComponent } from './dialog-summary/dialog-summary.component';
import { AgoPipe } from './ago.pipe';
import { LandlordDetailsDialogComponent } from './landlord-details-dialog/landlord-details-dialog.component';
import { TennantDetailsDialogComponent } from './tennant-details-dialog/tennant-details-dialog.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { AgentInboxComponent } from './agent-inbox/agent-inbox.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AgentAgreementsComponent } from './agent-agreements/agent-agreements.component';
import { DayCountdownPipe } from './day-countdown.pipe';
import { DialogMessageAgentComponent } from './dialog-message-agent/dialog-message-agent.component';
import { DialogCleaningComponent } from './dialog-cleaning/dialog-cleaning.component';
import { DialogBrokenComponent } from './dialog-broken/dialog-broken.component';

const appRoutes: Routes = [
 
  { path: 'login', component: LoginComponent, canActivate: [PreventLoggedInAccessService] },
  { path: 'register', component: RegisterComponent, canActivate: [PreventLoggedInAccessService] },
  { path: 'landlord', component: LandlordDashboardComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'landlord/my-offers', component: LandlordMyOffersComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'landlord/inbox', component: LandlordInboxComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'landlord/my-tennants', component: LandlordMyTennantsComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'landlord/settings', component: LandlordSettingsComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'search/:place_id', component: SearchOffersComponent },
  { path: 'offer/:offer_id', component: SingleOfferComponent},
  { path: 'landlord/new-offer', component: LandlordCreateOfferComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'landlord/my-offers/edit/:offer_id', component: LandlordEditOfferComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'tennant', component: TennantDashboardComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'tennant/favorites', component: TennantFavoritesComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'tennant/inbox', component: TennantInboxComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'tennant/panel', component: TennantPanelComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'tennant/settings', component: TennantSettingsComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'agent', component: AgentDashboardComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'agent/panel', component: AgentAgreementsComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'agent/inbox', component: AgentInboxComponent, canActivate: [PreventNotLoggedInAccessService]},
  { path: 'forgot/:token', component: ForgotPasswordComponent, canActivate: [PreventLoggedInAccessService]},
  { path: 'forgot', component: ForgotPasswordComponent, canActivate: [PreventLoggedInAccessService]},
  { path: 'payment/:id', component: PaymentComponent},
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LandlordDashboardComponent,
    TennantDashboardComponent,
    LandlordCreateOfferComponent,
    SearchOffersComponent,
    OffersFilterPipeRoomsCount, MoreInfoFilter, OffersFilterPipeBuildingType, OffersFilterPipeSqmtMax, OffersFilterPipeSqmtMin, OffersFilterPipe, OffersFilterPipeFeeMin, OffersFilterPipeDepositMin, OffersFilterPipeDepositMax, OffersFilterPipeFeeMax, DetailedPlaceIdFilter,
    LandlordMyOffersComponent, 
    SingleOfferComponent, 
    DialogNotifyComponent, DialogMessageComponent, ParralaxDirective, LandlordEditOfferComponent, DialogPromptComponent, DialogNewBidComponent, LimitToPipe, LandlordInboxComponent, LandlordMyTennantsComponent, LandlordSettingsComponent, TennantFavoritesComponent, TennantInboxComponent, TennantPanelComponent, TennantSettingsComponent, InterestOrderByPipe, DialogSummaryComponent, AgoPipe, LandlordDetailsDialogComponent, TennantDetailsDialogComponent, AgentDashboardComponent, AgentInboxComponent, ForgotPasswordComponent, FooterComponent, PaymentComponent, NotFoundComponent, AgentAgreementsComponent, DayCountdownPipe, DialogMessageAgentComponent, DialogCleaningComponent, DialogBrokenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    BrowserAnimationsModule,
    Ng2ScrollimateModule,
    RouterModule.forRoot(appRoutes),
    RecaptchaModule.forRoot(), 
    MdButtonModule, MdSlideToggleModule, MdSnackBarModule, MdSliderModule, MdInputModule, MdIconModule, MdDialogModule, MdTooltipModule, MdProgressSpinnerModule,
     AgmCoreModule.forRoot({
     apiKey: "AIzaSyBLJAPVMwNtdD1UMZ62gLA-onrU4FEtx_4",
     libraries: ["places"]})
  ],
  entryComponents: [DialogCleaningComponent, DialogBrokenComponent, DialogMessageAgentComponent,TennantDetailsDialogComponent,LandlordDetailsDialogComponent, DialogSummaryComponent, DialogNewBidComponent, DialogNotifyComponent, DialogMessageComponent, DialogPromptComponent],
  providers: [{ provide: LOCALE_ID, useValue: "pl" }, MessageSocketsService, MessageService, AuthService, GeneralService, DialogService, PreventLoggedInAccessService, PreventNotLoggedInAccessService, {provide: LocationStrategy, useClass: HashLocationStrategy},],
  bootstrap: [AppComponent]
})
export class AppModule { }
