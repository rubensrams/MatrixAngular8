import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { Toast, URL_MICROSERVICIOS_NODE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private http: HttpClient) { }

  loginFacebook(nombre: string, foto: string, email: string): Observable<any>{
  
    const enpoint = URL_MICROSERVICIOS_NODE + '/matrix/seguridad/login/facebook';
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let params = new HttpParams()
    .set('nombre', nombre)
    .set('img', foto)
    .set('email', email);
    return this.http.post<any>(enpoint, params.toString(), {headers}).pipe(
    catchError(err => {
      let mensaje = err.error.error_description;
      if(mensaje === null || mensaje === undefined) {
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

}
