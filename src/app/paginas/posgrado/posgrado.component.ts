import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatriculadoPosgrado } from 'src/app/modelos/matriculadoPosgrado';
import { PosgradoMatriculadosService } from 'src/app/servicios/matriculados/posgrado-matriculados.service';


@Component({
  selector: 'app-posgrado',
  templateUrl: './posgrado.component.html',
  styleUrls: ['./posgrado.component.css']
})
export class PosgradoComponent implements OnInit {

  formularioMatriculadoPosgrado: FormGroup;
  items: MenuItem[];
  nivelArray: Array<any> = new Array();
  facultadArray: Array<any> = new Array();
  programaArray: Array<any> = new Array();
  sexoArray: Array<any> = new Array();
  depNacArray: Array<any> = new Array();
  depProcArray: Array<any> = new Array();
  nacionalidadArray: Array<any> = new Array();
  edadArray: Array<any> = new Array();
  periodo: Array<any> = new Array();
  displayBasic: boolean = false;
  dialogMessage: string = '';

  matriculadoArray: Array<any> = new Array();
  sedeAdmisionArray: Array<any> = new Array();
  matriculadoPosgrado: MatriculadoPosgrado;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;

  progressBar: boolean = false;


  constructor(private fb: FormBuilder, private posgradoMatriculadoService: PosgradoMatriculadosService) {

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'verdaderos',
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

    this.matriculadoPosgrado = new MatriculadoPosgrado();

    this.formularioMatriculadoPosgrado = this.fb.group({
      NIVEL: ['', Validators.required],
      FACULTAD: ['', [Validators.required]],
      PROGRAMA: ['', [Validators.required]],
      SEXO: ['', [Validators.required]],
      DEP_NAC: ['', [Validators.required]],
      DEP_PROC: ['', [Validators.required]],
      NACIONALIDAD: ['', [Validators.required]],
      EDAD: ['', [Validators.required]],
      MAT_PVEZ: ['', [Validators.required]]
    });


    this.nivelArray = [
      { label: 'Doctorado', value: 'Doctorado' },
      { label: 'Maestría', value: 'Maestría' },
      { label: 'Especialización', value: 'Especialización' },
      { label: 'Especialidades médicas', value: 'Especialidades médicas' },

    ]

    this.facultadArray = [
      { label: 'Agronomía', value: 'Agronomía' },
      { label: 'Artes', value: 'Artes' },
      { label: 'Ciencias', value: 'Ciencias' },
      { label: 'Ciencias económicas', value: 'Ciencias económicas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias políticas y sociales', value: 'Derecho, ciencias políticas y sociales' },
      { label: 'Enfermería', value: 'Enfermería' },
      { label: 'Ingeniería', value: 'Ingeniería' },
      { label: 'Medicina	', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontología', value: 'Odontología' },
      { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },

    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

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

    this.matriculadoArray = [
      { label: 'Sí', value: 'Sí' },
      { label: 'No', value: 'No' },

    ]

    this.periodo = ['2018-1', '2018-7', '2019-1', '2019-7', '2020-1', '2020-7', '2021-1', '2021-7', '2022-1', '2022-7', '2023-1', '2023-7', '2024-1', '2024-7', '2025-1', '2025-7']

  }

  ngOnInit(): void {




  }


  facultadSelect(event: { value: any; originalEvent: any }) {
    this.facultad = event.value.value;
    this.programaArray = []
    console.log(this.facultad);

  }

  nivelSelect(event: { value: any; originalEvent: any }) {
    this.nivel = event.value.value;
    this.programaArray = []


    if (this.facultad == 'Agronomía' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias agropecuarias	', value: 'Ciencias agropecuarias	' },
        { label: 'Agroecología', value: 'Agroecología' }
      ]
    } else if (this.facultad == 'Agronomía' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Geomática', value: 'Geomática' }
      ]
    } else if (this.facultad == 'Agronomía' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Desarrollo rural', value: 'Desarrollo rural' },
        { label: 'Horticultura', value: 'Horticultura' },
        { label: 'Cultivos perennes industriales', value: 'Cultivos perennes industriales' }
      ]
    }

    if (this.facultad == 'Artes' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Arte y arquitectura', value: 'Arte y arquitectura' }
      ]
    } else if (this.facultad == 'Artes' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Escrituras creativas', value: 'Escrituras creativas' },
        { label: 'Museología y gestión del patrimonio', value: 'Museología y gestión del patrimonio' },
        { label: 'Artes plásticas y visuales', value: 'Artes plásticas y visuales' },
        { label: 'Maestría interdisciplinaria en teatro y artes vivas', value: 'Maestría interdisciplinaria en teatro y artes vivas' },
        { label: 'Ordenamiento urbano-regional', value: 'Ordenamiento urbano-regional' },
        { label: 'Arquitectura de la vivienda', value: 'Arquitectura de la vivienda' },
        { label: 'Arquitectura', value: 'Arquitectura' },
        { label: 'Construcción', value: 'Construcción' },
        { label: 'Urbanismo', value: 'Urbanismo' },
        { label: 'Hábitat', value: 'Hábitat' },
        { label: 'Diseño urbano', value: 'Diseño urbano' },
        { label: 'Diseño multimedia', value: 'Diseño multimedia' },
        { label: 'Historia y teoría del arte y la arquitectura', value: 'Historia y teoría del arte y la arquitectura' },
        { label: 'Musicoterapia', value: 'Musicoterapia' },
        { label: 'Conservación del patrimonio cultural inmueble', value: 'Conservación del patrimonio cultural inmueble' },
        { label: 'Pedagogía del piano', value: 'Pedagogía del piano' },
        { label: 'Comunicación y medios', value: 'Comunicación y medios' },
        { label: 'Historia y teoría del arte, la arquitectura y la ciudad', value: 'Historia y teoría del arte, la arquitectura y la ciudad' },
        { label: 'Dirección sinfónica', value: 'Dirección sinfónica' },
        { label: 'Educación artística', value: 'Educación artística' },
        { label: 'Musicología', value: 'Musicología' },
        { label: 'Diseño', value: 'Diseño' },
        { label: 'Interpretación y pedagogía instrumental', value: 'Interpretación y pedagogía instrumental' },
      ]
    } else if (this.facultad == 'Artes' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Pedagogía del diseño', value: 'Pedagogía del diseño' },
        { label: 'Diseño y desarrollo del producto', value: 'Diseño y desarrollo del producto' },
        { label: 'Diseño urbano', value: 'Diseño urbano' },
        { label: 'Fotografía', value: 'Fotografía' },
        { label: 'Instrumentos de ordenamiento urbano - regional', value: 'Instrumentos de ordenamiento urbano - regional' },
        { label: 'Animación', value: 'Animación' },
        { label: 'Educación artística', value: 'Educación artística' },

      ]
    }

    if (this.facultad == 'Ciencias' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Biología', value: 'Biología' },
        { label: 'Química', value: 'Química' },
        { label: 'Física', value: 'Física' },
        { label: 'Ciencias farmacéuticas', value: 'Ciencias farmacéuticas' },
        { label: 'Matemáticas', value: 'Matemáticas' },
        { label: 'Estadística', value: 'Estadística' },
        { label: 'Biotecnología', value: 'Biotecnología' },
        { label: 'Geociencias', value: 'Geociencias' },
        { label: 'Bioquímica', value: 'Bioquímica' },
        { label: 'Astronomía', value: 'Astronomía' },
      ]
    } else if (this.facultad == 'Ciencias' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Biología', value: 'Biología' },
        { label: 'Química', value: 'Química' },
        { label: 'Ciencias farmacéuticas', value: 'Ciencias farmacéuticas' },
        { label: 'Geofísica', value: 'Geofísica' },
        { label: 'Física', value: 'Física' },
        { label: 'Astronomía', value: 'Astronomía' },
        { label: 'Matemáticas', value: 'Matemáticas' },
        { label: 'Estadística', value: 'Estadística' },
        { label: 'Geología', value: 'Geología' },
        { label: 'Meteorología', value: 'Meteorología' },
        { label: 'Física médica', value: 'Física médica' },
        { label: 'Matemática aplicada', value: 'Matemática aplicada' },
        { label: 'Farmacología', value: 'Farmacología' },
        { label: 'Bioquímica', value: 'Bioquímica' },
        { label: 'Enseñanza de las ciencias exactas y naturales', value: 'Enseñanza de las ciencias exactas y naturales' },
        { label: 'Ciencia y tecnología de alimentos', value: 'Ciencia y tecnología de alimentos' },
        { label: 'Bioestadística', value: 'Bioestadística' },
        { label: 'Actuaría y finanzas', value: 'Actuaría y finanzas' }
      ]
    } else if (this.facultad == 'Ciencias' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Ciencia y tecnología de alimentos', value: 'Ciencia y tecnología de alimentos' },
        { label: 'Estadística', value: 'Estadística' },
        { label: 'Ciencias física', value: 'Ciencias física' },
        { label: 'Actuaría', value: 'Actuaría' },
        { label: 'Ciencia y tecnología cosmética', value: 'Ciencia y tecnología cosmética' },
        { label: 'Derecho del trabajo', value: 'Derecho del trabajo' },
        { label: 'Métodos estadísticos básicos', value: 'Métodos estadísticos básicos' },
      ]
    }

    if (this.facultad == 'Ciencias económicas' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias económicas', value: 'Ciencias económicas' },
        { label: 'Administración', value: 'Administración' },
      ]
    } else if (this.facultad == 'Ciencias económicas' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Ciencias económicas', value: 'Ciencias económicas' },
        { label: 'Medio ambiente y desarrollo', value: 'Medio ambiente y desarrollo' },
        { label: 'Administración', value: 'Administración' },
        { label: 'Estudios políticos', value: 'Estudios políticos' },
        { label: 'Contabilidad y finanzas', value: 'Contabilidad y finanzas' },
        { label: 'Gobierno urbano', value: 'Gobierno urbano' },
      ]
    }

    if (this.facultad == 'Ciencias humanas' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Filosofía', value: 'Filosofía' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Geografía', value: 'Geografía' },
        { label: 'Ciencias humanas y sociales', value: 'Ciencias humanas y sociales' },
        { label: 'Antropología', value: 'Antropología' },
        { label: 'Psicología', value: 'Psicología' },
      ]
    } else if (this.facultad == 'Ciencias humanas' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Estudios literarios', value: 'Estudios literarios' },
        { label: 'Estudios de género área mujer y desarrollo', value: 'Estudios de género área mujer y desarrollo' },
        { label: 'Antropología', value: 'Antropología' },
        { label: 'Filosofía', value: 'Filosofía' },
        { label: 'Estudios culturales', value: 'Estudios culturales' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Psicología', value: 'Psicología' },
        { label: 'Sociología', value: 'Sociología' },
        { label: 'Lingüística', value: 'Lingüística' },
        { label: 'Estudios sociales de la ciencia', value: 'Estudios sociales de la ciencia' },
        { label: 'Educación', value: 'Educación' },
        { label: 'Psicoanálisis, subjetividad y cultura', value: 'Psicoanálisis, subjetividad y cultura' },
        { label: 'Trabajo social', value: 'Trabajo social' },
        { label: 'Geografía', value: 'Geografía' },
        { label: 'Comunicación y medios', value: 'Comunicación y medios' },
      ]
    } else if (this.facultad == 'Ciencias humanas' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Antropología forense', value: 'Antropología forense' },
        { label: 'Especialización acción sin daños y construcción de paz', value: 'Especialización acción sin daños y construcción de paz' },
        { label: 'Filosofía política', value: 'Filosofía política' },
        { label: 'Estudios feministas y de género', value: 'Estudios feministas y de género' },
        { label: 'Análisis espacial', value: 'Análisis espacial' },
        { label: 'Turismo, ambiente y territorio', value: 'Turismo, ambiente y territorio' }
      ]
    }

    if (this.facultad == 'Derecho, ciencias políticas y sociales' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Estudios políticos y relaciónes internaciónales', value: 'Estudios políticos y relaciónes internaciónales' },
        { label: 'Derecho', value: 'Derecho' }
      ]
    } else if (this.facultad == 'Derecho, ciencias políticas y sociales' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Derecho', value: 'Derecho' },
        { label: 'Estudios políticos', value: 'Estudios políticos' },
        { label: 'Biociencias y derecho', value: 'Biociencias y derecho' },
        { label: 'Políticas públicas', value: 'Políticas públicas' },
        { label: 'Estudios políticos latinoaméricanos', value: 'Estudios políticos latinoaméricanos' }
      ]
    } else if (this.facultad == 'Derecho, ciencias políticas y sociales' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Derecho del trabajo', value: 'Derecho del trabajo' },
        { label: 'Derecho constituciónal', value: 'Derecho constituciónal' },
        { label: 'Análisis de políticas públicas', value: 'Análisis de políticas públicas' },
        { label: 'Derecho privado económico', value: 'Derecho privado económico' },
        { label: 'Derecho administrativo', value: 'Derecho administrativo' },
        { label: 'Instituciones jurídico-procesales', value: 'Instituciones jurídico-procesales' },
        { label: 'Instituciones jurídico-penales', value: 'Instituciones jurídico-penales' },
        { label: 'Mercados y políticas de suelo en américa latina', value: 'Mercados y políticas de suelo en américa latina' },
        { label: 'Instituciónes juridicas de la seguridad social', value: 'Instituciónes juridicas de la seguridad social' },
        { label: 'Derecho de familia', value: 'Derecho de familia' },
        { label: 'Derechos humanos y derecho internaciónal humanitario', value: 'Derechos humanos y derecho internaciónal humanitario' },
        { label: 'Instituciones jurídicas de la seguridad social', value: 'Instituciones jurídicas de la seguridad social' },
        { label: 'Justicia, víctimas y construcción de paz', value: 'Justicia, víctimas y construcción de paz' },
      ]
    }

    if (this.facultad == 'Enfermería' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Enfermería', value: 'Enfermería' },
      ]
    } else if (this.facultad == 'Enfermería' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Enfermería', value: 'Enfermería' },
        { label: 'Salud y seguridad en el trabajo', value: 'Salud y seguridad en el trabajo' }
      ]
    } else if (this.facultad == 'Enfermería' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Enfermería materno perinatal', value: 'Enfermería materno perinatal' },
        { label: 'Salud ocupaciónal', value: 'Salud ocupaciónal' },
        { label: 'Enfermería cardiorrespiratoria', value: 'Enfermería cardiorrespiratoria' },
        { label: 'Salud y seguridad en el trabajo', value: 'Salud y seguridad en el trabajo' },
        { label: 'Enfermería materna perinatal con apoyo familiar', value: 'Enfermería materna perinatal con apoyo familiar' }
      ]
    }

    if (this.facultad == 'Ingeniería' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ingeniería eléctrica', value: 'Ingeniería eléctrica' },
        { label: 'Ingeniería de sistemas', value: 'Ingeniería de sistemas' },
        { label: 'Ingeniería - geotecnia', value: 'Ingeniería - geotecnia' },
        { label: 'Ingeniería - ciencia y tecnología de los materiales', value: 'Ingeniería - ciencia y tecnología de los materiales' },
        { label: 'Ingeniería química', value: 'Ingeniería química' },
        { label: 'Ingeniería mecánica y mecatrónica', value: 'Ingeniería mecánica y mecatrónica' },
        { label: 'Ingeniería - industria y organizaciones', value: 'Ingeniería - industria y organizaciones' },
        { label: 'Ingeniería civil', value: 'Ingeniería civil' },
        { label: 'Estudios ambientales', value: 'Estudios ambientales' }
      ]
    } else if (this.facultad == 'Ingeniería' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Ingeniería - telecomunicaciónes', value: 'Ingeniería - telecomunicaciónes' },
        { label: 'Ingeniería - estructuras', value: 'Ingeniería - estructuras' },
        { label: 'Ingeniería ambiental', value: 'Ingeniería ambiental' },
        { label: 'Ingeniería - transportes', value: 'Ingeniería - transportes' },
        { label: 'Ingeniería química', value: 'Ingeniería química' },
        { label: 'Ingeniería eléctrica', value: 'Ingeniería eléctrica' },
        { label: 'Ingeniería - materiales y procesos', value: 'Ingeniería - materiales y procesos' },
        { label: 'Ingeniería - automatización industrial', value: 'Ingeniería - automatización industrial' },
        { label: 'Ingeniería mecánica', value: 'Ingeniería mecánica' },
        { label: 'Ingeniería - recursos hidráulicos', value: 'Ingeniería - recursos hidráulicos' },
        { label: 'Ingeniería - geotecnia', value: 'Ingeniería - geotecnia' },
        { label: 'Ingeniería de sistemas', value: 'Ingeniería de sistemas' },
        { label: 'Ingeniería industrial', value: 'Ingeniería industrial' },
        { label: 'Ingeniería agrícola', value: 'Ingeniería agrícola' },
        { label: 'Ingeniería electrónica', value: 'Ingeniería electrónica' },
        { label: 'Bioinformática', value: 'Bioinformática' }


      ]
    } else if (this.facultad == 'Ingeniería' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Tránsito, diseño y seguridad vial', value: 'Tránsito, diseño y seguridad vial' },
        { label: 'Automatización industrial', value: 'Automatización industrial' },
        { label: 'Iluminación pública y privada', value: 'Iluminación pública y privada' },
        { label: 'Estructuras', value: 'Estructuras' },
        { label: 'Ingeniería ambiental - área sanitaria', value: 'Ingeniería ambiental - área sanitaria' },
        { label: 'Transportes', value: 'Transportes' },
        { label: 'Gobierno electrónico', value: 'Gobierno electrónico' }
      ]
    }

    if (this.facultad == 'Medicina' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Salud pública', value: 'Salud pública' },
        { label: 'Ciencias biomédicas', value: 'Ciencias biomédicas' },
        { label: 'Oncología', value: 'Oncología' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Medicina alternativa', value: 'Medicina alternativa' },
        { label: 'Salud pública', value: 'Salud pública' },
        { label: 'Toxicología', value: 'Toxicología' },
        { label: 'Discapacidad e inclusión social', value: 'Discapacidad e inclusión social' },
        { label: 'Ingeniería biomédica', value: 'Ingeniería biomédica' },
        { label: 'Bioquímica', value: 'Bioquímica' },
        { label: 'Fisiología', value: 'Fisiología' },
        { label: 'Neurociencias', value: 'Neurociencias' },
        { label: 'Epidemiología clínica', value: 'Epidemiología clínica' },
        { label: 'Infecciones y salud en el trópico', value: 'Infecciones y salud en el trópico' },
        { label: 'Genética humana', value: 'Genética humana' },
        { label: 'Morfología humana', value: 'Morfología humana' },
        { label: 'Fisioterapia del deporte y la actividad física', value: 'Fisioterapia del deporte y la actividad física' },
        { label: 'Seguridad alimentaria y nutriciónal', value: 'Seguridad alimentaria y nutriciónal' },
        { label: 'Inmunología', value: 'Inmunología' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Alimentación y nutrición en promoción de la salud', value: 'Alimentación y nutrición en promoción de la salud' },
        { label: 'Administración salud pública', value: 'Administración salud pública' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Especialidades médicas') {
      this.programaArray = [
        { label: 'Ortopedia y traumatología', value: 'Ortopedia y traumatología' },
        { label: 'Urología', value: 'Urología' },
        { label: 'Oncohematología pediátrica', value: 'Oncohematología pediátrica' },
        { label: 'Medicina interna', value: 'Medicina interna' },
        { label: 'Cirugía general', value: 'Cirugía general' },
        { label: 'Endocrinología', value: 'Endocrinología' },
        { label: 'Infectología', value: 'Infectología' },
        { label: 'Medicina física y rehabilitación', value: 'Medicina física y rehabilitación' },
        { label: 'Anestesiología y reanimación', value: 'Anestesiología y reanimación' },
        { label: 'Obstetricia y ginecología', value: 'Obstetricia y ginecología' },
        { label: 'Dermatología', value: 'Dermatología' },
        { label: 'Medicina aeroespacial', value: 'Medicina aeroespacial' },
        { label: 'Cirugía plástica', value: 'Cirugía plástica' },
        { label: 'Psiquiatría', value: 'Psiquiatría' },
        { label: 'Neurocirugía', value: 'Neurocirugía' },
        { label: 'Neurología clínica', value: 'Neurología clínica' },
        { label: 'Patología anatómica y clínica', value: 'Patología anatómica y clínica' },
        { label: 'Otorrinolaringología', value: 'Otorrinolaringología' },
        { label: 'Pediatría', value: 'Pediatría' },
        { label: 'Geriatría', value: 'Geriatría' },
        { label: 'Cirugía pediátrica', value: 'Cirugía pediátrica' },
        { label: 'Radiología e imágenes diagnósticas', value: 'Radiología e imágenes diagnósticas' },
        { label: 'Cuidado intensivo pediátrico', value: 'Cuidado intensivo pediátrico' },
        { label: 'Perinatología y neonatología', value: 'Perinatología y neonatología' },
        { label: 'Oftalmología', value: 'Oftalmología' },
        { label: 'Medicina forense', value: 'Medicina forense' },
        { label: 'Gastroenterología', value: 'Gastroenterología' },
        { label: 'Hematología', value: 'Hematología' },
        { label: 'Reumatología', value: 'Reumatología' },
        { label: 'Neuropedatría', value: 'Neuropedatría' },
        { label: 'Neumología clínica', value: 'Neumología clínica' },
        { label: 'Neuropediatría', value: 'Neuropediatría' },
        { label: 'Radiología pediátrica', value: 'Radiología pediátrica' },
        { label: 'Medicina del deporte', value: 'Medicina del deporte' }
      ]
    }

    if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Salud animal o producción animal', value: 'Salud animal o producción animal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Salud y producción animal', value: 'Salud y producción animal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Especialidades médicas') {
      this.programaArray = [
        { label: 'Anatomopatología veterinaria', value: 'Anatomopatología veterinaria' },
      ]
    }

    if (this.facultad == 'Odontología' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Odontología', value: 'Odontología' },
      ]
    } else if (this.facultad == 'Odontología' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Operatoria dental estética', value: 'Operatoria dental estética' },
      ]
    } else if (this.facultad == 'Odontología' && this.nivel == 'Especialidades médicas') {
      this.programaArray = [
        { label: 'Cirugía oral y maxilofacial', value: 'Cirugía oral y maxilofacial' },
        { label: 'Estomatología pediátrica y ortopedia maxilar', value: 'Estomatología pediátrica y ortopedia maxilar' },
        { label: 'Rehabilitación oral', value: 'Rehabilitación oral' },
        { label: 'Ortodoncia', value: 'Ortodoncia' },
        { label: 'Periodoncia', value: 'Periodoncia' },
        { label: 'Endodoncia', value: 'Endodoncia' },
        { label: 'Ortodoncia y ortopedia maxilar', value: 'Ortodoncia y ortopedia maxilar' },
      ]
    }

    if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias agropecuarias', value: 'Ciencias agropecuarias' },
        { label: 'Agroecología', value: 'Agroecología' },
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Ciencia y tecnología de alimentos', value: 'Ciencia y tecnología de alimentos' },
      ]
    } else if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Maestría') {
      this.programaArray = [
        { label: 'Ciencia y tecnología de alimentos', value: 'Ciencia y tecnología de alimentos' },
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Geomática', value: 'Geomática' },
        { label: 'Gestión y desarrollo rural', value: 'Gestión y desarrollo rural' },
      ]
    } else if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Especialización') {
      this.programaArray = [
        { label: 'Ciencia y tecnología de alimentos', value: 'Ciencia y tecnología de alimentos' },
        { label: 'Cultivos perennes industriales', value: 'Cultivos perennes industriales' },
      ]
    }

  }



  onSubmit() {

    this.data.labels = []
    this.data.datasets[0].data = []
    this.progressBar = true;
    this.showGraph = false;

    this.matriculadoPosgrado.NIVEL = this.formularioMatriculadoPosgrado.value.NIVEL.value;
    this.matriculadoPosgrado.FACULTAD = this.formularioMatriculadoPosgrado.value.FACULTAD.value;
    this.matriculadoPosgrado.PROGRAMA = this.formularioMatriculadoPosgrado.value.PROGRAMA.value;
    this.matriculadoPosgrado.SEXO = this.formularioMatriculadoPosgrado.value.SEXO.value;
    this.matriculadoPosgrado.DEP_NAC = this.formularioMatriculadoPosgrado.value.DEP_NAC.value;
    this.matriculadoPosgrado.DEP_PROC = this.formularioMatriculadoPosgrado.value.DEP_PROC.value;
    this.matriculadoPosgrado.NACIONALIDAD = this.formularioMatriculadoPosgrado.value.NACIONALIDAD.value;
    this.matriculadoPosgrado.EDAD = this.formularioMatriculadoPosgrado.value.EDAD.value;
    this.matriculadoPosgrado.MAT_PVEZ = this.formularioMatriculadoPosgrado.value.MAT_PVEZ.value;

    this.progressBar = true;

    console.log(this.matriculadoPosgrado);

    this.posgradoMatriculadoService.matriculados_posgrado(this.matriculadoPosgrado).subscribe(
      responseData => {

        console.log("Response")
        console.log(responseData)

        this.data.labels.splice(0, this.data.labels.length);
        this.data.datasets[0].data.splice(0, this.data.datasets[0].data.length);

        responseData.forEach((element: any) => {

          console.log(element);
          if(element.True == false){
            this.data.labels.push(element.PERIODO);
            this.data.datasets[1].data.push(element.Label[0]);
          } else {

            this.data.datasets[0].data.push(element.Label);
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
