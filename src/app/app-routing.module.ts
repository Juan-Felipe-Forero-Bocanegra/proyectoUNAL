import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNivelComponent } from './paginas/admin/admin-nivel/admin-nivel.component';
import { AdminComponent } from './paginas/admin/admin/admin.component';
import { DocentesProgramaComponent } from './paginas/docentes/docentes-programa/docentes-programa.component';
import { DocentesComponent } from './paginas/docentes/docentes/docentes.component';
import { GraduadosPosgradoProgramaComponent } from './paginas/graduados/posgrado/graduados-posgrado-programa/graduados-posgrado-programa.component';
import { GraduadosPosgradoComponent } from './paginas/graduados/posgrado/graduados-posgrado/graduados-posgrado.component';
import { GraduadosPregradoProgramaComponent } from './paginas/graduados/pregrado/graduados-pregrado-programa/graduados-pregrado-programa.component';
import { GraduadosPregradoComponent } from './paginas/graduados/pregrado/graduados-pregrado/graduados-pregrado.component';
import { PregradoProgramaComponent } from './paginas/matriculados/pregrado/pregrado-programa/pregrado-programa.component';
import { PregradoComponent } from './paginas/matriculados/pregrado/pregrado.component';
import { PosgradoProgramaComponent } from './paginas/posgrado/posgrado-programa/posgrado-programa.component';
import { PosgradoComponent } from './paginas/posgrado/posgrado.component';

const routes: Routes = [
  { path: 'posgrado', component: PosgradoComponent },
  { path: 'posgrado_programa', component: PosgradoProgramaComponent },
  { path: 'pregrado_programa', component: PregradoProgramaComponent },
  { path: 'pregrado', component: PregradoComponent },
  { path: 'graduados/posgrado_programa', component: GraduadosPosgradoProgramaComponent },
  { path: 'graduados/posgrado', component: GraduadosPosgradoComponent },
  { path: 'graduados/pregrado_programa', component: GraduadosPregradoProgramaComponent },
  { path: 'graduados/pregrado', component: GraduadosPregradoComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'docentes_unidad', component: DocentesProgramaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin_nivel', component: AdminNivelComponent },
  { path: '**', component: PosgradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
