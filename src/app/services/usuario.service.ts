import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS, Toast} from '../config/config';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   constructor(private http: HttpClient) { }

   registro(usuario: Usuarios): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/crearUsuario';
    return this.http.post<any>(enpoint, usuario);
  }

  verUsuarios(page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/obtieneUsuarios/page/'+page;
    return this.http.get<any>(enpoint);
  }

  getUsuarios(page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/obtieneUsuarios/page/'+page;
    return this.http.get(enpoint).pipe(
      map((response: any) => {
        (response.respuesta.content as Usuarios[]).map(usuarios => {
          usuarios.nombre = usuarios.nombre.toUpperCase();
          usuarios.username = usuarios.username.toUpperCase();
          usuarios.email = usuarios.email.toUpperCase();
          usuarios.social = usuarios.social.toUpperCase();
          return usuarios;
        });
        return response;
      })
    ).pipe(
      catchError(err => {
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: 'Servicio no disponible. Intenta mas tarde'
        });
        return throwError(err);
       })
     );;
  }
}
