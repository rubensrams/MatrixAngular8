import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { OauthService } from '../../services/oauth.service';
declare function _initPluginMenu();
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, public oautService: OauthService) { }

  ngOnInit() {
    _initPluginMenu();  
  }
  

  verDashboard(): void {

  }

}
