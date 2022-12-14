import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Administrativos } from 'src/app/modelos/administrativos';
import { AdminService } from 'src/app/servicios/admin/admin.service';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';

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
  ListaExcel: any[]

  constructor(private fb: FormBuilder, private adminService: AdminService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Reales',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Predichos',
          data: [],
          fill: false,
          borderColor: '#e51a4c',
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
      { label: 'T??cnico', value: 'T??cnico' },
      { label: 'Asistencial - Trabajador Oficial', value: 'Asistencial - Trabajador Oficial' },
    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

    ]


    this.edadArray = [
      { label: '29 a??os o menos', value: '29 a??os o menos' },
      { label: '30 a 39 a??os', value: '30 a 39 a??os' },
      { label: '40 a 49 a??os', value: '40 a 49 a??os' },
      { label: '50 a 59 a??os', value: '50 a 59 a??os' },
      { label: '60 o m??s a??os', value: '60 o m??s a??os' }
    ]

    this.servicioArray = [
      { label: '9 a??os o menos', value: '9 a??os o menos' },
      { label: '10 a 19 a??os', value: '10 a 19 a??os' },
      { label: '20 a 29 a??os', value: '20 a 29 a??os' },
      { label: '30 a 39 a??os', value: '30 a 39 a??os' },
      { label: '40 o m??s a??os', value: '40 o m??s a??os' },
    ]

    this.formacionArray = [
      { label: 'Sin informaci??n', value: 'Sin informaci??n' },
      { label: 'Secundaria o menos', value: 'Secundaria o menos' },
      { label: 'T??cnico', value: 'T??cnico' },
      { label: 'Tecnolog??a', value: 'Tecnolog??a' },
      { label: 'Pregrado', value: 'Pregrado' },
      { label: 'Especializaci??n', value: 'Especializaci??n' },
      { label: 'Especialidad M??dica', value: 'Especialidad M??dica' },
      { label: 'Maestr??a', value: 'Maestr??a' },
      { label: 'Doctorado', value: 'Doctorado' },
    ]

    this.docentesArray = [
      { label: 'Administrativo', value: 'Administrativo' },
      { label: 'Docente en comisi??n administrativa', value: 'Docente en comisi??n administrativa' },
    ]




  }

  ngOnInit(): void {
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListaExcel);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Predicciones administrativos');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }


  onSubmit() {

    this.data.labels = []
    this.data.datasets[0].data = []
    this.data.datasets[1].data = []
    this.progressBar = true;
    this.showGraph = false;


    this.administrativos.SEDE = 'Bogot??'
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
        this.ListaExcel = responseData;

        responseData.forEach((element: any) => {

          //console.log(element);

          if(element.True == false){
            this.data.labels.push(element.YEAR);
            this.data.datasets[1].data.push(element.Label);
          } else {
            const index = this.data.labels.findIndex((object: any) => {
              let year = +element.YEAR
              return object == year;
            });
            if(index != -1){
              this.data.datasets[0].data[index] = element.Label
            }
          }

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
