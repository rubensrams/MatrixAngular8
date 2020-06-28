import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { Anuncio } from 'src/app/models/anuncio';
import { Toast } from 'src/app/config/config';

@Component({
  selector: 'app-detanuncio',
  templateUrl: './detanuncio.component.html',
  styles: [
  ]
})
export class DetanuncioComponent implements OnInit {
  pagina: number;
  id: number;
  tipo: number;
  clave: number;
  anuncio: Anuncio;
  error = false;
  loading = false;
  totalGaleria = 0;
  constructor(private activatedRoute: ActivatedRoute, private anuncioService: AnunciosService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.tipo = +params.get('tipo');
      this.id = +params.get('id');
      this.pagina = +params.get('page');
      this.clave = +params.get('clave');
    });

    this.getAnuncio(this.clave);

  }


  getAnuncio(id:number) {
    this.loading = true;
    this.anuncioService.getAnuncio(id).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      this.anuncio = resp;
      this.totalGaleria= this.anuncio.galeria.length;
    }, error => {
      this.loading = false;
      this.error = true;
      Toast.fire({
        icon: 'error',
        title: `Error al consultar el anuncio`
      });
    });

  }

}
