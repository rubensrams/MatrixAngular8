import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../models/usuarios';
import { UsuarioService } from '../../services/usuario.service';
import { Toast } from 'src/app/config/config';
import { OauthService } from '../../services/oauth.service';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { GoogleService } from 'src/app/services/google.service';
import { FacebookService } from 'src/app/services/facebook.service';

declare function _initPlugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  usuario: Usuarios;
  loading = false;
  Toast: any;
  
  constructor(private router: Router, 
      private oauthService: OauthService, 
      private loginSocialService: AuthService,
      private googleService: GoogleService,
      private facebookService: FacebookService) {
      this.usuario = new Usuarios();
   }
   
   async signInWithGoogle(): Promise<void> {    
   
    const  socialusers = await this.loginSocialService.signIn(GoogleLoginProvider.PROVIDER_ID); 
    console.log(socialusers); 
      this.googleService.loginGoogle(socialusers.idToken).subscribe( resp => {
        console.log(resp.token);  
        this.oauthService.guardaDataSession(resp.token, '1');
        const usuario = this.oauthService.usuario;
          Toast.fire({
            icon: 'success',
            title: `Usuario: ${usuario.username} logueado exitosamente`
          });
        this.router.navigate(['/dashboard']);
        });
 }
 
 async signInWithFB(): Promise<void> {  
  const  socialusers =  await this.loginSocialService.signIn(FacebookLoginProvider.PROVIDER_ID);
      console.log(socialusers); 
        this.facebookService.loginFacebook(socialusers.name.toString(), socialusers.photoUrl.toString(),socialusers.email.toString()).subscribe( resp => {
        console.log('********'+resp.token);  
         this.oauthService.guardaDataSession(resp.token, '1');
        const usuario = this.oauthService.usuario;
          Toast.fire({
            icon: 'success',
            title: `Usuario: ${usuario.username} logueado exitosamente`
          });
        this.router.navigate(['/dashboard']);
        });
  } 
 
  ngOnInit() { 
    _initPlugins();  
  }

  ingresar( forma: NgForm): void {
    if ( forma.invalid ) {
        Object.values(forma.controls).forEach( control => {
          control.markAllAsTouched();
        });
        return;
      }
    this.loading = true;
    this.oauthService.login(this.usuario).subscribe( resp => {
      this.oauthService.guardaDataSession(resp.access_token, '0');
      const usuario = this.oauthService.usuario;
      Toast.fire({
        icon: 'success',
        title: `Usuario: ${usuario.username} logueado exitosamente`
      });
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
    });

  }

  
}
