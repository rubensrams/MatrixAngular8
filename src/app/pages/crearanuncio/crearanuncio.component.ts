import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { AnunciosService } from '../../services/anuncios.service';
import { Toast } from 'src/app/config/config';
import { Anuncio } from '../../models/anuncio';
import { Categoria } from 'src/app/models/categoria';
import { Estado } from 'src/app/models/estado';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuarios } from '../../models/usuarios';
import { OauthService } from '../../services/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styles: [
  ]
})
export class CrearanuncioComponent implements OnInit {

  forma: FormGroup;
  error: boolean;
  loading: boolean;
  loadingEdo:boolean;
  loadigCat:boolean;
  loadingGuardar:boolean;
  estados = [];
  categorias= [];

  constructor(private fb: FormBuilder, 
              private anuncioService:AnunciosService, 
              private loginService:OauthService,
              private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getEstados();
    this.getCategorias();

  }

  crearFormulario() {
      this.forma = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      estados: ['', Validators.required],
      categorias: ['', Validators.required]}
    )
  };

 

  guardar(){  
    let anuncio = new Anuncio();
    let estado = new Estado();
    let categoria = new Categoria();
    let usuario = new Usuarios();
    estado.id= this.forma.value.estados;
    categoria.id= this.forma.value.categorias;
    usuario.id = this.loginService.usuario.id;

    this.loadingGuardar = true;
    anuncio.titulo = this.forma.value.titulo;
    anuncio.descripcion = this.forma.value.descripcion;
    anuncio.precio = this.forma.value.precio;
    anuncio.estado = estado;
    anuncio.categoria = categoria;
    anuncio.usuario = usuario;
    
    this.anuncioService.crearAnuncios(anuncio).subscribe( resp=> { 
      console.log(resp);
      this.loadingGuardar = false; 
      this.router.navigate(['anuncios', 0]);
      Toast.fire({
        icon: 'success',
        title: `Anuncio creado exitosamente`
      });
    }, error => {
      console.log(error);
      this.loadingGuardar = false;
      Toast.fire({
        icon: 'error',
        title: `Error al crear el anuncio`
      });
    });
  }

  getEstados(): void {
    this.loadingEdo = true;
    this.anuncioService.getEstados().subscribe( edo => {        
      console.log(edo);
      this.loadingEdo= false;
      this.estados = edo;
    }, error => {
      console.log(error);
      this.loadingEdo= false;
      Toast.fire({
        icon: 'error',
        title: `Error al cargar los estados`
      });
    })
  }


  getCategorias(): void {
      this.loadigCat= true; 
        this.anuncioService.getCategorias().subscribe( cat => {   
          this.loadigCat= false; 
          console.log(cat);
          this.categorias = cat;
        }, error => {
          console.log(error);
          this.loadigCat= false;
          Toast.fire({
            icon: 'error',
            title: `Error al cargar las categorias`
          })
        });
  }

  get tituloNoValido() {
    return this.forma.get('titulo').invalid && this.forma.get('titulo').touched;
  }

  get descNoValido() {
    return this.forma.get('descripcion').invalid && this.forma.get('descripcion').touched;
  }

  get precioNoValido() {
    return this.forma.get('precio').invalid && this.forma.get('precio').touched;
  }

  get estadosNoValido() {
    return this.forma.get('estados').invalid && this.forma.get('estados').touched;
  }
  get catNoValido() {
    return this.forma.get('categorias').invalid && this.forma.get('categorias').touched;
  }
}
