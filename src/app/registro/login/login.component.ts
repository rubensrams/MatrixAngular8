import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Toast } from 'src/app/config/config';
declare function _initPlugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  usuario: Usuarios;
  loading = false;
  Toast: any;
  
  constructor(private router: Router, private usuarioService: UsuarioService) {
      this.usuario = new Usuarios();
   }

  ngOnInit() {
    _initPlugins();
    console.log('entro');

  }

  ingresar( forma: NgForm): void {
    if ( forma.invalid ) {
        Object.values(forma.controls).forEach( control => {
          control.markAllAsTouched();
        });
        return;
      }
    this.loading = true;
    this.usuarioService.login(this.usuario).subscribe( resp => {
      console.log(resp);
      let payload= JSON.parse(atob(resp.access_token.split('.')[1]));
      this.router.navigate(['/dashboard']);
      Toast.fire({
        icon: 'success',
        title: `Usuario: ${payload.username} logueado exitosamente`
      });
    }, error => {

      let mensaje;
      if(error.status === 400) {
        mensaje = 'Usuario o password incorrecto';
      } else {
        mensaje = 'Servicio no disponible. Intenta mas tarde';
      }
      Toast.fire({
        icon: 'error',
        title: mensaje
      });
      this.loading = false;
    });

  }

  
}
