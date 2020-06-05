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


@NgModule({
  declarations: [
    DashboardComponent, 
    PagesComponent,
    UsuariosComponent,
    PaginadorComponent,
    EdicionComponent],
  exports: [
],
  imports: [
    CommonModule,
    LayoutModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
