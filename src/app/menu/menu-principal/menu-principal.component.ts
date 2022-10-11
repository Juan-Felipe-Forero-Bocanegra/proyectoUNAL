import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Matriculados',
        items: [
          {
            label: 'Pregrado', items:[
              { label: 'Por programa', routerLink: '/pregrado_programa' },
              { label: 'Con todas las variables', routerLink: '/pregrado' },
              { label: 'Histórico', url: 'http://www.youtube.com' },
            ],
          },
          {
            label: 'Posgrado', items:[
              { label: 'Por programa', routerLink: '/posgrado_programa' },
              { label: 'Con todas las variables', routerLink: '/posgrado' },
              { label: 'Histórico', items:[
                { label: 'Doctorado', url: 'http://www.youtube.com' },
                { label: 'Maestría', url: 'http://www.youtube.com' },
                { label: 'Especialización', url: 'http://www.youtube.com' },
                { label: 'Especializaciones médicas', url: 'http://www.youtube.com' },
              ] },
            ],
          },
        ]
      },
      {
        label: 'Graduados',
        items: [
          {
            label: 'Pregrado', items:[
              { label: 'Por programa', routerLink: '/graduados/pregrado_programa' },
              { label: 'Con todas las variables', routerLink: '/graduados/pregrado' },
              { label: 'Histórico', url: 'http://www.youtube.com' },
            ],
          },
          {
            label: 'Posgrado', items:[
              { label: 'Por programa', routerLink: '/graduados/posgrado_programa' },
              { label: 'Con todas las variables', routerLink: '/graduados/posgrado' },
              { label: 'Histórico', items:[
                { label: 'Doctorado', url: 'http://www.youtube.com' },
                { label: 'Maestría', url: 'http://www.youtube.com' },
                { label: 'Especialización', url: 'http://www.youtube.com' },
                { label: 'Especializaciones médicas', url: 'http://www.youtube.com' },
              ] },
            ],
          },
        ]
      },
      {
        label: 'Docentes',
        items: [
              { label: 'Por unidad', routerLink: '/docentes_unidad' },
              { label: 'Con todas las variables', routerLink: '/docentes' },
              { label: 'Histórico', url: 'http://www.youtube.com' },
        ]
      },
      {
        label: 'Administrativos',
        items: [
              { label: 'Por nivel', routerLink: '/admin_nivel' },
              { label: 'Con todas las variables', routerLink: '/admin' },
              { label: 'Histórico', url: 'http://www.youtube.com' },
        ]
      },
    ]
  }

  ngOnInit(): void {
  }

}
