import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = "p95M3c28jFTo3qbVoLM3Isyite3QbBuK";
  private servicioUrl : string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial]
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []; //Historial
    /* if (localStorage.getItem("historial")) {
      this._historial = JSON.parse( localStorage.getItem("historial")!);
    } */
    this.resultados = JSON.parse(localStorage.getItem("resultado")!) || []; //Resultados de ultimo historial buscado
  }

  buscarGifs(query: string) { //Llamamos a este buscarGifs en nuestro componente de busqueda 

    query = query.trim().toLocaleLowerCase(); //Para pasar resultados mayuscula a minuscula y evitar que pueda buscar A y tambien a y los tome como distinto y se repitan

    //Evitar que palabras en el historial se repitan
    if (!this._historial.includes( query )) { //Si no esta la palabra, entonces ahi recien la inserto
      //Agregamos lo que buscamos a la lista en primer posicion
      this._historial.unshift(query);
      //Mostrar solo 10 resultados en el historial
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial", JSON.stringify(this._historial)); //Con esto conservo la ultima busqueda en localStorage
    }

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "10")
      .set("q", query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: params })
      .subscribe( (resp) => {
        this.resultados = resp.data
        localStorage.setItem("resultado", JSON.stringify(this.resultados));
      });

  }
}