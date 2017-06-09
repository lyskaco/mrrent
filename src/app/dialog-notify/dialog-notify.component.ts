import { Component, OnInit } from '@angular/core';
import { MdDialog} from '@angular/material';
@Component({
  selector: 'app-dialog-notify',
  templateUrl: './dialog-notify.component.html',
  styleUrls: ['./dialog-notify.component.scss']
})
export class DialogNotifyComponent implements OnInit {
  title : string;
  message : string;
  constructor(public _dialog : MdDialog) { }

  ngOnInit() {
  }

}
