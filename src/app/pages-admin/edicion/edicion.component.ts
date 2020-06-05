import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from 'src/app/models/usuarios';
import { Toast } from 'src/app/config/config';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styles: [
  ]
})
export class EdicionComponent implements OnInit {

  pagina: number;
  forma: FormGroup;
  id: number;
  loading = false;
  loadingActualizar = false;
  loadingActPassw = false;
  error = false;
  usuario: Usuarios;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private validators: ValidatorsService) { 
    this.crearFormulario();
    
  }

  ngOnInit(): void {
    console.log('entro al initi');
    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = +params.get('page');
      this.id = +params.get('id');
    });
    this.loading = true;
    this.usuarioService.getUsuario(this.id).subscribe( response=> {
      this.loading = false;
      this.usuario = response as Usuarios;
      console.log(this.usuario);
      this.setData();    
    }, error => {
      this.loading = false;
      this.error = true;
      Toast.fire({
        icon: 'error',
        title: `Error al consultar el usuario`
      });
    });   
  }

  crearFormulario() {
    this.forma = this.fb.group({
    usuario: [{value: '', disabled: true}],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    tipocuenta: [{value: '', disabled: true}],  
    activo: [],
    nombre: ['', Validators.required],
    roles: this.fb.array([], this.validators.multipleCheckboxRequireOne)
    });
  }


  guardar(){
    console.log(this.forma);
    this.loadingActualizar = true;
    this.usuarioService.editar(this.usuarioEditar()).subscribe(resp =>  {
      console.log(resp);
      this.router.navigate(['usuarios', this.pagina]);
      this.loadingActualizar = false;
      Toast.fire({
        icon: 'success',
        title: `Datos actualizados exitosamente`
      });
    }, error => {
      this.loadingActualizar = false;
      Toast.fire({
        icon: 'error',
        title: `Error al actualizar el usuario`
      });
    });

  }

//Cree este metodo porque se pierden la referencia de los roles
  usuarioEditar(): Usuarios{
    let usuarioNuevo= new Usuarios();
    usuarioNuevo.id=this.usuario.id;
    usuarioNuevo.nombre=this.forma.value.nombre;
    usuarioNuevo.username= this.usuario.username;
    usuarioNuevo.email= (this.usuario.social !== 'DEFAULT') ? this.usuario.email:this.forma.value.email;
    usuarioNuevo.activo= this.forma.value.activo;
    usuarioNuevo.foto=this.usuario.foto;
    usuarioNuevo.social=this.usuario.social;
    usuarioNuevo.roles=this.forma.value.roles;
  return usuarioNuevo;
  }

  setData(){
    this.agregaRoles();
    this.deshabilitaEmailCuentaSocial();
 
    this.forma.patchValue({
      usuario: this.usuario.username,
      email: this.usuario.email,
      tipocuenta: this.usuario.social,
      activo: this.usuario.activo,
      nombre: this.usuario.nombre,
   });
  }

  

  agregaRoles() {
    this.usuario.roles.forEach((o, i) => {
    const control = new FormControl(o.selected); 
    (this.forma.controls.roles as FormArray).push(control)
   });
  }

deshabilitaEmailCuentaSocial() {
  if(this.usuario.social !== 'DEFAULT'){
    this.forma.controls['email'].disable();
  }
}

  get roles(): FormArray {
    return this.forma.get('roles') as FormArray;
  };

  resetearPassword(){
    this.loadingActPassw = true;
    this.usuarioService.resetearPassord(this.usuario.id).subscribe(resp => {  
      console.log(resp);
      this.loadingActPassw = false;    
      Toast.fire({
        icon: 'success',
        title: `Password reseteado exitosamente`
      });
    }, error => {
      this.loadingActPassw = false;
      Toast.fire({
        icon: 'error',
        title: `Error al resetear el password`
      });
    });
  }


  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get correoNoValido() {
    if (this.forma.get('email').status === 'VALID') {
      return false;
    } else {
      return this.forma.get('email').errors.pattern  && this.forma.get('email').touched;
    }
  }
  get correoVacio() {
    if (this.forma.get('email').status === 'VALID') {
      return false;
    } else {
      return this.forma.get('email').errors.required && this.forma.get('email').touched;
    }
  }

  get rolesValidos() {
    return this.forma.get('roles').invalid && this.forma.get('roles').touched;
  }
}
