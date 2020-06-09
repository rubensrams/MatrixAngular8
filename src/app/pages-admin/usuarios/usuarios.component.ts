import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/config/config';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[];
  loading = false;
  paginador: any;
  idPagina: number;
  constructor(public usuarioService: UsuarioService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.verUsuarios();
  }

  verUsuarios(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.idPagina = page;      
      if(!page){
        page=0;
      }
        this.usuarioService.getUsuarios(page).subscribe(response => {
          this.usuarios = response.respuesta.content as Usuarios[];
          this.paginador = response;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
  
    }); 
  }

  verUsuario(idN:number): void {
    this.router.navigate(['edicion', idN, this.idPagina]);
  }


  borrarusuario(usuario: Usuarios) {
    // validando que no te puedas borrar a ti mismo

  /*  if ( usuario._id === this.usuariosService.usuario._id) {
      Swal.fire('No puede borrar el usuario', 'No se puede borrrar a si mismo', 'error');
      return;
    }*/

    Swal.fire({
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
    });
  }



}
