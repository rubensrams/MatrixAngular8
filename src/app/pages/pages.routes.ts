import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { AuthenticacionGuard } from '../guards/authenticacion.guard';
import { UsuariosComponent } from '../pages-admin/usuarios/usuarios.component';
import { EdicionComponent } from '../pages-admin/edicion/edicion.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthenticacionGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'usuarios/:page', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'edicion/:id/:page', component: EdicionComponent, data: { titulo: 'Editar usuario' } },       
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
