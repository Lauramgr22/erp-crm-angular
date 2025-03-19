import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if(!this.authService.user || !this.authService.token){
      this.authService.logout();
      return false; //no se puede acceder a la vista sino encuentra algun usuario o token
    }

    let token = this.authService.token;
    let expiration= (JSON.parse(atob(token.split(".")[1]))).exp;
    if(Math.floor((new Date().getTime()/1000)) >=expiration){
      this.authService.logout();
      return false; //valida la expiracion del token y redirige a salida
    }

    return true;
  }
}
