import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { Toast, URL_MICROSERVICIOS_NODE } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  loginGoogle(token): Observable<any>{
  
    const enpoint = URL_MICROSERVICIOS_NODE + '/matrix/seguridad/login/google';
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let params = new HttpParams()
    .set('token', token);
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
