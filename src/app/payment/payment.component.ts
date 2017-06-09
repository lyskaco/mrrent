import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { GeneralService } from '../general.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private _router : ActivatedRoute, private _general : GeneralService) { }
  loading : boolean;
  paymentFeedback : string;
  
  retrievePaymentStatus(id) {
  	this.loading = true;
  	this._general.retrievePaymentStatus(id).subscribe(res => {
  			this.loading = false;
  			if(res.status===200) {
            this.paymentFeedback = 'Płatność przebiegła pomyślnie.'
        }
  		})
  }
  getPaymentId() {
  	return new Promise((resolve, reject) => {
  		this._router.params.subscribe(res => {
  			if(res.id) {
  				resolve(res.id);
  			} else {
  				reject('Id not found');
  			}
  		})
  	})
  }
  redirect() {
  	this._general.redirectTo('/');
  }
  ngOnInit() {
  	this.getPaymentId().then(id => {
  		this.retrievePaymentStatus(id);
  	}).catch(reason => {
  		this.redirect();
  	})
  }



}
