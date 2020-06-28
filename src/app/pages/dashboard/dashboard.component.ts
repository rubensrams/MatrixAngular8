import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../services/oauth.service';
import { AnunciosService } from '../../services/anuncios.service';
import { Estado } from 'src/app/models/estado';
import { Categoria } from '../../models/categoria';
import { Toast } from 'src/app/config/config';
import { Router, ActivatedRoute } from '@angular/router';
import { Anuncio } from '../../models/anuncio';
declare function _initPlugins();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  estados: Estado[] = [];
  categorias: Categoria[] = [];
  anuncios: Anuncio[] = [];
  loadigCat: boolean; 
  loadingEdo: boolean;
  loadingAnu: boolean;
  vacio: boolean;
  paginador: any;
  idPagina: number;

  ruta: string;
  tipo: number;
  id: number;

  constructor(public oauthService:OauthService, 
              public anuncioService: AnunciosService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    
    this.verCategorias();
    this.verEstados();    
   }

   ngOnInit() {
    _initPlugins();
    this.anunciosInit();
  }


  verDetalle(idN:number): void {
    this.router.navigate(['detAnuncio', idN, this.tipo, this.id, this.idPagina]);
  }

  verEstados(): void {
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

  verCategorias(): void {
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
  anunciosInit(){

    this.activatedRoute.paramMap.subscribe(params => {
      let tipo: number = +params.get('tipo'); 
      let id: number = +params.get('id'); 
      let page: number = +params.get('page'); 
      this.ruta= '/dashboard'  
      if(!page){
        page=0;
      }
      this.idPagina = page; 
      if(id == 0){
        this.anunciosTodos(0, page);
      }else{
        if(tipo == 1){
          this.anunciosTodos(0, page);
        }else if (tipo==2) {
          this.anunciosCategoria(id, page); 
        }else{
          this.anunciosEstados(id, page);
        }
      }
    }); 
  }



  anunciosTodos(id: number, page:number){
    this.loadingAnu = true;
    this.anuncioService.getAnuncios(page).subscribe(response => {
      console.log(response);
      this.loadingAnu= false;
      if(response.error === '01'){
        this.vacio= true;
        return;
      }     
      this.vacio= false;
      this.anuncios = response.respuesta.content  as Anuncio[];
      this.paginador = response;
      this.tipo = 1;
      this.id = 0;
    }, error => {
      console.log(error);
      this.loadingAnu = false;
      Toast.fire({
        icon: 'error',
        title: `Error al cargar los anuncios`
      });
    });
  }


  anunciosCategoria(id: number, page:number){
    this.loadingAnu= true;
    console.log(id);
    this.anuncioService.getCategoriaID(id, page).subscribe(resp => {
      console.log(resp);      
      this.loadingAnu= false;
      if(resp.error === '01'){
        this.vacio= true;
        return;
      }     
      this.vacio= false;
      this.anuncios = resp.respuesta.content  as Anuncio[];
      this.paginador = resp;
      this.tipo = 2;
      this.id = id;

    }, error => {
      console.log(error);
      this.loadingAnu= false;
      Toast.fire({
        icon: 'error',
        title: `Error al cargar los anuncios`
      })
    });
  }

  anunciosEstados(id: number, page:number){
    this.loadingAnu= true;
    console.log(id);
    this.idPagina=0;
    this.anuncioService.getEstadoID(id, page).subscribe(resp => {
      console.log(resp);
      this.loadingAnu= false;
      if(resp.error === '01'){
        this.vacio= true;
        return;
      }      
      this.vacio= false;
      this.anuncios = resp.respuesta.content  as Anuncio[];
      this.paginador = resp;
      this.tipo = 3;
      this.id = id;

    }, error => {
      console.log(error);
      this.loadingAnu= false;
      Toast.fire({
        icon: 'error',
        title: `Error al cargar los anuncios`
      })
    });
  }

  busqueda(tipo: number, id: number, page: number){
    this.router.navigate(['/dashboard', tipo, id, page]);
  }
}
