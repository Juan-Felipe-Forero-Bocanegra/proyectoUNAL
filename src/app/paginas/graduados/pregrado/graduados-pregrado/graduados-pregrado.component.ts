import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';
import { GraduadosPregradoService } from 'src/app/servicios/graduados/graduados-pregrado.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-graduados-pregrado',
  templateUrl: './graduados-pregrado.component.html',
  styleUrls: ['./graduados-pregrado.component.css']
})
export class GraduadosPregradoComponent implements OnInit {

  formulario: FormGroup;
  items: MenuItem[];

  facultadArray: Array<any> = new Array();
  programaArray: Array<any> = new Array();
  sexoArray: Array<any> = new Array();
  estratoArray: Array<any> = new Array();
  depNacArray: Array<any> = new Array();
  nacionalidadArray: Array<any> = new Array();
  tipoAdmisionArray: Array<any> = new Array();
  paesArray: Array<any> = new Array();
  peamaArray: Array<any> = new Array();
  edadArray: Array<any> = new Array();

  graduadosPregrado: GraduadosPregrado;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;
  displayBasic: boolean = false;
  dialogMessage: string = '';
  progressBar: boolean = false;
  ListaExcel: any[]

  constructor(private fb: FormBuilder, private graduadosPregradoService: GraduadosPregradoService) {

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

    this.graduadosPregrado = new GraduadosPregrado();

    this.formulario = this.fb.group({
      FACULTAD: ['', [Validators.required]],
      PROGRAMA: ['', [Validators.required]],
      SEXO: ['', [Validators.required]],
      ESTRATO_ORIG: ['', [Validators.required]],
      DEP_NAC: ['', [Validators.required]],
      NACIONALIDAD: ['', [Validators.required]],
      TIPO_ADM: ['', [Validators.required]],
      PAES: ['', [Validators.required]],
      PEAMA: ['', [Validators.required]],
      EDAD: ['', [Validators.required]],
    });


    this.facultadArray = [
      { label: 'Agronom??a', value: 'Agronom??a' },
      { label: 'Artes', value: 'Artes' },
      { label: 'Ciencias', value: 'Ciencias' },
      { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
      { label: 'Ciencias econ??micas', value: 'Ciencias econ??micas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias pol??ticas y sociales', value: 'Derecho, ciencias pol??ticas y sociales' },
      { label: 'Enfermer??a', value: 'Enfermer??a' },
      { label: 'Ingenier??a', value: 'Ingenier??a' },
      { label: 'Medicina	', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontolog??a', value: 'Odontolog??a' },

    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

    ]


    this.estratoArray = [
      { label: 'Estrato 1', value: 'Estrato 1' },
      { label: 'Estrato 2', value: 'Estrato 2' },
      { label: 'Estrato 3', value: 'Estrato 3' },
      { label: 'Estrato 4', value: 'Estrato 4' },
      { label: 'Estrato 5', value: 'Estrato 5' },
      { label: 'Estrato 6', value: 'Estrato 6' },
    ]

    this.depNacArray = [
      { label: 'CARIBE', value: 'CARIBE' },
      { label: 'EJE CAFETERO', value: 'EJE CAFETERO' },
      { label: 'PAC??FICO', value: 'PAC??FICO' },
      { label: 'CENTRO ORIENTE', value: 'CENTRO ORIENTE' },
      { label: 'LLANO', value: 'LLANO' },
      { label: 'CENTRO SUR', value: 'CENTRO SUR' },
    ]


    this.nacionalidadArray = [
      { label: 'Extranjero', value: 'Extranjero' },
      { label: 'Colombiana', value: 'Colombiana' },

    ]

    this.edadArray = [
      { label: '15-25', value: '15-25' },
      { label: '25-35', value: '25-35' },
      { label: '35-45', value: '35-45' },
      { label: '45-55', value: '45-55' },
      { label: '55 o m??s', value: '55 o m??s' }
    ]

    this.tipoAdmisionArray = [
      { label: 'Regular', value: 'Regular' },
      { label: 'PEAMA', value: 'PEAMA' },
      { label: 'PAES', value: 'PAES' },
    ]

    this.paesArray = [
      { label: 'No aplica', value: 'No aplica' },
      { label: 'Comunidades ind??genas', value: 'Comunidades ind??genas' },
      { label: 'Mejores bachilleres', value: 'Mejores bachilleres' },
      { label: 'Mejores bachilleres de municipios pobres', value: 'Mejores bachilleres de municipios pobres' },
      { label: 'Victimas del conflicto armado interno en Colombia', value: 'Victimas del conflicto armado interno en Colombia' },
      { label: 'Poblaci??n afrocolombiana', value: 'Poblaci??n afrocolombiana' }

    ]

    this.peamaArray = [
      { label: 'No aplica', value: 'No aplica' },
      { label: 'PEAMA - Amazon??a', value: 'PEAMA - Amazon??a' },
      { label: 'PEAMA - Caribe', value: 'PEAMA - Caribe' },
      { label: 'PEAMA - Orinoqu??a', value: 'PEAMA - Orinoqu??a' },
      { label: 'PEAMA - Sede Bogot?? - Sumapaz', value: 'PEAMA - Sede Bogot?? - Sumapaz' },
      { label: 'PEAMA - Tumaco', value: 'PEAMA - Tumaco' },
    ]

  }

  ngOnInit(): void {
  }

  facultadSelect(event: { value: any; originalEvent: any }) {
    this.facultad = event.value.value;
    this.programaArray = []
    if (this.facultad == 'Agronom??a') {
      this.programaArray = [
        { label: 'Ingenier??a agron??mica', value: 'Ingenier??a agron??mica' }
      ]
    } else if (this.facultad == 'Artes') {
      this.programaArray = [
        { label: 'Arquitectura', value: 'Arquitectura' },
        { label: 'Artes pl??sticas', value: 'Artes pl??sticas' },
        { label: 'Cine y televisi??n', value: 'Cine y televisi??n' },
        { label: 'Dise??o gr??fico', value: 'Dise??o gr??fico' },
        { label: 'Dise??o industrial', value: 'Dise??o industrial' },
        { label: 'M??sica', value: 'M??sica' },
        { label: 'M??sica instrumental', value: 'M??sica instrumental' },
      ]
    } else if (this.facultad == 'Ciencias') {
      this.programaArray = [
        { label: 'Biolog??a', value: 'Biolog??a' },
        { label: 'Ciencias de la computaci??n', value: 'Ciencias de la computaci??n' },
        { label: 'Estad??stica', value: 'Estad??stica' },
        { label: 'Farmacia', value: 'Farmacia' },
        { label: 'F??sica', value: 'F??sica' },
        { label: 'Geolog??a', value: 'Geolog??a' },
        { label: 'Matem??ticas', value: 'Matem??ticas' },
        { label: 'Qu??mica', value: 'Qu??mica' }
      ]
    } else if (this.facultad == 'Ciencias agrarias') {
      this.programaArray = [
        { label: 'Ingenier??a agron??mica', value: 'Ingenier??a agron??mica' },
      ]
    } else if (this.facultad == 'Ciencias econ??micas') {
      this.programaArray = [
        { label: 'Administraci??n de empresas', value: 'Administraci??n de empresas' },
        { label: 'Contadur??a p??blica', value: 'Contadur??a p??blica' },
        { label: 'Econom??a', value: 'Econom??a' }
      ]
    } else if (this.facultad == 'Ciencias humanas') {
      this.programaArray = [
        { label: 'Antropolog??a', value: 'Antropolog??a' },
        { label: 'Espa??ol y filolog??a cl??sica', value: 'Espa??ol y filolog??a cl??sica' },
        { label: 'Estudios literarios', value: 'Estudios literarios' },
        { label: 'Filolog??a e idiomas', value: 'Filolog??a e idiomas' },
        { label: 'Filosof??a', value: 'Filosof??a' },
        { label: 'Geograf??a', value: 'Geograf??a' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Ling????stica', value: 'Ling????stica' },
        { label: 'Psicolog??a', value: 'Psicolog??a' },
        { label: 'Sociolog??a', value: 'Sociolog??a' },
        { label: 'Trabajo social', value: 'Trabajo social' },
      ]
    } else if (this.facultad == 'Derecho, ciencias pol??ticas y sociales') {
      this.programaArray = [
        { label: 'Ciencia pol??tica', value: 'Ciencia pol??tica' },
        { label: 'Derecho', value: 'Derecho' },
      ]
    } else if (this.facultad == 'Enfermer??a') {
      this.programaArray = [
        { label: 'Enfermer??a', value: 'Enfermer??a' },
      ]
    } else if (this.facultad == 'Ingenier??a') {
      this.programaArray = [
        { label: 'Ingenier??a agr??cola', value: 'Ingenier??a agr??cola' },
        { label: 'Ingenier??a civil', value: 'Ingenier??a civil' },
        { label: 'Ingenier??a de sistemas', value: 'Ingenier??a de sistemas' },
        { label: 'Ingenier??a de sistemas y computaci??n', value: 'Ingenier??a de sistemas y computaci??n' },
        { label: 'Ingenier??a electr??nica', value: 'Ingenier??a electr??nica' },
        { label: 'Ingenier??a el??ctrica', value: 'Ingenier??a el??ctrica' },
        { label: 'Ingenier??a industrial', value: 'Ingenier??a industrial' },
        { label: 'Ingenier??a mecatr??nica', value: 'Ingenier??a mecatr??nica' },
        { label: 'Ingenier??a mec??nica', value: 'Ingenier??a mec??nica' },
        { label: 'Ingenier??a qu??mica', value: 'Ingenier??a qu??mica' }
      ]
    } else if (this.facultad == 'Medicina') {
      this.programaArray = [
        { label: 'Fisioterapia', value: 'Fisioterapia' },
        { label: 'Fonoaudiolog??a', value: 'Fonoaudiolog??a' },
        { label: 'Medicina', value: 'Medicina' },
        { label: 'Nutrici??n y diet??tica', value: 'Nutrici??n y diet??tica' },
        { label: 'Terapia ocupaci??nal', value: 'Terapia ocupaci??nal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia') {
      this.programaArray = [
        { label: 'Medicina veterinaria', value: 'Medicina veterinaria' },
        { label: 'Zootecnia', value: 'Zootecnia' },
      ]
    } else if (this.facultad == 'Odontolog??a') {
      this.programaArray = [
        { label: 'Odontolog??a', value: 'Odontolog??a' },
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
      this.saveAsExcelFile(excelBuffer, 'Predicciones graduados pregrado');
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

    this.graduadosPregrado.NIVEL = 'Pregrado'
    this.graduadosPregrado.FACULTAD = this.formulario.value.FACULTAD.value;
    this.graduadosPregrado.PROGRAMA = this.formulario.value.PROGRAMA.value;
    this.graduadosPregrado.SEXO = this.formulario.value.SEXO.value;
    this.graduadosPregrado.ESTRATO_ORIG = this.formulario.value.ESTRATO_ORIG.value;
    this.graduadosPregrado.DEP_NAC = this.formulario.value.DEP_NAC.value;
    this.graduadosPregrado.NACIONALIDAD = this.formulario.value.NACIONALIDAD.value;
    this.graduadosPregrado.TIPO_ADM = this.formulario.value.TIPO_ADM.value;
    this.graduadosPregrado.PAES = this.formulario.value.PAES.value;
    this.graduadosPregrado.PEAMA = this.formulario.value.PEAMA.value;
    this.graduadosPregrado.EDAD = this.formulario.value.EDAD.value;


    console.log(this.graduadosPregrado);

    this.graduadosPregradoService.graduados_pregrado(this.graduadosPregrado).subscribe(
      responseData => {

        console.log(responseData)
        this.ListaExcel = responseData;

        responseData.forEach((element: any) => {

          //console.log(element);
          if(element.True == false){
            this.data.labels.push(element.PERIODO);
            this.data.datasets[1].data.push(element.Label);
          } else {
            const index = this.data.labels.findIndex((object: any) => {
              let string = object.toString();
              return string === element.PERIODO;
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
