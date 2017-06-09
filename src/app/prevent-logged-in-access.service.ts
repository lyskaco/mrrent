import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PreventLoggedInAccessService {
  canAccess
  constructor(private authService: AuthService, private route : ActivatedRoute, private router : Router) {

  }
  canActivate() : boolean {
  	this.authService.isLogged$.subscribe(res => this.canAccess = res)
  	if(this.canAccess === true) {
  		this.router.navigateByUrl('')
  	}
    return !this.canAccess;
  }

}
