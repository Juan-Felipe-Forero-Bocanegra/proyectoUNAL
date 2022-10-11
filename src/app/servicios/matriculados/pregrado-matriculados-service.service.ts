import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatriculadoPregrado } from 'src/app/modelos/matriculadosPregrado';



@Injectable({
  providedIn: 'root'
})
export class PregradoMatriculadosServiceService {

  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  matriculados_pregrado(matriculadoPregrado: MatriculadoPregrado){
    return this.http.post<any>(this.url + '/api/matriculados_pregrado', matriculadoPregrado);
  }

  matriculados_pregrado_programa(matriculadoPregrado: MatriculadoPregrado){
    return this.http.post<any>(this.url + '/api/matriculados_pregrado_programa', matriculadoPregrado);
  }
}
