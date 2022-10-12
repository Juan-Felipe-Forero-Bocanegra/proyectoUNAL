import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatriculadoPregrado } from 'src/app/modelos/matriculadosPregrado';
import { PregradoMatriculadosServiceService } from 'src/app/servicios/matriculados/pregrado-matriculados-service.service';

@Component({
  selector: 'app-pregrado',
  templateUrl: './pregrado.component.html',
  styleUrls: ['./pregrado.component.css']
})
export class PregradoComponent implements OnInit {

  formulario: FormGroup;
  items: MenuItem[];

  facultadArray: Array<any> = new Array();
  programaArray: Array<any> = new Array();
  sexoArray: Array<any> = new Array();
  tipoColegioArray: Array<any> = new Array();
  estratoArray: Array<any> = new Array();
  depNacArray: Array<any> = new Array();
  depProcArray: Array<any> = new Array();
  nacionalidadArray: Array<any> = new Array();
  matriculadoArray: Array<any> = new Array();
  tipoAdmisionArray: Array<any> = new Array();
  paesArray: Array<any> = new Array();
  peamaArray: Array<any> = new Array();
  pbmArray: Array<any> = new Array();
  edadArray: Array<any> = new Array();

  matriculadoPregrado: MatriculadoPregrado;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;
  displayBasic: boolean = false;
  dialogMessage: string = '';
  progressBar: boolean = false;

  constructor(private fb: FormBuilder, private pregradoMatriculadosService: PregradoMatriculadosServiceService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Cantidad de matriculados',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'predichos',
          data: [],
          fill: false,
          borderColor: '#e51a4c',
          tension: .4
        }
      ]
    }

    console.log(this.data.datasets[0].label)

    this.matriculadoPregrado = new MatriculadoPregrado();

    this.formulario = this.fb.group({
      FACULTAD: ['', [Validators.required]],
      PROGRAMA: ['', [Validators.required]],
      SEXO: ['', [Validators.required]],
      TIPO_COL: ['', [Validators.required]],
      ESTRATO_ORIG: ['', [Validators.required]],
      DEP_NAC: ['', [Validators.required]],
      DEP_PROC: ['', [Validators.required]],
      NACIONALIDAD: ['', [Validators.required]],
      MAT_PVEZ: ['', [Validators.required]],
      TIPO_ADM: ['', [Validators.required]],
      PAES: ['', [Validators.required]],
      PEAMA: ['', [Validators.required]],
      PBM: ['', [Validators.required]],
      EDAD: ['', [Validators.required]],
    });


    this.facultadArray = [
      { label: 'Agronomía', value: 'Agronomía' },
      { label: 'Artes', value: 'Artes' },
      { label: 'Ciencias', value: 'Ciencias' },
      { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
      { label: 'Ciencias económicas', value: 'Ciencias económicas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias políticas y sociales', value: 'Derecho, ciencias políticas y sociales' },
      { label: 'Enfermería', value: 'Enfermería' },
      { label: 'Ingeniería', value: 'Ingeniería' },
      { label: 'Medicina	', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontología', value: 'Odontología' },

    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

    ]

    this.tipoColegioArray = [
      { label: 'Privado', value: 'Privado' },
      { label: 'Oficial', value: 'Oficial' },
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
      { label: 'PACÍFICO', value: 'PACÍFICO' },
      { label: 'CENTRO ORIENTE', value: 'CENTRO ORIENTE' },
      { label: 'LLANO', value: 'LLANO' },
      { label: 'CENTRO SUR', value: 'CENTRO SUR' },
    ]

    this.depProcArray = [
      { label: 'CARIBE', value: 'CARIBE' },
      { label: 'EJE CAFETERO', value: 'EJE CAFETERO' },
      { label: 'PACÍFICO', value: 'PACÍFICO' },
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
      { label: '55 o más', value: '55 o más' }
    ]

    this.pbmArray = [
      { label: '0-9', value: '0-9' },
      { label: '10-19', value: '10-19' },
      { label: '20-29', value: '20-29' },
      { label: '30-39', value: '30-39' },
      { label: '40-49', value: '40-49' },
      { label: '50-59', value: '50-59' },
      { label: '60-69', value: '60-69' },
      { label: '70-79', value: '70-79' },
      { label: '80-89', value: '80-89' },
      { label: '90-100', value: '90-100' }
    ]

    this.matriculadoArray = [
      { label: 'Sí', value: 'Sí' },
      { label: 'No', value: 'No' },

    ]

    this.tipoAdmisionArray = [
      { label: 'Regular', value: 'Regular' },
      { label: 'PEAMA', value: 'PEAMA' },
      { label: 'PAES', value: 'PAES' },
    ]

    this.paesArray = [
      { label: 'No aplica', value: 'No aplica' },
      { label: 'Comunidades indígenas', value: 'Comunidades indígenas' },
      { label: 'Mejores bachilleres', value: 'Mejores bachilleres' },
      { label: 'Mejores bachilleres de municipios pobres', value: 'Mejores bachilleres de municipios pobres' },
      { label: 'Victimas del conflicto armado interno en Colombia', value: 'Victimas del conflicto armado interno en Colombia' },
      { label: 'Población afrocolombiana', value: 'Población afrocolombiana' }

    ]

    this.peamaArray = [
      { label: 'No aplica', value: 'No aplica' },
      { label: 'PEAMA - Amazonía', value: 'PEAMA - Amazonía' },
      { label: 'PEAMA - Caribe', value: 'PEAMA - Caribe' },
      { label: 'PEAMA - Orinoquía', value: 'PEAMA - Orinoquía' },
      { label: 'PEAMA - Sede Bogotá - Sumapaz', value: 'PEAMA - Sede Bogotá - Sumapaz' },
      { label: 'PEAMA - Tumaco', value: 'PEAMA - Tumaco' },
    ]

  }

  ngOnInit(): void {
  }

  facultadSelect(event: { value: any; originalEvent: any }) {
    this.facultad = event.value.value;
    this.programaArray = []
    if (this.facultad == 'Agronomía') {
      this.programaArray = [
        { label: 'Ingeniería agronómica', value: 'Ingeniería agronómica' }
      ]
    } else if (this.facultad == 'Artes') {
      this.programaArray = [
        { label: 'Arquitectura', value: 'Arquitectura' },
        { label: 'Artes plásticas', value: 'Artes plásticas' },
        { label: 'Cine y televisión', value: 'Cine y televisión' },
        { label: 'Diseño gráfico', value: 'Diseño gráfico' },
        { label: 'Diseño industrial', value: 'Diseño industrial' },
        { label: 'Música', value: 'Música' },
        { label: 'Música instrumental', value: 'Música instrumental' },
      ]
    } else if (this.facultad == 'Ciencias') {
      this.programaArray = [
        { label: 'Biología', value: 'Biología' },
        { label: 'Ciencias de la computación', value: 'Ciencias de la computación' },
        { label: 'Estadística', value: 'Estadística' },
        { label: 'Farmacia', value: 'Farmacia' },
        { label: 'Física', value: 'Física' },
        { label: 'Geología', value: 'Geología' },
        { label: 'Matemáticas', value: 'Matemáticas' },
        { label: 'Química', value: 'Química' }
      ]
    } else if (this.facultad == 'Ciencias agrarias') {
      this.programaArray = [
        { label: 'Ingeniería agronómica', value: 'Ingeniería agronómica' },
      ]
    } else if (this.facultad == 'Ciencias económicas') {
      this.programaArray = [
        { label: 'Administración de empresas', value: 'Administración de empresas' },
        { label: 'Contaduría pública', value: 'Contaduría pública' },
        { label: 'Economía', value: 'Economía' }
      ]
    } else if (this.facultad == 'Ciencias humanas') {
      this.programaArray = [
        { label: 'Antropología', value: 'Antropología' },
        { label: 'Español y filología clásica', value: 'Español y filología clásica' },
        { label: 'Estudios literarios', value: 'Estudios literarios' },
        { label: 'Filología e idiomas', value: 'Filología e idiomas' },
        { label: 'Filosofía', value: 'Filosofía' },
        { label: 'Geografía', value: 'Geografía' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Lingüística', value: 'Lingüística' },
        { label: 'Psicología', value: 'Psicología' },
        { label: 'Sociología', value: 'Sociología' },
        { label: 'Trabajo social', value: 'Trabajo social' },
      ]
    } else if (this.facultad == 'Derecho, ciencias políticas y sociales') {
      this.programaArray = [
        { label: 'Ciencia política', value: 'Ciencia política' },
        { label: 'Derecho', value: 'Derecho' },
      ]
    } else if (this.facultad == 'Enfermería') {
      this.programaArray = [
        { label: 'Enfermería', value: 'Enfermería' },
      ]
    } else if (this.facultad == 'Ingeniería') {
      this.programaArray = [
        { label: 'Ingeniería agrícola', value: 'Ingeniería agrícola' },
        { label: 'Ingeniería civil', value: 'Ingeniería civil' },
        { label: 'Ingeniería de sistemas', value: 'Ingeniería de sistemas' },
        { label: 'Ingeniería de sistemas y computación', value: 'Ingeniería de sistemas y computación' },
        { label: 'Ingeniería electrónica', value: 'Ingeniería electrónica' },
        { label: 'Ingeniería eléctrica', value: 'Ingeniería eléctrica' },
        { label: 'Ingeniería industrial', value: 'Ingeniería industrial' },
        { label: 'Ingeniería mecatrónica', value: 'Ingeniería mecatrónica' },
        { label: 'Ingeniería mecánica', value: 'Ingeniería mecánica' },
        { label: 'Ingeniería química', value: 'Ingeniería química' }
      ]
    } else if (this.facultad == 'Medicina') {
      this.programaArray = [
        { label: 'Fisioterapia', value: 'Fisioterapia' },
        { label: 'Fonoaudiología', value: 'Fonoaudiología' },
        { label: 'Medicina', value: 'Medicina' },
        { label: 'Nutrición y dietética', value: 'Nutrición y dietética' },
        { label: 'Terapia ocupaciónal', value: 'Terapia ocupaciónal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia') {
      this.programaArray = [
        { label: 'Medicina veterinaria', value: 'Medicina veterinaria' },
        { label: 'Zootecnia', value: 'Zootecnia' },
      ]
    } else if (this.facultad == 'Odontología') {
      this.programaArray = [
        { label: 'Odontología', value: 'Odontología' },
      ]
    }
  }
  onSubmit() {

    this.data.labels = []
    this.data.datasets[0].data = []
    this.data.datasets[1].data = []
    this.progressBar = true;
    this.showGraph = false;

    this.matriculadoPregrado.NIVEL = 'Pregrado'
    this.matriculadoPregrado.FACULTAD = this.formulario.value.FACULTAD.value;
    this.matriculadoPregrado.PROGRAMA = this.formulario.value.PROGRAMA.value;
    this.matriculadoPregrado.SEXO = this.formulario.value.SEXO.value;
    this.matriculadoPregrado.TIPO_COL = this.formulario.value.TIPO_COL.value;
    this.matriculadoPregrado.ESTRATO_ORIG = this.formulario.value.ESTRATO_ORIG.value;
    this.matriculadoPregrado.DEP_NAC = this.formulario.value.DEP_NAC.value;
    this.matriculadoPregrado.DEP_PROC = this.formulario.value.DEP_PROC.value;
    this.matriculadoPregrado.NACIONALIDAD = this.formulario.value.NACIONALIDAD.value;
    this.matriculadoPregrado.MAT_PVEZ = this.formulario.value.MAT_PVEZ.value;
    this.matriculadoPregrado.TIPO_ADM = this.formulario.value.TIPO_ADM.value;
    this.matriculadoPregrado.PAES = this.formulario.value.PAES.value;
    this.matriculadoPregrado.PEAMA = this.formulario.value.PEAMA.value;
    this.matriculadoPregrado.PBM = this.formulario.value.PBM.value;
    this.matriculadoPregrado.EDAD = this.formulario.value.EDAD.value;


    console.log(this.matriculadoPregrado);

    this.pregradoMatriculadosService.matriculados_pregrado(this.matriculadoPregrado).subscribe(
      responseData => {

        console.log(responseData)

        responseData.forEach((element: any) => {

          //console.log(element);

          if(element.True == false){
            this.data.labels.push(element.PERIODO);
            this.data.datasets[1].data.push(element.Label[0]);
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
