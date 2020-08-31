import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { URL_MICROSERVICIOS, Toast, URL_MICROSERVICIOS_NODE} from '../config/config';
import { Estado } from '../models/estado';
import { Categoria } from '../models/categoria';
import { Anuncio } from '../models/anuncio';
@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneEstados';
    return this.http.get(enpoint).pipe(
      map((response: any) => response.respuesta as Estado[])
    )
  } 

  getCategorias(): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneCategorias';
    return this.http.get(enpoint).pipe(
      map((response: any) => response.respuesta as Categoria[])
    )
  } 

  getAnuncios(page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneAnuncios/page/'+page;
    console.log(enpoint);
      return this.http.get(enpoint);
  } 

  getAnuncio(id: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneAnuncioId/'+id;
      return this.http.get(enpoint).pipe(
        map((response: any) => response.respuesta as Anuncio)
      )
  } 
  getCategoriaID(id: number, page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneAnunciosCategoriaId/'+id+'/page/'+ page;
    console.log(enpoint);
    return this.http.get(enpoint);
  } 

  getEstadoID(id: number, page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneAnunciosEstadoId/'+id+'/page/'+ page;
    console.log(enpoint);
    return this.http.get(enpoint);
  } 

  crearAnuncios(anuncio: Anuncio): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/crearAnuncio';
    console.log(enpoint);
      return this.http.post(enpoint, anuncio);
  } 

  getAnunciosUsuario(id:number, page: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/obtieneAnunciosUsuarioId/'+id+'/page/'+ page;
    console.log(enpoint);
      return this.http.get(enpoint);
  } 

  editarAnuncio(anuncio: Anuncio): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/editarAnuncio/'+anuncio.id;
    console.log(enpoint);
      return this.http.put(enpoint, anuncio);
  } 

  fileUpload(fileItem: File, id: number) : Observable<any>{
    const url = URL_MICROSERVICIOS_NODE  + '/matrix-upload/anuncio/imagenes/uploadPreviewAnuncio/' +id;
    const formData: FormData = new FormData();
    formData.append('imagen', fileItem, fileItem.name);
    return this.http.put(url, formData, { reportProgress: true });
  }

  fileUploadGaleria(fileItem: File[], id: number) : Observable<any>{
    const url = URL_MICROSERVICIOS_NODE  + '/matrix-upload/anuncio/imagenes/' +id;
    const formData: FormData = new FormData();
    for(let i = 0; i < fileItem.length; i++){
      formData.append('imagen', fileItem[i], fileItem[i].name);
    }    
    return this.http.put(url, formData, { reportProgress: true });
  }

  borrarGaleria(id: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS_NODE + '/matrix-upload/anuncio/imagenes/eliminaImgGaleria/' +id;
    console.log(enpoint);
      return this.http.delete(enpoint);
  } 

  borrarAnuncio(id: number): Observable<any> {
    const enpoint = URL_MICROSERVICIOS + '/matrix/anuncios/mtx-anuncios/eliminarAnuncio/'+id;
    console.log(enpoint);
      return this.http.delete(enpoint);
  } 

}
