import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';
import { GraduadosPregradoService } from 'src/app/servicios/graduados/graduados-pregrado.service';
import { Docente } from 'src/app/modelos/docentes';
import { DocentesService } from 'src/app/servicios/docentes/docentes.service';
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  formulario: FormGroup;
  items: MenuItem[];

  facultadArray: Array<any> = new Array();
  unidadArray: Array<any> = new Array();
  sexoArray: Array<any> = new Array();
  edadArray: Array<any> = new Array();
  servicioArray: Array<any> = new Array();
  categoriaArray: Array<any> = new Array();
  dedicacionArray: Array<any> = new Array();
  formacionArray:Array<any> = new Array();


  docente: Docente;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;
  displayBasic: boolean = false;
  dialogMessage: string = '';
  progressBar: boolean = false;
  ListaExcel: any[]

  constructor(private fb: FormBuilder, private docentesService: DocentesService) {

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

    this.docente = new Docente();

    this.formulario = this.fb.group({
      FACULTAD: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      SEXO: ['', [Validators.required]],
      CAT_EDAD: ['', [Validators.required]],
      CAT_SERVICIO: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      DEDICACION: ['', [Validators.required]],
      FORMACION: ['', [Validators.required]],
    });


    this.facultadArray = [
      { label: 'Artes', value: 'Artes' },
      { label: 'Ciencias', value: 'Ciencias' },
      { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
      { label: 'Ciencias econ??micas', value: 'Ciencias econ??micas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias pol??ticas y sociales', value: 'Derecho, ciencias pol??ticas y sociales' },
      { label: 'Enfermer??a', value: 'Enfermer??a' },
      { label: 'Ingenier??a', value: 'Ingenier??a' },
      { label: 'Medicina', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontolog??a', value: 'Odontolog??a' },

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

    this.categoriaArray = [
      { label: 'Profesor Titular', value: 'Profesor Titular' },
      { label: 'Profesor Auxiliar', value: 'Profesor Auxiliar' },
      { label: 'Profesor Asociado', value: 'Profesor Asociado' },
      { label: 'Profesor Asistente', value: 'Profesor Asistente' },
      { label: 'Otras Categor??as', value: 'Otras Categor??as' },
    ]

    this.dedicacionArray = [
      { label: 'Tiempo Completo', value: 'Tiempo Completo' },
      { label: 'Medio Tiempo', value: 'Medio Tiempo' },
      { label: 'C??tedra', value: 'C??tedra' },
      { label: 'Exclusiva', value: 'Exclusiva' },
    ]

    this.formacionArray = [
      { label: 'Pregrado', value: 'Pregrado' },
      { label: 'Especializaci??n', value: 'Especializaci??n' },
      { label: 'Maestr??a', value: 'Maestr??a' },
      { label: 'Doctorado', value: 'Doctorado' },
    ]




  }

  ngOnInit(): void {
  }

  facultadSelect(event: { value: any; originalEvent: any }) {
    this.facultad = event.value.value;
    this.unidadArray = []
    if (this.facultad == 'Artes') {
      this.unidadArray = [
        { label: 'Conservatorio de M??sica', value: 'Conservatorio de M??sica' },
        { label: 'Escuela de Arquitectura y Urbanismo', value: 'Escuela de Arquitectura y Urbanismo' },
        { label: 'Escuela de Artes Pl??sticas y Visuales', value: 'Escuela de Artes Pl??sticas y Visuales' },
        { label: 'Escuela de Cine y Televisi??n', value: 'Escuela de Cine y Televisi??n' },
        { label: 'Escuela de Dise??o Gr??fico', value: 'Escuela de Dise??o Gr??fico' },
        { label: 'Escuela de Dise??o Industrial', value: 'Escuela de Dise??o Industrial' },
        { label: 'Instituto de Investigaciones Est??ticas', value: 'Instituto de Investigaciones Est??ticas' },
      ]
    } else if (this.facultad == 'Ciencias') {
      this.unidadArray = [
        { label: 'Departamento de Biolog??a', value: 'Departamento de Biolog??a' },
        { label: 'Departamento de Estad??stica', value: 'Departamento de Estad??stica' },
        { label: 'Departamento de Farmacia', value: 'Departamento de Farmacia' },
        { label: 'Departamento de F??sica', value: 'Departamento de F??sica' },
        { label: 'Departamento de Geociencias', value: 'Departamento de Geociencias' },
        { label: 'Departamento de Matem??ticas', value: 'Departamento de Matem??ticas' },
        { label: 'Departamento de Qu??mica', value: 'Departamento de Qu??mica' },
        { label: 'Instituto de Ciencias Naturales', value: 'Instituto de Ciencias Naturales' },
        { label: 'Observatorio Astron??mico', value: 'Observatorio Astron??mico' },

      ]
    } else if (this.facultad == 'Ciencias agrarias') {
      this.unidadArray = [
        { label: 'Departamento de Agronom??a', value: 'Departamento de Agronom??a' },
        { label: 'Departamento de Desarrollo Rural', value: 'Departamento de Desarrollo Rural' },
      ]
    } else if (this.facultad == 'Ciencias econ??micas') {
      this.unidadArray = [
        { label: 'Escuela de Administraci??n y Contadur??a P??blica', value: 'Escuela de Administraci??n y Contadur??a P??blica' },
        { label: 'Escuela de Econom??a', value: 'Escuela de Econom??a' }
      ]
    } else if (this.facultad == 'Ciencias humanas') {
      this.unidadArray = [
        { label: 'Departamento de Antropolog??a', value: 'Departamento de Antropolog??a' },
        { label: 'Departamento de Filosof??a', value: 'Departamento de Filosof??a' },
        { label: 'Departamento de Geograf??a', value: 'Departamento de Geograf??a' },
        { label: 'Departamento de Historia', value: 'Departamento de Historia' },
        { label: 'Departamento de Lenguas Extranjeras', value: 'Departamento de Lenguas Extranjeras' },
        { label: 'Departamento de Ling????stica', value: 'Departamento de Ling????stica' },
        { label: 'Departamento de Literatura', value: 'Departamento de Literatura' },
        { label: 'Departamento de Psicolog??a', value: 'Departamento de Psicolog??a' },
        { label: 'Departamento de Sociolog??a', value: 'Departamento de Sociolog??a' },
        { label: 'Departamento de Trabajo Social', value: 'Departamento de Trabajo Social' },
        { label: 'Escuela de G??nero', value: 'Escuela de G??nero' },
        { label: 'Escuela de Psicoan??lisis', value: 'Escuela de Psicoan??lisis' },
        { label: 'Instituto de Investigaci??n en Educaci??n', value: 'Instituto de Investigaci??n en Educaci??n' },

      ]
    } else if (this.facultad == 'Derecho, ciencias pol??ticas y sociales') {
      this.unidadArray = [
        { label: 'Departamento de Ciencia Pol??tica', value: 'Departamento de Ciencia Pol??tica' },
        { label: 'Departamento de Derecho', value: 'Departamento de Derecho' },
        { label: 'Generaci??n 125 A??os - Bogot??', value: 'Generaci??n 125 A??os - Bogot??' },
      ]
    } else if (this.facultad == 'Enfermer??a') {
      this.unidadArray = [
        { label: 'Departamento de Enfermer??a', value: 'Departamento de Enfermer??a' },
        { label: 'Departamento de Salud de Colectivos', value: 'Departamento de Salud de Colectivos' },
      ]
    } else if (this.facultad == 'Ingenier??a') {
      this.unidadArray = [
        { label: 'Departamento de Ingenier??a Civil y Agr??cola', value: 'Departamento de Ingenier??a Civil y Agr??cola' },
        { label: 'Departamento de Ingenier??a El??ctrica y Electr??nica', value: 'Departamento de Ingenier??a El??ctrica y Electr??nica' },
        { label: 'Departamento de Ingenier??a Mec??nica y Mecatr??nica', value: 'Departamento de Ingenier??a Mec??nica y Mecatr??nica' },
        { label: 'Departamento de Ingenier??a Qu??mica y Ambiental', value: 'Departamento de Ingenier??a Qu??mica y Ambiental' },
        { label: 'Departamento de Ingenier??a de Sistemas e Industrial', value: 'Departamento de Ingenier??a de Sistemas e Industrial' },
      ]
    } else if (this.facultad == 'Instituto de Biotecnolog??a - IBUN') {
      this.unidadArray = [
        { label: 'Instituto de Biotecnolog??a', value: 'Instituto de Biotecnolog??a' },
      ]
    } else if (this.facultad == 'Instituto de Ciencia y Tecnolog??a de Alimentos - ICTA') {
      this.unidadArray = [
        { label: 'Instituto de Ciencia y Tecnolog??a de Alimentos', value: 'Instituto de Ciencia y Tecnolog??a de Alimentos' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Ambientales - IDEA') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Ambientales', value: 'Instituto de Estudios Ambientales' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Pol??ticos y Relaciones Internacionales - IEPRI') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Pol??ticos y Relaciones Internacionales', value: 'Instituto de Estudios Pol??ticos y Relaciones Internacionales' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Urbanos - IEU') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Urbanos', value: 'Instituto de Estudios Urbanos' },
      ]
    } else if (this.facultad == 'Instituto de Estudios en Comunicaci??n y Cultura - IECO') {
      this.unidadArray = [
        { label: 'Instituto de Estudios en Comunicaci??n y Cultura', value: 'Instituto de Estudios en Comunicaci??n y Cultura' },
      ]
    }  else if (this.facultad == 'Instituto de Gen??tica - IGEN') {
      this.unidadArray = [
        { label: 'Instituto de Gen??tica', value: 'Instituto de Gen??tica' },
      ]
    } else if (this.facultad == 'Medicina') {
      this.unidadArray = [
        { label: 'Departamento de Ciencias Fisiol??gicas', value: 'Departamento de Ciencias Fisiol??gicas' },
        { label: 'Departamento de Cirug??a', value: 'Departamento de Cirug??a' },
        { label: 'Departamento de Comunicaci??n Humana', value: 'Departamento de Comunicaci??n Humana' },
        { label: 'Departamento de Im??genes Diagn??sticas', value: 'Departamento de Im??genes Diagn??sticas' },
        { label: 'Departamento de Medicina F??sica y Rehabilitaci??n', value: 'Departamento de Medicina F??sica y Rehabilitaci??n' },
        { label: 'Departamento de Medicina Interna', value: 'Departamento de Medicina Interna' },
        { label: 'Departamento de Microbiolog??a', value: 'Departamento de Microbiolog??a' },
        { label: 'Departamento de Morfolog??a', value: 'Departamento de Morfolog??a' },
        { label: 'Departamento de Movimiento Corporal Humano', value: 'Departamento de Movimiento Corporal Humano' },
        { label: 'Departamento de Nutrici??n Humana', value: 'Departamento de Nutrici??n Humana' },
        { label: 'Departamento de Obstetricia y Ginecolog??a', value: 'Departamento de Obstetricia y Ginecolog??a' },
        { label: 'Departamento de Ocupaci??n Humana', value: 'Departamento de Ocupaci??n Humana' },
        { label: 'Departamento de Patolog??a', value: 'Departamento de Patolog??a' },
        { label: 'Departamento de Pediatr??a', value: 'Departamento de Pediatr??a' },
        { label: 'Departamento de Psiquiatr??a', value: 'Departamento de Psiquiatr??a' },
        { label: 'Departamento de Salud P??blica', value: 'Departamento de Salud P??blica' },
        { label: 'Departamento de Toxicolog??a', value: 'Departamento de Toxicolog??a' },
        { label: 'Escuela de Educaci??n M??dica - Medicina', value: 'Escuela de Educaci??n M??dica - Medicina' }
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia') {
      this.unidadArray = [
        { label: 'Departamento de Producci??n Animal', value: 'Departamento de Producci??n Animal' },
        { label: 'Departamento de Salud Animal', value: 'Departamento de Salud Animal' },
      ]
    } else if (this.facultad == 'Odontolog??a') {
      this.unidadArray = [
        { label: 'Centro de Investigaci??n y Extensi??n - Odontolog??a', value: 'Centro de Investigaci??n y Extensi??n - Odontolog??a' },
        { label: 'Departamento de Ciencias B??sicas y Medicina Oral - Odontolog??a', value: 'Departamento de Ciencias B??sicas y Medicina Oral - Odontolog??a' },
        { label: 'Departamento de Salud Colectiva', value: 'Departamento de Salud Colectiva' },
        { label: 'Departamento de Salud Oral', value: 'Departamento de Salud Oral' },
      ]
    }
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.ListaExcel);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Predicciones docentes');
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


    this.docente.SEDE = 'Bogot??'
    this.docente.FACULTAD = this.formulario.value.FACULTAD.value;
    this.docente.UNIDAD = this.formulario.value.UNIDAD.value;
    this.docente.SEXO = this.formulario.value.SEXO.value;
    this.docente.CAT_EDAD = this.formulario.value.CAT_EDAD.value;
    this.docente.CAT_SERVICIO = this.formulario.value.CAT_SERVICIO.value;
    this.docente.CATEGORIA = this.formulario.value.CATEGORIA.value;
    this.docente.DEDICACION = this.formulario.value.DEDICACION.value;
    this.docente.FORMACION = this.formulario.value.FORMACION.value;


    console.log(this.docente);

    this.docentesService.docentes(this.docente).subscribe(
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
