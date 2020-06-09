import { Pipe, PipeTransform } from '@angular/core';
import { URL_MICROSERVICIOS_NODE } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {

    let url = URL_MICROSERVICIOS_NODE + '/matrix/upload/usuario/getFotoProfile/';

    if (!img) {
      return url + 'xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
   
    return url+img;
  }

}
