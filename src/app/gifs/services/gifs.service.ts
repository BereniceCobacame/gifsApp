import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'WkrsvOb0v7TjEAOVC6TYg7mrvfYFOHk9'
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('Historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    // if (localStorage.getItem('Historial')){
    //   this._historial = JSON.parse(localStorage.getItem('Historial')!)
    // }
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      // agrega otro item al top del arreglo
      this._historial.unshift(query)
      // mantiene solo 10 items del arreglo para mostrar
      this._historial = this._historial.splice(0, 10)

      localStorage.setItem('Historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

  }
}
