import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';

@Injectable({
  providedIn: 'root'
})
export class GraduadosPregradoService {
  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  graduados_pregrado(graduadosPregrado: GraduadosPregrado){
    return this.http.post<any>(this.url + '/api/graduados_pregrado', graduadosPregrado);
  }

  graduados_pregrado_programa(graduadosPregrado: GraduadosPregrado){
    return this.http.post<any>(this.url + '/api/graduados_pregrado_programa', graduadosPregrado);
  }
}
