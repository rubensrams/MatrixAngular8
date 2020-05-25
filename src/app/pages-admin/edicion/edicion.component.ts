import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styles: [
  ]
})
export class EdicionComponent implements OnInit {

  pagina: number;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.pagina = +params.get('page');
    });
  
  }

}
