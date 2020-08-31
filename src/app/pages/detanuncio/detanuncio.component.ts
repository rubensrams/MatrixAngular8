import { Component, OnInit, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { Anuncio } from 'src/app/models/anuncio';
import { Toast } from 'src/app/config/config';
import { OauthService } from '../../services/oauth.service';
import { NgbDateStruct, NgbCalendar, NgbDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from 'src/app/models/cita';
import { NgForm } from '@angular/forms';
import { CitaEstatus } from 'src/app/models/citaestatus';
import { CitasService } from 'src/app/services/citas.service';
import { Usuarios } from '../../models/usuarios';


@Component({
  selector: 'app-detanuncio',
  templateUrl: './detanuncio.component.html',
  styles: [
  ]
})
export class DetanuncioComponent implements OnInit {
  pagina: number;
  id: number;
  tipo: number;
  clave: number;
  anuncio: Anuncio;
  error = false;
  loading = false;
  loadingCrearCita = false;
  citaSolicitada = false;
  totalGaleria = 0;
  @ViewChild('btnSalir') btnSalir: ElementRef;

  model: NgbDateStruct;
  date: { year: number, month: number };
  @ViewChild('dp') dp: NgbDatepicker;
  time = {hour: 0, minute: 0};
  newTime:string='00:00';
  direccion : string;
  constructor(private activatedRoute: ActivatedRoute, 
              private anuncioService: AnunciosService,
              public oauthService: OauthService,
              private calendar: NgbCalendar,
              private citaService: CitasService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.tipo = +params.get('tipo');
      this.id = +params.get('id');
      this.pagina = +params.get('page');
      this.clave = +params.get('clave');
      this.selectToday();
    });

    this.getAnuncio(this.clave);

    
  
  }
  onTimeChange(value:{hour:string,minute:string})
  {
     console.log(value)
     this.newTime=`${value.hour}:${value.minute}`;
  }

  getAnuncio(id:number) {
    this.loading = true;
    this.anuncioService.getAnuncio(id).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      this.anuncio = resp;
      this.totalGaleria= this.anuncio.galeria.length;
      this.citaSolicitada= this.tieneCita();
    }, error => {
      this.loading = false;
      this.error = true;
      Toast.fire({
        icon: 'error',
        title: `Error al consultar el anuncio`
      });
    });

  }


  selectToday() {
    this.model = this.calendar.getToday();
    console.log('navigateEvent');
  }

  setCurrent() {
    //Current Date
    this.dp.navigateTo()
    console.log('navigateEvent2');
  }
  setDate() {
    //Set specific date
    this.dp.navigateTo({ year: 2013, month: 2 });
    console.log('navigateEvent3');
  }

  navigateEvent(event) {
    this.date = event.next;
    console.log('navigateEvent4');
  }

  generarCita(forma: NgForm){
    this.loadingCrearCita= true;
    let fecha= this.model.year+'-'+this.model.month+'-'+this.model.day;
    let hora = this.newTime

    let cita = new Cita();
    let citaEstatus = new CitaEstatus();
    let usrCompra = new Usuarios();
    let usr = new Usuarios();
    let anu = new Anuncio();

    
    citaEstatus.id= 2;
    usr.id = this.anuncio.usuario.id;
    usrCompra.id = this.oauthService.usuario.id;
    anu.id = this.anuncio.id;

    cita.direccion= forma.value.direccion;
    cita.fecha = fecha+' '+hora;
    cita.estatusCita = citaEstatus;
    cita.anuncio = anu;
    cita.usuario=  usr;
    cita.usuarioCompra= usrCompra;

    this.citaService.crearCita(cita).subscribe(resp => {
      this.loadingCrearCita= false;
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `Cita creada exitosamente`});
        //this.btnSalir.nativeElement.click();
        this.citaSolicitada= true;
        this.renderer.selectRootElement(this.btnSalir.nativeElement).click();
        
    }, error => {
      console.log(error);
      this.loadingCrearCita = false;
      Toast.fire({
        icon: 'error',
        title: `Error al crear la cita`
      });
    });

  }


  tieneCita(): boolean {
    let res= false;
    this.anuncio.citas.forEach( resp=> {
      if(resp.usuarioCompra.id == this.oauthService.usuario.id) {
        res= true;
      }
    });
    return res;
  }

}
