import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraduadosPosgrado } from 'src/app/modelos/graduadosPosgrado';

@Injectable({
  providedIn: 'root'
})
export class GraduadosPosgradoService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  graduados_posgrado(graduadosPosgrado: GraduadosPosgrado){
    return this.http.post<any>(this.url + '/api/graduados_posgrado', graduadosPosgrado);
  }

  graduados_posgrado_programa(graduadosPosgrado: GraduadosPosgrado){
    return this.http.post<any>(this.url + '/api/graduados_posgrado_programa', graduadosPosgrado);
  }
}
