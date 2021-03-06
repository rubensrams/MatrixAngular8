import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS, CRED_CLIENTE_MICROSERVICIOS, Toast, URL_MICROSERVICIOS_NODE } from '../config/config';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError  } from 'rxjs/operators';
import { Roles } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private _usuario: Usuarios;
  private roles: Roles;
  private _token: string;
  private _ls: string;

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
      console.log(err);
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


guardaDataSession(accessToken: string, lsocial: string): void {
  let payload;
    /*if(lsocial === '1'){
      payload= this.obtenerDatosToken(accessToken).usuario;
    }else{
      payload=  this.obtenerDatosToken(accessToken);
    }*/
  payload=  this.obtenerDatosToken(accessToken);

  this._usuario = new Usuarios();
  this._usuario.nombre = payload.nombre;
  this._usuario.foto = payload.foto;
  this._usuario.email = payload.correo;
  this._usuario.username = payload.user_name;
  this._usuario.id = payload.id;
  this._usuario.roles = payload.authorities;
  sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  sessionStorage.setItem('token', accessToken);
  sessionStorage.setItem('ls', lsocial);
}


updateDataSession(nombre?: string, email?: string, foto?:string): void {
  let usuarioMod= this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuarios
  usuarioMod.nombre = (nombre===null)? usuarioMod.nombre: nombre;
  usuarioMod.email = (email===null)? usuarioMod.email: email;
  usuarioMod.foto = (foto===null)? usuarioMod.foto: foto;
  sessionStorage.setItem('usuario', JSON.stringify(usuarioMod));
}

obtenerDatosToken(accessToken: string): any {
  if (accessToken !== null) {
       try{
        return  JSON.parse(atob(accessToken.split('.')[1]));
       }catch(ex){
        console.log(ex);
        return null;
       }
      
  }

}

logout(): void {
  this._usuario = null;
  this._token = null;
  this._ls = null;
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

  public get ls(): string {
  
    if(this._ls != null) {
        return this._ls;
    } else if (this._ls == null && sessionStorage.getItem('ls') != null) {
      this._ls = sessionStorage.getItem('ls');
      return this.ls;
    }
    return null;
    }

  hasRole(role: string,): boolean {
    if (this._usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  hasRoleDos(role: string, role2: string,): boolean {
    if (this._usuario.roles.includes(role) || this._usuario.roles.includes(role2)) {
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    let ls= sessionStorage.getItem('ls');
    let payload;
    /*if(ls === '1' ){
      payload= this.obtenerDatosToken(this.token).usuario;
    }else{
      payload= this.obtenerDatosToken(this.token);

    }*/
    payload= this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name ) {
        return true;
    }
    return false;
  }

}
