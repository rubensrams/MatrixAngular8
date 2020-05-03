import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS, CRED_CLIENTE_MICROSERVICIOS } from '../config/config';
import { Roles } from '../models/rol';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  
  login(usuario: Usuarios): Observable<any> {
        const enpoint = URL_MICROSERVICIOS + '/matrix/seguridad/oauth/token';
        const credenciales = btoa(CRED_CLIENTE_MICROSERVICIOS);
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
        Authorization : 'Basic ' + credenciales});

        let params = new HttpParams()
        .set('username', usuario.username)
        .set('password', usuario.password)
        .set('grant_type', 'password');
        return this.http.post<any>(enpoint, params.toString(), {headers});
  }


  registro(usuario: Usuarios): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/crearUsuario';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(enpoint, usuario, {headers});
}



}
