import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PosgradoComponent } from './paginas/posgrado/posgrado.component';
import {MenuModule} from 'primeng/menu';
import {MegaMenuModule} from 'primeng/megamenu';
import {ReactiveFormsModule} from "@angular/forms";
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';
import { PosgradoProgramaComponent } from './paginas/posgrado/posgrado-programa/posgrado-programa.component';
import { MenuPrincipalComponent } from './menu/menu-principal/menu-principal.component';
import {DialogModule} from 'primeng/dialog';
import { PregradoComponent } from './paginas/matriculados/pregrado/pregrado.component';
import { PregradoProgramaComponent } from './paginas/matriculados/pregrado/pregrado-programa/pregrado-programa.component';
import { GraduadosPosgradoComponent } from './paginas/graduados/posgrado/graduados-posgrado/graduados-posgrado.component';
import { GraduadosPosgradoProgramaComponent } from './paginas/graduados/posgrado/graduados-posgrado-programa/graduados-posgrado-programa.component';
import { GraduadosPregradoComponent } from './paginas/graduados/pregrado/graduados-pregrado/graduados-pregrado.component';
import { GraduadosPregradoProgramaComponent } from './paginas/graduados/pregrado/graduados-pregrado-programa/graduados-pregrado-programa.component';
import { DocentesComponent } from './paginas/docentes/docentes/docentes.component';
import { DocentesProgramaComponent } from './paginas/docentes/docentes-programa/docentes-programa.component';
import { AdminComponent } from './paginas/admin/admin/admin.component';
import { AdminNivelComponent } from './paginas/admin/admin-nivel/admin-nivel.component';

@NgModule({
  declarations: [
    AppComponent,
    PosgradoComponent,
    PosgradoProgramaComponent,
    MenuPrincipalComponent,
    PregradoComponent,
    PregradoProgramaComponent,
    GraduadosPosgradoComponent,
    GraduadosPosgradoProgramaComponent,
    GraduadosPregradoComponent,
    GraduadosPregradoProgramaComponent,
    DocentesComponent,
    DocentesProgramaComponent,
    AdminComponent,
    AdminNivelComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    MegaMenuModule,
    ReactiveFormsModule,
    MenubarModule,
    DropdownModule,
    HttpClientModule,
    ChartModule,
    ProgressBarModule,
    DialogModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
