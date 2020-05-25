import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Toast } from 'src/app/config/config';
import { OauthService } from '../../services/oauth.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public oauthService: OauthService, private router: Router, private loginSocialService: AuthService) { }

  ngOnInit() {
  }

  logout(): void {
    if(this.oauthService.ls === '1'){
      console.log('Cerrando sesion ls');
      this.loginSocialService.signOut();
    }
    console.log(this.loginSocialService);
    this.oauthService.logout();    
    this.router.navigate(['/login']);
    Toast.fire({
      icon: 'success',
      title: `Cerraste sesión exitosamente`
    });
  }

}
