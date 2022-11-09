import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [

  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //El ViewChild busca en el HTML el elemento que contenga lo que yo le indico entre los () y lo asigna al elemento que esta fuera de los parentesis. Como ElementRef es tipo any, especifico que va a ser tipo input mediante <HtmlInputElement>, de lo contrario no podremos acceder a propiedades como nativeElement. value

  //Non-null assertion operator (!:) le digo a TS de que ese elemento si o si va a existir, por mas que el me diga que puede que no exista

  constructor(private gifsService: GifsService) {} // Con esto insertamos el service para poder usarlo en este modulo

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0 ) {
      return;
    }

    /* console.log(valor); */
    this.gifsService.buscarGifs( valor ); //Lo que necesitamos en este modulo no es mostrar el historial, sino que solamente enviar el valor de lo que escribimos hacia el array que genera buscarGifs con los resultados.
    this.txtBuscar.nativeElement.value = "";

  }

}
