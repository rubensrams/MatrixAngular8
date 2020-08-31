import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.routes';
import { LayoutModule } from '../layout/layout.module';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from '../pages-admin/usuarios/usuarios.component';
import { PaginadorComponent } from '../pages-admin/paginador/paginador.component';
import { EdicionComponent } from '../pages-admin/edicion/edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { DetanuncioComponent } from './detanuncio/detanuncio.component';
import { PaginadordashComponent } from './paginadordash/paginadordash.component';
import { CrearanuncioComponent } from './crearanuncio/crearanuncio.component';
import { ListaanunciosComponent } from './listaanuncios/listaanuncios.component';
import { EdicionanuncioComponent } from './edicionanuncio/edicionanuncio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CitassolicitadasComponent } from './citassolicitadas/citassolicitadas.component';
import { CitaspropiasComponent } from './citaspropias/citaspropias.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent,
    UsuariosComponent,
    PaginadorComponent,
    EdicionComponent,
    DetanuncioComponent,
    PaginadordashComponent,
    CrearanuncioComponent,
    ListaanunciosComponent,
    EdicionanuncioComponent,
    CitassolicitadasComponent,
    CitaspropiasComponent],
  exports: [
],
  imports: [
    CommonModule,
    LayoutModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    NgbModule
  ]
})
export class PagesModule { }
