import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OauthService } from '../services/oauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticacionGuard implements CanActivate {

  constructor(public oaut: OauthService, public router: Router) {

  }

  canActivate(): boolean {
      if (this.oaut.isAuthenticated()) {
         if (this.isTokenExpirado()) {
            this.oaut.logout();
            this.router.navigate(['/login']);
            console.log('AuthenticacionGuard-->Token invalido, Sesion expirada');
            return false;
          }
         console.log('AuthenticacionGuard-->Autenticado');
         return true;
      } else {
        console.log('AuthenticacionGuard--->Sesion expirada');
        this.router.navigate(['/login']);
        return false;
      }
  }


  isTokenExpirado(): boolean{

    let token = this.oaut.token;
    let payload = this.oaut.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }


}
