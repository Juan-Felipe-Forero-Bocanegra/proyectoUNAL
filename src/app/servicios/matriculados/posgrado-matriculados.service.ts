import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatriculadoPosgrado } from 'src/app/modelos/matriculadoPosgrado';


@Injectable({
  providedIn: 'root'
})
export class PosgradoMatriculadosService {
  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  matriculados_posgrado(matriculadoPosgrado: MatriculadoPosgrado){
    return this.http.post<any>(this.url + '/api/matriculados_posgrado', matriculadoPosgrado);
  }

  matriculados_posgrado_programa(matriculadoPosgrado: MatriculadoPosgrado){
    return this.http.post<any>(this.url + '/api/matriculados_posgrado_programa', matriculadoPosgrado);
  }



}
