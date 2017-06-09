declare var Pusher: any;
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable , BehaviorSubject } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {
  url : string = '//mrrent.pl/api/api/'
  private pusher: any;
  private channel : any;
  private channelNewMessages : any;
  private previousThread_id : number;
  private newBid : BehaviorSubject<any> = new BehaviorSubject(null);
  public newBid$: Observable<any> = this.newBid.asObservable();
  private messages: BehaviorSubject<any> = new BehaviorSubject(null);
  public messages$: Observable<any> = this.messages.asObservable();
  private newMessage: BehaviorSubject<any> = new BehaviorSubject(null);
  public newMessage$: Observable<any> = this.newMessage.asObservable();

  constructor(private http: Http) { 

       this.pusher = new Pusher('42124a8ff018cab8faf9', {
            cluster: 'eu',
            encrypted: true
        });
       this.pusher.logToConsole = true;
       

  }
    newBidsSocket(user_id) {
        this.pusher.unsubscribe('bids_'+user_id);
        this.channelNewMessages = this.pusher.subscribe('bids_' + user_id);
        this.channelNewMessages.bind('newBid',  (data) => {
            this.newBid.next(data);
            console.log(data);
         });
    }
    newMessageSocket(user_id) {
        this.pusher.unsubscribe('user_'+user_id);
        console.log('asd');
        this.channelNewMessages = this.pusher.subscribe('user_' + user_id);
        this.channelNewMessages.bind('newMessage',  (data) => {
            this.newMessage.next(data);
         });

    }
    clearNewMessage() {
      this.newMessage.next(null);
    }
    clearMessages() {
      this.messages.next(null)
    }
    unsubscribe(thread_id) {
        this.pusher.unsubscribe('thread_' +thread_id);
    }

    subscribeThread(user_id, thread_id) {
      
      this.pusher.unsubscribe('thread_' +this.previousThread_id);
      this.previousThread_id = thread_id;
      this.channel = this.pusher.subscribe('thread_' +thread_id);
      this.channel.bind('thread_' +thread_id,  (data) => {
          this.messages.next(data);
        });
    }



  deleteConversation(thread_id) {
     let data = {
         thread_id : thread_id
      }

    return this.http.post(this.url + 'messages/thread/delete/', data) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }
  updateConversationAgent(conversation_id, sender_id, receiver_id, message, tennant_id) {

      let data = {
        user_id: Number(sender_id),
        part_id: receiver_id,
        part2_id: tennant_id,
        message: message
      }
      console.log(data);

    return this.http.post(this.url + 'agentMessages/thread/update/'+conversation_id, data) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }

  updateConversation(conversation_id, sender_id, receiver_id, message, agent_id?) {

  		let data = {
  			user_id: Number(sender_id),
  			part_id: receiver_id,
        part2_id: agent_id,
  			message: message
  		}
      console.log(data);

		return this.http.post(this.url + 'messages/thread/update/'+conversation_id, data) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }
   showSingleConverationAgent(conversation_id, user_id) {

      return this.http.get(this.url + 'agentMessages/thread/show/'+conversation_id+'/'+user_id) 
              .map((res:Response) =>  res.json()).toPromise()
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }
  showSingleConveration(conversation_id, user_id) {

  		return this.http.get(this.url + 'messages/thread/show/'+conversation_id+'/'+user_id) 
              .map((res:Response) =>  res.json()).toPromise()
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }

  showAgentConversation(user_id) {
      return this.http.get(this.url + 'agentMessages/index/'+user_id) 
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) 
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }
  showUserConversation(user_id) {
  			return this.http.get(this.url + 'messages/index/'+user_id) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });
  }
  startConversationAgent(landlord_id, agent_id, subject, message, ten_id, agr_id) {

      let data = {
        id: agent_id,
        ten_id : ten_id,
        subject: subject,
        message: message,
        agreement_id : agr_id
      }
      console.log(data);

    return this.http.post(this.url + 'agentMessages/'+landlord_id, data) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });

  }
  startConversation(receiver_id, sender_id, subject, message) {

  		let data = {
  			id: sender_id,
  			user_id: sender_id,
  			subject: subject,
  			message: message
  		}

		return this.http.post(this.url + 'messages/'+receiver_id, data) // ...using post request
              .map((res:Response) =>  {
                 let details = {
                   status : res.status,
                   detail : res.json()
                 } 
                 return details;
                 }) // ...and calling .json() on the response to return data
              .catch((error:any) => {
                let details = {detail:error.json(),status: error.status};
                return Observable.of(details);
     });

  }

}
