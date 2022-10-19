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


    this.administrativos.SEDE = 'Bogotá'
    this.administrativos.NIVEL = this.formulario.value.NIVEL.value;
    this.administrativos.FORMACION = this.formulario.value.FORMACION.value;


    console.log(this.administrativos);

    this.adminService.admin_nivel(this.administrativos).subscribe(
      responseData => {

        console.log(responseData)

        responseData.forEach((element: any) => {

          this.ListaExcel = responseData;

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
