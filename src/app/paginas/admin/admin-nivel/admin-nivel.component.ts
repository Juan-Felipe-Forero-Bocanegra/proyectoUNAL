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
  selector: 'app-admin-nivel',
  templateUrl: './admin-nivel.component.html',
  styleUrls: ['./admin-nivel.component.css']
})
export class AdminNivelComponent implements OnInit {


  formulario: FormGroup;
  items: MenuItem[];

  nivelArray: Array<any> = new Array();

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
          label: 'Cantidad de administrativos',
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


    console.log(this.administrativos);

    this.adminService.admin_nivel(this.administrativos).subscribe(
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
