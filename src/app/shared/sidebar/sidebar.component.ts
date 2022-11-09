import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  
  /* get hitorial() {
    return this.GifsService
  } */

  constructor( private gifsService: GifsService) {}

  get historial() {
    return this.gifsService.historial //El .historial es como estar llamando a get historial() de gifsService, el cual me devuelve [...this._historial]
  }

  buscar( item: string ) {
    this.gifsService.buscarGifs(item);
  }
  
}
