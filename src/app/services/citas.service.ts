import { Injectable } from '@angular/core';
import { Cita } from '../models/cita';
import { Observable } from 'rxjs';
import { URL_MICROSERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) { }

  crearCita(cita: Cita): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/citas/mtx-citas/crearCita';
    console.log(enpoint);
      return this.http.post(enpoint, cita).pipe(
        map((response: any) => response.respuesta as Cita)
      )
   }

  getCitasPropias(folio :number, page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/citas/mtx-citas/obtieneCitasUsuarioId/'+folio+'/page/'+page;
    console.log(enpoint);
      return this.http.get(enpoint);
  } 

  getCitasSolicitadas(folio :number, page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/citas/mtx-citas/obtieneCitasUsuarioCompradorId/'+folio+'/page/'+page;
    console.log(enpoint);
      return this.http.get(enpoint);
  }

  borrarCita(folio: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/citas/mtx-citas/eliminarCita/'+folio;
    console.log(enpoint);
      return this.http.delete(enpoint);
  } 

}
