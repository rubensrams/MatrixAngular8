import { Pipe, PipeTransform } from '@angular/core';
import { URL_MICROSERVICIOS_NODE } from '../config/config';
@Pipe({
  name: 'imgpreviewanu'
})
export class ImgpreviewanuPipe implements PipeTransform {

   transform(img: string, tipo: string): any {

    let url = URL_MICROSERVICIOS_NODE + '/matrix-upload/anuncio/imagenes';
    
    if(tipo === 'preview'){
      url=url+ '/getPreviewAnuncio/';
    }else{
      url=url+ '/getGaleriaAnuncio/';
    }
  
    if (!img) {
      return url + 'xxx';
    }
   
    return url+img;
  }

}
