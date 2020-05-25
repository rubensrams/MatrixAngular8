import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuarios[];
  loading = false;
  paginador: any;
  idPagina: number;
  constructor(private usuarioService: UsuarioService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.verUsuarios();
  }

  verUsuarios(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      this.idPagina = page;      
      if(!page){
        page=0;
      }
        this.usuarioService.getUsuarios(page).subscribe(response => {
          this.usuarios = response.respuesta.content as Usuarios[];
          this.paginador = response;
          this.loading = false;
        }, error => {
          this.loading = false;
        });
  
    }); 
  }

  verUsuario(idN:number): void {
    this.router.navigate(['edicion', idN, this.idPagina]);
  }
  

}
