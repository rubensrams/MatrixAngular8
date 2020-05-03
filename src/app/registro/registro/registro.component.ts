import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { Toast } from 'src/app/config/config';
import { Router } from '@angular/router';
declare function _initPlugins();
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  forma: FormGroup;
  loading = false;
  usuario: Usuarios;
  constructor(private router: Router, private fb: FormBuilder, private validators: ValidatorsService,
              private usuarioService: UsuarioService) {
    this.usuario = new Usuarios();
    this.crearFormulario();

  }

  ngOnInit() {
    _initPlugins();
  }


  crearFormulario() {

    this.forma = this.fb.group({
      usuario: ['', Validators.required],
      completo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required],
      confpassword: ['', Validators.required]

    }, {

      validators: this.validators.samePasswordValidator('password', 'confpassword')

    });
  }

  registrar() {
    console.log(this.forma);
    if ( this.forma.invalid ) {

      Object.values(this.forma.controls).forEach( control => {
        control.markAllAsTouched();
      });

      return;
    }
    console.log(this.usuario);
    this.loading = true;
    this.usuarioService.registro(this.usuario).subscribe( resp => {
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `Usuario creado exitosamente`
      });
      this.loading = false;
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      let mensaje: string;
      if (error.status === 400) {
        if(error.error.error === '02'){
          mensaje = error.error.message;
        }
       }
      Toast.fire({
        icon: 'error',
        title: mensaje
      });
      this.loading = false;
    });
  }

  get nombreNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get correoNoValido() {
    if (this.forma.get('correo').status === 'VALID') {
      return false;
    } else {
      return this.forma.get('correo').errors.pattern  && this.forma.get('correo').touched;
    }
  }
  get correoVacio() {
    if (this.forma.get('correo').status === 'VALID') {
      return false;
    } else {
      return this.forma.get('correo').errors.required && this.forma.get('correo').touched;
    }
  }
  get passwordNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched;
  }
  get confPasswordValido() {
    const p1 = this.forma.get('password').value;
    const p2 = (this.forma.get('confpassword').value === '') ? undefined : this.forma.get('confpassword').value;
    return (p1 === p2 ) ? false : true;
  }

  get completoNoValido() {
    return this.forma.get('completo').invalid && this.forma.get('completo').touched;
  }
}
