import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, public oautService: OauthService) { }

  ngOnInit() {
  }
  verUsuarios(): void {
    this.usuarioService.verUsuarios().subscribe( resp => {
      console.log(resp);
    }, error => {
      console.log(error);
    });
  }

  verDashboard(): void {

  }

}
