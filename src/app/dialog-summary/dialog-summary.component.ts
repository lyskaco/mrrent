import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../general.service';
import { MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-dialog-summary',
  templateUrl: './dialog-summary.component.html',
  styleUrls: ['./dialog-summary.component.scss']
})
export class DialogSummaryComponent implements OnInit {
  user_id : number;
  offerData : any;

  constructor(private _general : GeneralService, public _dialogRef : MdDialogRef<DialogSummaryComponent>) { }

  submit() {

  	this._dialogRef.close(true);
  	
  }
  ngOnInit() {
  	
  }

}
