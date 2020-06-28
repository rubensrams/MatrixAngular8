import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginadordash',
  templateUrl: './paginadordash.component.html',
  styles: [
  ]
})
export class PaginadordashComponent implements OnInit {

  @Input() paginador: any;
  @Input() ruta: string;
  @Input() tipo: string;
  @Input() id: string;
  paginas: number[];
  desde: number;
  hasta: number;
  
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    
    let paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  ngOnInit(): void {
    this.initPaginator();
  }

  private initPaginator(): void {
   // this.paginador.respuesta.number - 1  <-- Aqui se le da mas rangos de paginas, con 1 son 6, con 4 da 10
    this.desde = Math.min(Math.max(1,this.paginador.respuesta.number - 1), this.paginador.respuesta.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.respuesta.totalPages, this.paginador.respuesta.number + 4), 6);
    if(this.paginador.respuesta.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    }else{
      this.paginas= new Array(this.paginador.respuesta.totalPages).fill(0).map((_valor, indice) => indice +1 );
    }
  }

}
