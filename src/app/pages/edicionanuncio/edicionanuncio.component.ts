import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnunciosService } from '../../services/anuncios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'src/app/config/config';
import { Anuncio } from 'src/app/models/anuncio';
import { Galeria } from '../../models/galeria';

@Component({
  selector: 'app-edicionanuncio',
  templateUrl: './edicionanuncio.component.html',
  styles: [
  ]
})
export class EdicionanuncioComponent implements OnInit {
  forma: FormGroup;
  error: boolean;
  loading: boolean;
  loadingEdo:boolean;
  loadigCat:boolean;
  loadingGuardar:boolean;
  loadingActGal: boolean;
  loadingBorrarImg: boolean;
  estados = [];
  categorias= [];
  id: number;
  page: number;
  anuncio: Anuncio;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;
  fileName: string;
  loadingActFoto = false;
  urls = [];
  galeriaNombres = [];
  totalGaleria=0;
  imagenesGaleriaSubir= [];
  listadoGaleriaAnuncio: Galeria[];

  constructor(private anuncioService: AnunciosService, 
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      this.id= +params.get('id');
      this.page = +params.get('page');
    });

    this.crearFormulario();
    this.getEstados();
    this.getCategorias();
    this.getAnuncio(this.id);


  
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

getAnuncio(id:number) {
  this.loading = true;
  this.anuncioService.getAnuncio(id).subscribe(resp => {
    console.log(resp);
    this.loading = false;
    this.anuncio = resp;
    this.setData();
    this.listadoGaleriaAnuncio= this.anuncio.galeria;
  }, error => {
    this.loading = false;
    this.error = true;
    Toast.fire({
      icon: 'error',
      title: `Error al consultar el anuncio`
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

setData(){
  this.forma.patchValue({
    titulo: this.anuncio.titulo,
    descripcion: this.anuncio.descripcion,
    precio: this.anuncio.precio
 });
 this.forma.controls['estados'].setValue(this.anuncio.estado.id, {onlySelf: true});
 this.forma.controls['categorias'].setValue(this.anuncio.categoria.id, {onlySelf: true});
}

  guardar(){  
    console.log(this.forma);
    this.loadingGuardar = true;

    this.anuncio.titulo = this.forma.value.titulo;
    this.anuncio.descripcion = this.forma.value.descripcion;
    this.anuncio.precio = this.forma.value.precio;
    this.anuncio.estado.id = this.forma.value.estados;
    this.anuncio.categoria.id = this.forma.value.categorias;
    
    this.anuncioService.editarAnuncio(this.anuncio).subscribe( resp=> { 
      this.loadingGuardar = false; 
      console.log(resp);
      this.router.navigate(['anuncios', this.page]);
      Toast.fire({
        icon: 'success',
        title: `Anuncio modificado exitosamente`
      });
    }, error => {
      console.log(error);
      this.loadingGuardar = false;
      Toast.fire({
        icon: 'error',
        title: `Error al modificar el anuncio`
      });
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


  preview(archivo:File){
    if(!archivo){
      this.imagenSubir = null;  
      return;
    }

    if (!this.validateFile(archivo.name)) {
      Toast.fire({
        icon: 'error',
        title: `Seleccione archivos de tipo imagen`
      });
      this.imagenSubir = null;
      return;
    }
    this.fileName= archivo.name;
      // vista previa puro JS
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
          this.imagenTemp = reader.result;
      };
  
      this.imagenSubir = archivo;
    }


    validateFile(name: String) {
      var ext = name.substring(name.lastIndexOf('.') + 1);
      console.log(ext);
      if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'gif') {
          return true;
      }
      else {
          return false;
      }
  }

  cambiarPreview() {
    this.loadingActFoto=true;
    this.anuncioService.fileUpload( this.imagenSubir, this.anuncio.id).subscribe( (resp: any) => {
     console.log(resp);
     this.loadingActFoto=false;
      Toast.fire({
        icon: 'success',
        title: `Preview de anuncio actualizado exitosamente`
      });
    }, error => {
      console.log(error);
      this.loadingActFoto = false;
      Toast.fire({
        icon: 'error',
        title: `Error al actualizar el preview del anuncio`
      });
    });
   }


   onSelectFile(event) {
    this.urls = [];
    this.galeriaNombres=[];
    this.imagenesGaleriaSubir=[];
    if (event.target.files && event.target.files[0]) {
        this.totalGaleria = event.target.files.length;
        for (let i = 0; i < this.totalGaleria; i++) {

          if (!this.validateFile(event.target.files[i].name)) {
            Toast.fire({
              icon: 'error',
              title: `Seleccione archivos de tipo imagen`
            });
            this.imagenSubir = null;
            return;
          }
          this.imagenesGaleriaSubir.push(event.target.files[i]); 
          this.galeriaNombres.push(event.target.files[i].name); 
            var reader = new FileReader();
                reader.onload = (event:any) => {
                   this.urls.push(event.target.result);                   
                }
                reader.readAsDataURL(event.target.files[i]);                 
        }
     }
  }

  borrarImagen(id:number){
    this.loadingBorrarImg=true;
      this.anuncioService.borrarGaleria(id).subscribe( resp=> {
        this.loadingBorrarImg=false;
        console.log(resp);
        this.listadoGaleriaAnuncio = resp.borrado;
        Toast.fire({
        icon: 'success',
        title: `Imagen eliminada exitosamente`});
      }, error => {
        this.loadingBorrarImg=false;
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: `Error al borrar la imagen del anuncio`
        });
      });
  }

  subeGaleria() {
    this.loadingActGal=true;
    this.anuncioService.fileUploadGaleria( this.imagenesGaleriaSubir, this.anuncio.id).subscribe( (resp: any) => {
     console.log(resp);
     this.loadingActGal=false;
     this.listadoGaleriaAnuncio = resp.galeria;
     this.urls = [];
     this.galeriaNombres=[];
     this.totalGaleria =0;
      Toast.fire({
        icon: 'success',
        title: `Galeria de anuncio actualizada exitosamente`
      });
    }, error => {
      console.log(error);
      this.loadingActGal = false;
      Toast.fire({
        icon: 'error',
        title: `Error al actualizar la preview del anuncio`
      });
    });
   }

}
