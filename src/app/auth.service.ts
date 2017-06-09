import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable , BehaviorSubject } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private isLogged = new BehaviorSubject(JSON.parse(sessionStorage.getItem('isLogged')));
  private userToken = new BehaviorSubject(JSON.parse(sessionStorage.getItem('userToken')));
  private user_id = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user_id')));
  private userAccountType = new BehaviorSubject(JSON.parse(sessionStorage.getItem('userAccountType')));
  private userAvatar = new BehaviorSubject(JSON.parse(sessionStorage.getItem('userAvatar')));
  private savedOffer = new BehaviorSubject(null);
  userAvatar$ = this.userAvatar.asObservable();
  savedOffer$ = this.savedOffer.asObservable();
  user_id$ = this.user_id.asObservable();
  isLogged$ = this.isLogged.asObservable();
  userToken$ = this.userToken.asObservable();
  userAccountType$ = this.userAccountType.asObservable();
  url : string = '//mrrent.pl/api/api/';
  
  constructor(private http: Http, private router : Router) { }



setAvatar(string) {
  sessionStorage.setItem('userAvatar', JSON.stringify(string));
  this.userAvatar.next(string);
}
forgotPasswordToken(data) {

       return this.http.post(this.url + 'password/email', data) // ...using post request
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
forgotPasswordRestore(data) {

     return this.http.post(this.url + 'password/reset', data) // ...using post request
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

changeSavedOffer(data : any) {
  console.log(data);
  this.savedOffer.next(data);
}
updateAgreementData(data) {
    return this.http.post(this.url + 'agreement/update', data) // ...using post request
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
changeLoginStatus (isLogged: boolean) {
      sessionStorage.setItem('isLogged', JSON.stringify(isLogged));    
      this.isLogged.next(isLogged);
      if(isLogged === true) {
          //this.router.navigateByUrl('dashboard')
      } else if(isLogged === false) {
          //this.router.navigateByUrl('');
          sessionStorage.removeItem('userToken');
          sessionStorage.removeItem('userAccountType');
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('userAvatar');
      }
  } 
  


  setUserObject (object: any) {
      let path = object.accountType || '';
      this.router.navigateByUrl(path);
      sessionStorage.setItem('userToken', JSON.stringify(object.token)); 
      sessionStorage.setItem('userAccountType', JSON.stringify(object.accountType));
      sessionStorage.setItem('user_id', JSON.stringify(object.id));
      this.userToken.next(object.token); 
      this.userAccountType.next(object.accountType);
      this.user_id.next(object.id);
  } 
  
  register(params) : Observable<any>{
     
  
  let data = {
      email : params.email,
      password : params.password,
      accountName : params.accountName,
      firstName : params.firstName,
      lastName : params.lastName,
      accountType : params.accountType,
      telephoneNumber : params.telephone
   }



    return this.http.post(this.url + 'auth/register', data) // ...using post request
                          .map((res:Response) =>  {
                             let details = {
                               status : res.status,
                               detail : res.json()
                             } 
                             console.log(details);
                             return details;
                             }) // ...and calling .json() on the response to return data
                          .catch((error:any) => {
                            let details = {detail:error.json(),status: error.status};
                            return Observable.of(details);
                     });
}


	login(data) : Observable<any> {
  		let loginData = data;

  		return this.http.post(this.url + 'auth/login', loginData) // ...using post request
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
 updateAccount(object : any, id : any) : Observable<any> {

      let data = {
        id : id,
        avatarUrl : object.avatar,
        newPassword : object.password,
        oldPassword : object.oldPassword
        
      }
      return this.http.post(this.url + 'auth/update', data) // ...using post request
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
	getUser(data) : Observable<any> {
  		let token = data;

  		return this.http.get(this.url + 'user?token=' + token) // ...using post request
                     .map((res:Response) =>  { return res.json()}) // ...and calling .json() on the response to return data
                     .catch((error:any) => error.json());



}
}
