import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-dialog-cleaning',
  templateUrl: './dialog-cleaning.component.html',
  styleUrls: ['./dialog-cleaning.component.scss']
})
export class DialogCleaningComponent implements OnInit {

  constructor(public dialog : MdDialogRef<DialogCleaningComponent>) { }

  ngOnInit() {
  }

}
