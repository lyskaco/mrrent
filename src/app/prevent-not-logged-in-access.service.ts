import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PreventNotLoggedInAccessService {
  canAccess
  accountType : string = JSON.parse(sessionStorage.getItem('userAccountType'));
  constructor(private authService: AuthService, private route : ActivatedRoute, private router : Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    this.authService.userAccountType$.subscribe(res=> this.accountType = res)
  	this.authService.isLogged$.subscribe(res => this.canAccess = res)
  	if(this.canAccess !== true || state.url.indexOf(this.accountType) !== 1 ) {
  		   this.router.navigateByUrl('');
  	  }
    return this.canAccess;
  }

}
