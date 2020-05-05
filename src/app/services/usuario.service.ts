import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
   constructor(private http: HttpClient) { }

   registro(usuario: Usuarios): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/crearUsuario';
    return this.http.post<any>(enpoint, usuario);
  }

  verUsuarios(): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/obtieneUsuarios';
    return this.http.get<any>(enpoint);
  }
}
