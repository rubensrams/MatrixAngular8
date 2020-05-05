import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { Toast } from 'src/app/config/config';
import { OauthService } from '../../services/oauth.service';
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
  
  constructor(private router: Router, private oauthService: OauthService) {
      this.usuario = new Usuarios();
   }

  ngOnInit() {
    _initPlugins();

  }

  ingresar( forma: NgForm): void {
    if ( forma.invalid ) {
        Object.values(forma.controls).forEach( control => {
          control.markAllAsTouched();
        });
        return;
      }
    this.loading = true;
    this.oauthService.login(this.usuario).subscribe( resp => {
      this.oauthService.guardaDataSession(resp.access_token);
      const usuario = this.oauthService.usuario;
      Toast.fire({
        icon: 'success',
        title: `Usuario: ${usuario.username} logueado exitosamente`
      });
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
    });

  }

  
}
