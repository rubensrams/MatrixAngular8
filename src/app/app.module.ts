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

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";




let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("843181634802-m96p3kerg88c0mrt9tg988glgqd5aavr.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("667743800543980")
                                         
  }
]);
 
export function provideConfig() {
  return config;
}

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
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              { provide: HTTP_INTERCEPTORS, useClass: ResponseHttpInterceptor, multi: true }, {
                provide: AuthServiceConfig,
                useFactory: provideConfig
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
