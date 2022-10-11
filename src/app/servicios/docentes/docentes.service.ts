import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';
import { Docente } from 'src/app/modelos/docentes';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  docentes(docente: Docente){
    return this.http.post<any>(this.url + '/api/docentes', docente);
  }

  docente_unidad(docente: Docente){
    return this.http.post<any>(this.url + '/api/docentes_unidad', docente);
  }
}
