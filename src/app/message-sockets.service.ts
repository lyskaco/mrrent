declare var Pusher: any;
import { Injectable, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class MessageSocketsService {
    private pusher: any;
    private channel : any;
    private messages: BehaviorSubject<any> = new BehaviorSubject(null);
    public messages$: Observable<any> = this.messages.asObservable();
    private threads: BehaviorSubject<any> = new BehaviorSubject(null);
    public threads$: Observable<any> = this.threads.asObservable();
    constructor() {

        this.pusher = new Pusher('42124a8ff018cab8faf9', {
            cluster: 'eu',
            encrypted: true
        });
        this.pusher.logToConsole = true;
    }

    sendMessage(user_id) {
        var channel = this.pusher.subscribe('user_'+user_id);
        console.log(channel);
        console.log(user_id);
        channel.bind('newMessage',  (data) => {
            console.log('asd');
            this.messages.next(data.message);
        });
    }
}
