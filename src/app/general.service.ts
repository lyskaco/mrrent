import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable , BehaviorSubject } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class GeneralService {
 	url : string = '//mrrent.pl/api/api/';
  constructor(private http : Http, private _router : Router) { }
  	redirectTo(location) {
  		this._router.navigateByUrl(location);
  	}
  	getAllAgreements() {
		return this.http.get(this.url + 'agreement/all/') // ...using post request
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
  	retrievePaymentStatus(id) {
  		let data = {
  			id: id
  		}
  		return this.http.post(this.url + 'paymentcheck/', data) // ...using post request
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
  	deleteuserOffer(offer_id) {
  			return this.http.post(this.url + 'offer/delete/', {id: offer_id}) // ...using post request
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
  	bidUserGet(id) {
		return this.http.get(this.url + 'bid/index/'+id) // ...using post request
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
  	bidUpdate(offer_id, tennant_id, status, bid_id, landlord_id) {
  		let data = {
  			offer_id : offer_id,
  			user_id : tennant_id,
  			landlord_id : landlord_id,
  			bidStatus : status,
  			bid_id: bid_id
  		}
  		return this.http.post(this.url + 'bid/update', data) // ...using post request
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
  	bidDelete(id) {
  		let data = {
  			id: id
  		};
  		
  		return this.http.post(this.url + 'bid/delete', data) // ...using post request
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
  	sendBid(data) {
  		return this.http.post(this.url + 'bid/new', data) // ...using post request
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
  	updateUserOffer(data) {
  		
  			return this.http.post(this.url + 'offer/update', data) // ...using post request
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
  	deleteRating(id) {
  		let data = {
  			id: id
  		}
  		return this.http.post(this.url + 'interest/delete/', data ) // ...using post request
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
  	getRatings(user_id) {
  		  		return this.http.get(this.url + 'interest/show/' + user_id ) // ...using post request
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
  	setRating(rate, user_id, offer_id) {
  		let data = {
  			user_id : user_id,
  			rate : rate,
  			offer_id : offer_id
  		}

  			    return this.http.post(this.url + 'interest/new', data) // ...using post request
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
  	selectOffers(data) : Observable<any> {
  		return this.http.get(this.url + 'offer/index/' + data ) // ...using post request
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
  	getUserOffers(data) : Observable<any> {
  		return this.http.get(this.url + 'offer/showUserOffer/' + data ) // ...using post request
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
  	selectSingleOffer(data) : Observable<any> {;
  		return this.http.get(this.url + 'offer/show/' + data ) // ...using post request
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

    createNewOffer(data) : Observable<any>{
     	let headers = new Headers({'Accept': '*/*', 'Access-Control-Allow-Origin': '*' });
     	let options = new RequestOptions({headers: headers});
	    return this.http.post(this.url + 'offer/new', data) // ...using post request
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

	deleteAgreement(id) {
		
		return this.http.post(this.url + 'agreement/delete/', {id: id} ) // ...using post request
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
	
	getUserAgreements(id) {

			return this.http.get(this.url + 'agreement/index/' + id ) // ...using post request
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
	getAgreementDetails(id) {

			return this.http.get(this.url + 'agreement/show/' + id ) // ...using post request
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
}
