import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/config/config';
import { Cita } from 'src/app/models/cita';
import { CitasService } from 'src/app/services/citas.service';
@Component({
  selector: 'app-citaspropias',
  templateUrl: './citaspropias.component.html',
  styles: [
  ]
})
export class CitaspropiasComponent implements OnInit {
  citas: Cita[];
  loading = false;
  paginador: any;
  idPagina: number;
  ruta: string;
  folio: number;
  vacio: boolean;
  constructor(public loginService: OauthService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private citasService:CitasService) { }

  ngOnInit(): void {
    this.verCitasPropiasId();
  }

  verCitasPropiasId(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.folio = this.loginService.usuario.id;
      console.log(this.folio);
      this.idPagina = page;      
      if(!page){
        page=0;
      }
        this.citasService.getCitasPropias(this.folio, page).subscribe(response => {
          console.log(response);
          this.loading = false;
          if(response.error === '01'){
            this.vacio= true;
            return;
          }    
          this.vacio= false;
          this.citas = response.respuesta.content as Cita[];
          this.paginador = response;
          this.ruta= '/citaspropias'  

        }, error => {
          console.log(error);
          this.loading = false;
        });
  
    }); 
  }

  verCita(idN:number): void {
    this.router.navigate(['edicionanuncio', idN, this.idPagina]);
  }

 
  borrarcita(cita: Cita) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de eliminar la cita: ' + cita.folio,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.citasService.borrarCita(cita.folio).subscribe( resp => {
            console.log(resp);
            this.loading = false;
            Swal.fire(
              'Borrado',
              'La cita ' + cita.folio+ ' ha sido eliminada exitosamente',
              'success'
            );
            this.verCitasPropiasId();
        }, error => {
          console.log(error);
          Toast.fire({
            icon: 'error',
            title: `Error al eliminar la cita`+ cita.folio
          });
          this.loading = false;
        });
        
      }
    });
  }

}
