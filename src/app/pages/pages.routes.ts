import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { AuthenticacionGuard } from '../guards/authenticacion.guard';
import { UsuariosComponent } from '../pages-admin/usuarios/usuarios.component';
import { EdicionComponent } from '../pages-admin/edicion/edicion.component';
import { DetanuncioComponent } from './detanuncio/detanuncio.component';
import { CrearanuncioComponent } from './crearanuncio/crearanuncio.component';
import { ListaanunciosComponent } from './listaanuncios/listaanuncios.component';
import { EdicionanuncioComponent } from './edicionanuncio/edicionanuncio.component';
import { CitaspropiasComponent } from './citaspropias/citaspropias.component';
import { CitassolicitadasComponent } from './citassolicitadas/citassolicitadas.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthenticacionGuard],
        children: [
            { path: 'dashboard/:tipo/:id/:page', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'detAnuncio/:clave/:tipo/:id/:page', component: DetanuncioComponent, data: { titulo: 'Detalle anuncio' } }, 
            { path: 'anuncios/:page', component: ListaanunciosComponent, data: { titulo: 'Mis anuncios' } },
            { path: 'crearanuncio', component: CrearanuncioComponent, data: { titulo: 'Crear Anuncio' } },
            { path: 'edicionanuncio/:id/:page', component: EdicionanuncioComponent, data: { titulo: 'Editar anuncio' } },      

            { path: 'citaspropias/:page', component: CitaspropiasComponent, data: { titulo: 'Mis citas para verder mi producto' } },
            { path: 'citassolicitadas/:page', component: CitassolicitadasComponent, data: { titulo: 'Mis citas para comprar un producto' } },

            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'usuarios/:page', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'edicion/:id/:page', component: EdicionComponent, data: { titulo: 'Editar usuario' } },       
            { path: '', redirectTo: '/dashboard/0/0', pathMatch: 'full' }
           // { path: '**', component: DashboardComponent }

        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
