import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-dialog-message-agent',
  templateUrl: './dialog-message-agent.component.html',
  styleUrls: ['./dialog-message-agent.component.scss']
})
export class DialogMessageAgentComponent implements OnInit {


  offerTitle : string;
  landlord_id : number;
  agent_id : number;
  ten_id : number;
  agr_id : number;
  message : string;


  existingMessages : any;
  isSending : boolean;
  constructor(public _dialog : MdDialogRef<DialogMessageAgentComponent>, private _message : MessageService) { }


  ngOnInit() {
  }

  sendMessage() {
      this.isSending = true;
  		this._message.startConversationAgent(this.landlord_id, this.agent_id, 'Wiadomość od Agenta', this.message, this.ten_id, this.agr_id).subscribe(res => {
  			this.isSending = false;
        if(res.status === 200) {
            this._dialog.close('Wiadomość została wysłana');
        } else {
            this._dialog.close('Nie udało się wysłać wiadomości, spróbuj ponownie')
        }
  		})
  }
}

