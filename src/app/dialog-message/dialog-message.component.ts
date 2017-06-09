import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {

  offerTitle : string;
  receiver_id : number;
  sender_id : number;
  message : string;

  existingMessages : any;
  isSending : boolean;
  constructor(public _dialog : MdDialogRef<DialogMessageComponent>, private _message : MessageService) { }

  ngOnInit() {
  }
  sendMessage() {
      this.isSending = true;
  		this._message.startConversation(this.receiver_id, this.sender_id, this.offerTitle, this.message).subscribe(res => {
  			this.isSending = false;
        if(res.status === 200) {
            this._dialog.close('Wiadomość została wysłana');
        } else {
            this._dialog.close('Nie udało się wysłać wiadomości, spróbuj ponownie')
        }
  		})
  }

}
