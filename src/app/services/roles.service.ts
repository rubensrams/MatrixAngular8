import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { Roles } from '../models/rol';
import { Observable, throwError } from 'rxjs';
import { URL_MICROSERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roles: Roles[];
  
  constructor(private http: HttpClient) {
    
    this.getRoles().subscribe(roles => {
      console.log(roles);
      this.roles= roles.respuesta as Roles[];
    });

   }

  getRoles(): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/usuarios/mtx-usuarios/obtieneRoles';
    return this.http.get(enpoint).pipe(
      map((response: any) => {
        (response.respuesta as Roles[]).map(roles => {
          roles.nombre = roles.nombre.toUpperCase();
          roles.selected= false;
          return roles;
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

  creaRoles(usuario:Usuarios): any {
    const roles = [];
    let rol= null;
    usuario.roles.forEach((o, i) => {
      i= i+1;
           if(o){
               rol= new Roles();
               rol.id= i;
               roles.push(rol);
           }         
      });
    return roles; 
  }
  

  
  resetRoles(){
    this.roles.forEach( rol=> {      
          rol.selected = false;
    });
  }

}
