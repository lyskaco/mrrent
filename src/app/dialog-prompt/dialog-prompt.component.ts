import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-dialog-prompt',
  templateUrl: './dialog-prompt.component.html',
  styleUrls: ['./dialog-prompt.component.scss']
})
export class DialogPromptComponent implements OnInit {
  title : string;
  message : string;
  dialog;
  constructor(public _dialog : MdDialogRef<DialogPromptComponent>) { 
  	this.dialog = this._dialog;
  }

  ngOnInit() {
  }

}
