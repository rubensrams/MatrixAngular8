import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS, CRED_CLIENTE_MICROSERVICIOS, Toast } from '../config/config';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private _usuario: Usuarios;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  login(usuario: Usuarios): Observable<any>{
    const enpoint = URL_MICROSERVICIOS + '/matrix/seguridad/oauth/token';
    const credenciales = btoa(CRED_CLIENTE_MICROSERVICIOS);
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    Authorization : 'Basic ' + credenciales});

    let params = new HttpParams()
    .set('username', usuario.username)
    .set('password', usuario.password)
    .set('grant_type', 'password');
    return this.http.post<any>(enpoint, params.toString(), {headers}).pipe(
    catchError(err => {
      let mensaje;
      if(err.status === 400) {
        mensaje = err.error.error_description;
      } else {
        mensaje = 'Servicio no disponible. Intenta mas tarde';
      }
      Toast.fire({
        icon: 'error',
        title: mensaje
      });
      return throwError(err);
     })
   );
}

guardaDataSession(accessToken: string): void {

  let payload= this.obtenerDatosToken(accessToken);
  this._usuario = new Usuarios();
  this._usuario.nombre = payload.nombre;
  this._usuario.email = payload.correo;
  this._usuario.username = payload.user_name;
  this._usuario.id = payload.id;
  this._usuario.roles = payload.authorities;
  sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  sessionStorage.setItem('token', accessToken);
}

obtenerDatosToken(accessToken: string): any {
  if (accessToken !== null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
  }
  return null;
}

logout(): void {
  this._usuario = null;
  this._token = null;
  sessionStorage.clear();
}

/*Nomenclatura especifica get y set */

public get usuario(): Usuarios {

  if(this._usuario != null) {
      return this._usuario;
  } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
    this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuarios;
    return this._usuario;
  }
  return new Usuarios();
}

public get token(): string {
  
  if(this._token != null) {
      return this._token;
  } else if (this._token == null && sessionStorage.getItem('token') != null) {
    this._token = sessionStorage.getItem('token');
    return this._token;
  }
  return null;
  }

  hasRole(role: string): boolean {
    if (this._usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    let payload= this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name ) {
        return true;
    }
    return false;
  }

}
