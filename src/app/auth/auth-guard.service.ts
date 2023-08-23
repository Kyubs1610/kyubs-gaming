import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/login/login.service';

@Injectable()

export class AuthGuardService implements CanActivate {  
  constructor(public router: Router,
              public auth: AuthService) {}  

canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }else{
      this.router.navigate(['']);
    return false;
  }}
}