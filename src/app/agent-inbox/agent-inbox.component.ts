

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MessageService } from '../message.service';
import { MessageSocketsService} from '../message-sockets.service';
import { AuthService } from '../auth.service';
import { DialogService} from '../dialog.service';
import { MdSnackBar} from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-agent-inbox',
  templateUrl: './agent-inbox.component.html',
  styleUrls: ['./agent-inbox.component.scss'],
  animations: [
    trigger('messageWindowAgent', [
        transition(':enter', [
          style({transform: 'translateY(50%)', opacity: 0}),
          animate('500ms  cubic-bezier(0.715, 0.005, 0.130, 1.425)', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateY(50%)', opacity: 0}))
        ])
      ])
     ]
})
export class AgentInboxComponent implements OnInit {

  user_id : number;
  userConversations : any;
  loadingIndicator : boolean;
  currentConversation : any;
  previousConversation : any;
  message : string;
  isSending : boolean;
  subscription;
  constructor(private ngZone : NgZone, private _message : MessageService, private _auth : AuthService, private _dialog : DialogService, private _snack : MdSnackBar) { }

   @ViewChild("messageWindowAgent")
  		public messageWindow: ElementRef;

  ngOnInit() {
  		this.getUserData().then(res=> {
  			this.receiveConversations(res);
  		})


  }
  ngOnDestroy() {
    this._message.clearMessages();
    this.currentConversation = null;
  }
   ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.messageWindow.nativeElement.scrollTop = this.messageWindow.nativeElement.scrollHeight;
        } catch(err) { }                 
    }

  deleteConversation() {
      this._dialog.showPromptDialog('Powiadomienie', 'Czy na pewno chcesz usunąć konwersację?').subscribe(res=>{
        if(res) {
           this._message.deleteConversation(this.currentConversation.thread.id).subscribe(result => {
             if(result.status === 200) {
                  this._message.clearMessages();
                  this.currentConversation = null;
                  this.receiveConversations(this.user_id);
                  this._snack.open('Usunięto konwersację', 'Zamknij', {duration: 1500});
             }
           })
        }
      })
  }
  updateMessage(item) {
  	let receiver_id = item.participants[0],
      part2_id = item.participants[1],
  		sender_id = this.user_id,
  		conversation_id = item.thread.id,
  		message = this.message;

      if(this.message && !(/^\s+$/.test(this.message)) ) {
      this.isSending = true;  
      this._message.updateConversationAgent(conversation_id, sender_id, receiver_id, message, part2_id).subscribe(res=> {
        this.message = '';
        this.isSending = false;

  	  })
     }
  	
  }
  showSingleConversation(item) {
    this._message.clearMessages();
      if(this.previousConversation && item.id !== this.previousConversation.thread.id) {
          this._message.unsubscribe(this.previousConversation.thread.id)
      } 
    let conversation = this.userConversations[this.userConversations.indexOf(item)];
    if(!this.currentConversation || item.id !== this.currentConversation.thread.id) {
  		this._message.showSingleConverationAgent(item.id, this.user_id).then(res => {
  			this.currentConversation = res;
      			if(conversation) {
      				conversation.unread = 0;
      			}

            if(this.subscription) {
              this.subscription.unsubscribe();
            }
             
         this.subscription = this._message.messages$.subscribe(res => {
           if(res && this.currentConversation) {
               this.ngZone.run(() => {
                   console.log(this.currentConversation);
                   console.log(res);
                  this.currentConversation.messages.push(res.data);
               })
           }
          
      })
        this.previousConversation = this.currentConversation;
        this._message.subscribeThread(this.user_id, item.id);
  		})
    }
  }
  receiveConversations(id) {
  	this.loadingIndicator = true;
  	this._message.showAgentConversation(id).subscribe(res=> {
  		if(res.detail.data) {
  			this.userConversations = res.detail.data;
  			console.log(this.userConversations);
  		}
  		this.loadingIndicator = false;
  	})
  }
  getUserData() {
  	return new Promise((resolve, reject) => {
  		this._auth.user_id$.subscribe(res => {
  			if(res) {
  				this.user_id = Number(res);
  				resolve(res);
  			}
  		})
  	})
  }
}
