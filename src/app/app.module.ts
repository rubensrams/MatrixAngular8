/* MODULOS */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from './layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/*Componentes*/
import { AppComponent } from './app.component';
import { LoginComponent } from './registro/login/login.component';
import { RegistroComponent } from './registro/registro/registro.component';
import { NopagefoundComponent } from './registro/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.rutas';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { ResponseHttpInterceptor } from './interceptors/responseHttpInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    LayoutModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              { provide: HTTP_INTERCEPTORS, useClass: ResponseHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
