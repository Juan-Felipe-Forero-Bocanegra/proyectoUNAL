import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Administrativos } from 'src/app/modelos/administrativos';
import { AdminService } from 'src/app/servicios/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  formulario: FormGroup;
  items: MenuItem[];

  nivelArray: Array<any> = new Array();
  sexoArray: Array<any> = new Array();
  edadArray: Array<any> = new Array();
  servicioArray: Array<any> = new Array();
  docentesArray: Array<any> = new Array();
  formacionArray: Array<any> = new Array();

  administrativos: Administrativos;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;
  displayBasic: boolean = false;
  dialogMessage: string = '';
  progressBar: boolean = false;

  constructor(private fb: FormBuilder, private adminService: AdminService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Cantidad de docentes',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        }
      ]
    }

    console.log(this.data.datasets[0].label)

    this.administrativos = new Administrativos();

    this.formulario = this.fb.group({
      NIVEL: ['', [Validators.required]],
      FORMACION: ['', [Validators.required]],
      SEXO: ['', [Validators.required]],
      CAT_EDAD: ['', [Validators.required]],
      CAT_SERVICIO: ['', [Validators.required]],
      DOCENTES: ['', [Validators.required]],
    });


    this.nivelArray = [
      { label: 'Asesor', value: 'Asesor' },
      { label: 'Directivo', value: 'Directivo' },
      { label: 'Profesional - Educador', value: 'Profesional - Educador' },
      { label: 'Asistencial', value: 'Asistencial' },
      { label: 'Ejecutivo', value: 'Ejecutivo' },
      { label: 'Profesional', value: 'Profesional' },
      { label: 'Técnico', value: 'Técnico' },
      { label: 'Asistencial - Trabajador Oficial', value: 'Asistencial - Trabajador Oficial' },
    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

    ]


    this.edadArray = [
      { label: '29 años o menos', value: '29 años o menos' },
      { label: '30 a 39 años', value: '30 a 39 años' },
      { label: '40 a 49 años', value: '40 a 49 años' },
      { label: '50 a 59 años', value: '50 a 59 años' },
      { label: '60 o más años', value: '60 o más años' }
    ]

    this.servicioArray = [
      { label: '9 años o menos', value: '9 años o menos' },
      { label: '10 a 19 años', value: '10 a 19 años' },
      { label: '20 a 29 años', value: '20 a 29 años' },
      { label: '30 a 39 años', value: '30 a 39 años' },
      { label: '40 o más años', value: '40 o más años' },
    ]

    this.formacionArray = [
      { label: 'Sin información', value: 'Sin información' },
      { label: 'Secundaria o menos', value: 'Secundaria o menos' },
      { label: 'Técnico', value: 'Técnico' },
      { label: 'Tecnología', value: 'Tecnología' },
      { label: 'Pregrado', value: 'Pregrado' },
      { label: 'Especialización', value: 'Especialización' },
      { label: 'Especialidad Médica', value: 'Especialidad Médica' },
      { label: 'Maestría', value: 'Maestría' },
      { label: 'Doctorado', value: 'Doctorado' },
    ]

    this.docentesArray = [
      { label: 'Administrativo', value: 'Administrativo' },
      { label: 'Docente en comisión administrativa', value: 'Docente en comisión administrativa' },
    ]




  }

  ngOnInit(): void {
  }


  onSubmit() {

    this.data.labels = []
    this.data.datasets[0].data = []
    this.progressBar = true;
    this.showGraph = false;


    this.administrativos.SEDE = 'Bogotá'
    this.administrativos.NIVEL = this.formulario.value.NIVEL.value;
    this.administrativos.FORMACION = this.formulario.value.FORMACION.value;
    this.administrativos.SEXO = this.formulario.value.SEXO.value;
    this.administrativos.CAT_EDAD = this.formulario.value.CAT_EDAD.value;
    this.administrativos.CAT_SERVICIO = this.formulario.value.CAT_SERVICIO.value;
    this.administrativos.DOCENTES = this.formulario.value.DOCENTES.value;


    console.log(this.administrativos);

    this.adminService.admin(this.administrativos).subscribe(
      responseData => {

        console.log(responseData)

        responseData.forEach((element: any) => {

          //console.log(element);

          this.data.labels.push(element.YEAR);
          this.data.datasets[0].data.push(element.Label);

        });
        this.showGraph = true;
        this.progressBar = false;
      }, (error: any) => {
        console.log("error");
        console.log(error);
        this.dialogMessage = 'Hubo un error en la consulta'
        this.displayBasic = true;
        this.progressBar = false;
      }
    )

  }

}
