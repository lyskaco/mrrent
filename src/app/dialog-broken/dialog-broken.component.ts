import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-dialog-broken',
  templateUrl: './dialog-broken.component.html',
  styleUrls: ['./dialog-broken.component.scss']
})
export class DialogBrokenComponent implements OnInit {

  constructor(public dialog : MdDialogRef<DialogBrokenComponent>) { }

  ngOnInit() {
  }

}
