import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { Anuncio } from 'src/app/models/anuncio';
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-listaanuncios',
  templateUrl: './listaanuncios.component.html',
  styles: [
  ]
})
export class ListaanunciosComponent implements OnInit {

  anuncios: Anuncio[];
  loading = false;
  paginador: any;
  idPagina: number;
  ruta: string;
  id: number;
  vacio: boolean;
  constructor(public loginService: OauthService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private anuncioService:AnunciosService) { }

  ngOnInit(): void {

    this.verAnunciosId();
  }

  verAnunciosId(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.id = this.loginService.usuario.id;
      console.log(this.id);
      this.idPagina = page;      
      if(!page){
        page=0;
      }
        this.anuncioService.getAnunciosUsuario(this.id, page).subscribe(response => {
          console.log(response);
          this.loading = false;
          if(response.error === '01'){
            this.vacio= true;
            return;
          }    
          this.vacio= false;
          this.anuncios = response.respuesta.content as Anuncio[];
          this.paginador = response;
          this.ruta= '/anuncios'  

        }, error => {
          console.log(error);
          this.loading = false;
        });
  
    }); 
  }

  verAnuncio(idN:number): void {
    this.router.navigate(['edicionanuncio', idN, this.idPagina]);
  }


  borrarusuario(usuario: Usuarios) {

    /*Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.username,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this.usuarioService.borrar(usuario).subscribe( resp => {
            console.log(resp);
            this.loading = false;
            Swal.fire(
              'Borrado',
              'El usuario ' + usuario.username+ ' ha sido borrado exitosamente',
              'success'
            );
            this. verUsuarios();
        }, error => {
          console.log(error);
          Toast.fire({
            icon: 'error',
            title: `Error al eliminar al usuario`+ usuario.username
          });
          this.loading = false;
        });
        
      }
    });*/
  }



}
