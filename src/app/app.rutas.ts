import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './registro/login/login.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { NopagefoundComponent } from './registro/nopagefound/nopagefound.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistroComponent },
    // Para el lazy load las paginas del pages routes se configuran aqui
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true})