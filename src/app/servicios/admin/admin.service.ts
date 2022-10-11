import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';
import { Docente } from 'src/app/modelos/docentes';
import { Administrativos } from 'src/app/modelos/administrativos';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.backendUrl;

  constructor(private http: HttpClient) { }

  admin(administrativos: Administrativos){
    return this.http.post<any>(this.url + '/api/admin', administrativos);
  }

  admin_nivel(administrativos: Administrativos){
    return this.http.post<any>(this.url + '/api/admin_nivel', administrativos);
  }
}
