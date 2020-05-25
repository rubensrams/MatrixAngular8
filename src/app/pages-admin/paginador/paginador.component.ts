import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styles: [
  ]
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
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
      console.log(this.paginas);
    }else{
      this.paginas= new Array(this.paginador.respuesta.totalPages).fill(0).map((_valor, indice) => indice +1 );
    }
  }

}
