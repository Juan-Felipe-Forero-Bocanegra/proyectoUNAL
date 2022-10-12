import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { GraduadosPregrado } from 'src/app/modelos/graduadosPregrado';
import { GraduadosPregradoService } from 'src/app/servicios/graduados/graduados-pregrado.service';

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

  constructor(private fb: FormBuilder, private graduadosPregradoService: GraduadosPregradoService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Cantidad de graduados',
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
