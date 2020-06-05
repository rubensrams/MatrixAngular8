import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { URL_MICROSERVICIOS, Toast} from '../config/config';
import { map, catchError, tap } from 'rxjs/operators';
import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   constructor(private http: HttpClient, private rolesService: RolesService) { }

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
        return throwError(err);
       })
     );
  }


  getUsuario(id: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/obtieneUsuarioId/'+id;
    return this.http.get(enpoint).pipe(map((resp: any) => {
      return this.creaSalidaUsuario(resp);
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
       })
     );
  }


  editar(usuario: Usuarios): Observable<any> {    
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/editarUsuario/'+usuario.id;
    usuario.roles = this.rolesService.creaRoles(usuario); 
    console.log(JSON.stringify(usuario));
    return this.http.put<any>(enpoint, usuario).pipe(map((resp: any) => {
     return this.creaSalidaUsuario(resp);
     }),
     catchError(err => {
       console.log(err);
       return throwError(err);
      })
    );
  }

  creaSalidaUsuario(resp:any): Usuarios {
      this.rolesService.resetRoles();
      const usuarioDB: Usuarios = resp.respuesta;
      let rolresp= this.rolesService.roles;
      usuarioDB.roles.forEach( rol=> {      
         rolresp.forEach( rolSer=> {      
         if(rol.id === rolSer.id ){
           rolSer.selected = true;
         }
        });
      });
      usuarioDB.roles = rolresp;
      return usuarioDB;
    }

    
    resetearPassord(id: number): Observable<any> {    
      const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/resetPassword/'+id;
      return this.http.put<any>(enpoint, null);
    }

}
