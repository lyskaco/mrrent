import { Injectable } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogNotifyComponent} from './dialog-notify/dialog-notify.component';
import {DialogMessageComponent} from './dialog-message/dialog-message.component';
import {DialogMessageAgentComponent} from './dialog-message-agent/dialog-message-agent.component';
import {DialogPromptComponent} from './dialog-prompt/dialog-prompt.component';
import {DialogNewBidComponent} from './dialog-new-bid/dialog-new-bid.component';
import {DialogSummaryComponent} from './dialog-summary/dialog-summary.component';
import {LandlordDetailsDialogComponent} from './landlord-details-dialog/landlord-details-dialog.component';
import {TennantDetailsDialogComponent} from './tennant-details-dialog/tennant-details-dialog.component';
import {DialogCleaningComponent} from './dialog-cleaning/dialog-cleaning.component';
import {DialogBrokenComponent} from './dialog-broken/dialog-broken.component';

@Injectable()
export class DialogService {

  constructor( private _dialog : MdDialog) { }


showDialogCleaning() {
	let dialogRef = this._dialog.open(DialogCleaningComponent);
		return dialogRef.afterClosed();
}
showDialogBroken() {
	let dialogRef = this._dialog.open(DialogBrokenComponent);
		return dialogRef.afterClosed();
}
showDialogMessageAgent(landlord_id, agent_id, ten_id, agr_id) {
	let dialogRef = this._dialog.open(DialogMessageAgentComponent);
		dialogRef.componentInstance.landlord_id = landlord_id;
		dialogRef.componentInstance.agent_id = agent_id;
		dialogRef.componentInstance.ten_id = ten_id;
		dialogRef.componentInstance.agr_id = agr_id;

		return dialogRef.afterClosed();
}
showTennantDetailsDialog(agreement_id, telephone?, idNumber?) {
	let dialogRef = this._dialog.open(TennantDetailsDialogComponent);
	dialogRef.componentInstance.agreement_id = agreement_id;
	dialogRef.componentInstance.idNumber = idNumber;
	return dialogRef.afterClosed();

}
showLandlordDetailsDialog(agreement_id, mortgageNumber?, telephone?, idNumber?, accountNumber?) {
	let dialogRef = this._dialog.open(LandlordDetailsDialogComponent);
	dialogRef.componentInstance.agreement_id = agreement_id;
	dialogRef.componentInstance.mortgageNumber = mortgageNumber;
	dialogRef.componentInstance.idNumber = idNumber;
	dialogRef.componentInstance.accountNumber = accountNumber;
	return dialogRef.afterClosed();
}
showDialogSummary(offerData, user_id) {
	let dialogRef = this._dialog.open(DialogSummaryComponent);
	dialogRef.componentInstance.offerData = offerData;
	dialogRef.componentInstance.user_id = user_id;

	return dialogRef.afterClosed();
}
showDialogBid(offer_id, tennant_id, coreMonthlyFee, coreDeposit, offerAddress, offerTitle) {
	let dialogRef = this._dialog.open(DialogNewBidComponent);
	dialogRef.componentInstance.offer_id = offer_id;
	dialogRef.componentInstance.tennant_id = tennant_id;
	dialogRef.componentInstance.coreDeposit = coreDeposit;
	dialogRef.componentInstance.coreMonthlyFee = coreMonthlyFee;
	dialogRef.componentInstance.offerAddress = offerAddress;
	dialogRef.componentInstance.offerTitle = offerTitle;

	return dialogRef.afterClosed();
}
 showDialogNotify(title, message)  {
	let dialogRef = this._dialog.open(DialogNotifyComponent, {
	})
	dialogRef.componentInstance.title = title;
	dialogRef.componentInstance.message = message;
}
showDialogMessage(receiver_id, sender_id, offerTitle) {
	let dialogRef = this._dialog.open(DialogMessageComponent);
		dialogRef.componentInstance.receiver_id = receiver_id;
		dialogRef.componentInstance.offerTitle = offerTitle;
		dialogRef.componentInstance.sender_id = sender_id;

		return dialogRef.afterClosed();
}

showPromptDialog(title, message) {
	let dialogRef = this._dialog.open(DialogPromptComponent);
		dialogRef.componentInstance.title = title;
		dialogRef.componentInstance.message = message;
		
		return dialogRef.afterClosed();
}
}

