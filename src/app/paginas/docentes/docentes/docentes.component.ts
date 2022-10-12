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

  constructor(private fb: FormBuilder, private docentesService: DocentesService) {

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
      { label: 'Ciencias económicas', value: 'Ciencias económicas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias políticas y sociales', value: 'Derecho, ciencias políticas y sociales' },
      { label: 'Enfermería', value: 'Enfermería' },
      { label: 'Ingeniería', value: 'Ingeniería' },
      { label: 'Medicina', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontología', value: 'Odontología' },

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

    this.categoriaArray = [
      { label: 'Profesor Titular', value: 'Profesor Titular' },
      { label: 'Profesor Auxiliar', value: 'Profesor Auxiliar' },
      { label: 'Profesor Asociado', value: 'Profesor Asociado' },
      { label: 'Profesor Asistente', value: 'Profesor Asistente' },
      { label: 'Otras Categorías', value: 'Otras Categorías' },
    ]

    this.dedicacionArray = [
      { label: 'Tiempo Completo', value: 'Tiempo Completo' },
      { label: 'Medio Tiempo', value: 'Medio Tiempo' },
      { label: 'Cátedra', value: 'Cátedra' },
      { label: 'Exclusiva', value: 'Exclusiva' },
    ]

    this.formacionArray = [
      { label: 'Pregrado', value: 'Pregrado' },
      { label: 'Especialización', value: 'Especialización' },
      { label: 'Maestría', value: 'Maestría' },
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
        { label: 'Conservatorio de Música', value: 'Conservatorio de Música' },
        { label: 'Escuela de Arquitectura y Urbanismo', value: 'Escuela de Arquitectura y Urbanismo' },
        { label: 'Escuela de Artes Plásticas y Visuales', value: 'Escuela de Artes Plásticas y Visuales' },
        { label: 'Escuela de Cine y Televisión', value: 'Escuela de Cine y Televisión' },
        { label: 'Escuela de Diseño Gráfico', value: 'Escuela de Diseño Gráfico' },
        { label: 'Escuela de Diseño Industrial', value: 'Escuela de Diseño Industrial' },
        { label: 'Instituto de Investigaciones Estéticas', value: 'Instituto de Investigaciones Estéticas' },
      ]
    } else if (this.facultad == 'Ciencias') {
      this.unidadArray = [
        { label: 'Departamento de Biología', value: 'Departamento de Biología' },
        { label: 'Departamento de Estadística', value: 'Departamento de Estadística' },
        { label: 'Departamento de Farmacia', value: 'Departamento de Farmacia' },
        { label: 'Departamento de Física', value: 'Departamento de Física' },
        { label: 'Departamento de Geociencias', value: 'Departamento de Geociencias' },
        { label: 'Departamento de Matemáticas', value: 'Departamento de Matemáticas' },
        { label: 'Departamento de Química', value: 'Departamento de Química' },
        { label: 'Instituto de Ciencias Naturales', value: 'Instituto de Ciencias Naturales' },
        { label: 'Observatorio Astronómico', value: 'Observatorio Astronómico' },

      ]
    } else if (this.facultad == 'Ciencias agrarias') {
      this.unidadArray = [
        { label: 'Departamento de Agronomía', value: 'Departamento de Agronomía' },
        { label: 'Departamento de Desarrollo Rural', value: 'Departamento de Desarrollo Rural' },
      ]
    } else if (this.facultad == 'Ciencias económicas') {
      this.unidadArray = [
        { label: 'Escuela de Administración y Contaduría Pública', value: 'Escuela de Administración y Contaduría Pública' },
        { label: 'Escuela de Economía', value: 'Escuela de Economía' }
      ]
    } else if (this.facultad == 'Ciencias humanas') {
      this.unidadArray = [
        { label: 'Departamento de Antropología', value: 'Departamento de Antropología' },
        { label: 'Departamento de Filosofía', value: 'Departamento de Filosofía' },
        { label: 'Departamento de Geografía', value: 'Departamento de Geografía' },
        { label: 'Departamento de Historia', value: 'Departamento de Historia' },
        { label: 'Departamento de Lenguas Extranjeras', value: 'Departamento de Lenguas Extranjeras' },
        { label: 'Departamento de Lingüística', value: 'Departamento de Lingüística' },
        { label: 'Departamento de Literatura', value: 'Departamento de Literatura' },
        { label: 'Departamento de Psicología', value: 'Departamento de Psicología' },
        { label: 'Departamento de Sociología', value: 'Departamento de Sociología' },
        { label: 'Departamento de Trabajo Social', value: 'Departamento de Trabajo Social' },
        { label: 'Escuela de Género', value: 'Escuela de Género' },
        { label: 'Escuela de Psicoanálisis', value: 'Escuela de Psicoanálisis' },
        { label: 'Instituto de Investigación en Educación', value: 'Instituto de Investigación en Educación' },

      ]
    } else if (this.facultad == 'Derecho, ciencias políticas y sociales') {
      this.unidadArray = [
        { label: 'Departamento de Ciencia Política', value: 'Departamento de Ciencia Política' },
        { label: 'Departamento de Derecho', value: 'Departamento de Derecho' },
        { label: 'Generación 125 Años - Bogotá', value: 'Generación 125 Años - Bogotá' },
      ]
    } else if (this.facultad == 'Enfermería') {
      this.unidadArray = [
        { label: 'Departamento de Enfermería', value: 'Departamento de Enfermería' },
        { label: 'Departamento de Salud de Colectivos', value: 'Departamento de Salud de Colectivos' },
      ]
    } else if (this.facultad == 'Ingeniería') {
      this.unidadArray = [
        { label: 'Departamento de Ingeniería Civil y Agrícola', value: 'Departamento de Ingeniería Civil y Agrícola' },
        { label: 'Departamento de Ingeniería Eléctrica y Electrónica', value: 'Departamento de Ingeniería Eléctrica y Electrónica' },
        { label: 'Departamento de Ingeniería Mecánica y Mecatrónica', value: 'Departamento de Ingeniería Mecánica y Mecatrónica' },
        { label: 'Departamento de Ingeniería Química y Ambiental', value: 'Departamento de Ingeniería Química y Ambiental' },
        { label: 'Departamento de Ingeniería de Sistemas e Industrial', value: 'Departamento de Ingeniería de Sistemas e Industrial' },
      ]
    } else if (this.facultad == 'Instituto de Biotecnología - IBUN') {
      this.unidadArray = [
        { label: 'Instituto de Biotecnología', value: 'Instituto de Biotecnología' },
      ]
    } else if (this.facultad == 'Instituto de Ciencia y Tecnología de Alimentos - ICTA') {
      this.unidadArray = [
        { label: 'Instituto de Ciencia y Tecnología de Alimentos', value: 'Instituto de Ciencia y Tecnología de Alimentos' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Ambientales - IDEA') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Ambientales', value: 'Instituto de Estudios Ambientales' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Políticos y Relaciones Internacionales - IEPRI') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Políticos y Relaciones Internacionales', value: 'Instituto de Estudios Políticos y Relaciones Internacionales' },
      ]
    }else if (this.facultad == 'Instituto de Estudios Urbanos - IEU') {
      this.unidadArray = [
        { label: 'Instituto de Estudios Urbanos', value: 'Instituto de Estudios Urbanos' },
      ]
    } else if (this.facultad == 'Instituto de Estudios en Comunicación y Cultura - IECO') {
      this.unidadArray = [
        { label: 'Instituto de Estudios en Comunicación y Cultura', value: 'Instituto de Estudios en Comunicación y Cultura' },
      ]
    }  else if (this.facultad == 'Instituto de Genética - IGEN') {
      this.unidadArray = [
        { label: 'Instituto de Genética', value: 'Instituto de Genética' },
      ]
    } else if (this.facultad == 'Medicina') {
      this.unidadArray = [
        { label: 'Departamento de Ciencias Fisiológicas', value: 'Departamento de Ciencias Fisiológicas' },
        { label: 'Departamento de Cirugía', value: 'Departamento de Cirugía' },
        { label: 'Departamento de Comunicación Humana', value: 'Departamento de Comunicación Humana' },
        { label: 'Departamento de Imágenes Diagnósticas', value: 'Departamento de Imágenes Diagnósticas' },
        { label: 'Departamento de Medicina Física y Rehabilitación', value: 'Departamento de Medicina Física y Rehabilitación' },
        { label: 'Departamento de Medicina Interna', value: 'Departamento de Medicina Interna' },
        { label: 'Departamento de Microbiología', value: 'Departamento de Microbiología' },
        { label: 'Departamento de Morfología', value: 'Departamento de Morfología' },
        { label: 'Departamento de Movimiento Corporal Humano', value: 'Departamento de Movimiento Corporal Humano' },
        { label: 'Departamento de Nutrición Humana', value: 'Departamento de Nutrición Humana' },
        { label: 'Departamento de Obstetricia y Ginecología', value: 'Departamento de Obstetricia y Ginecología' },
        { label: 'Departamento de Ocupación Humana', value: 'Departamento de Ocupación Humana' },
        { label: 'Departamento de Patología', value: 'Departamento de Patología' },
        { label: 'Departamento de Pediatría', value: 'Departamento de Pediatría' },
        { label: 'Departamento de Psiquiatría', value: 'Departamento de Psiquiatría' },
        { label: 'Departamento de Salud Pública', value: 'Departamento de Salud Pública' },
        { label: 'Departamento de Toxicología', value: 'Departamento de Toxicología' },
        { label: 'Escuela de Educación Médica - Medicina', value: 'Escuela de Educación Médica - Medicina' }
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia') {
      this.unidadArray = [
        { label: 'Departamento de Producción Animal', value: 'Departamento de Producción Animal' },
        { label: 'Departamento de Salud Animal', value: 'Departamento de Salud Animal' },
      ]
    } else if (this.facultad == 'Odontología') {
      this.unidadArray = [
        { label: 'Centro de Investigación y Extensión - Odontología', value: 'Centro de Investigación y Extensión - Odontología' },
        { label: 'Departamento de Ciencias Básicas y Medicina Oral - Odontología', value: 'Departamento de Ciencias Básicas y Medicina Oral - Odontología' },
        { label: 'Departamento de Salud Colectiva', value: 'Departamento de Salud Colectiva' },
        { label: 'Departamento de Salud Oral', value: 'Departamento de Salud Oral' },
      ]
    }
  }
  onSubmit() {

    this.data.labels = []
    this.data.datasets[0].data = []
    this.data.datasets[1].data = []
    this.progressBar = true;
    this.showGraph = false;


    this.docente.SEDE = 'Bogotá'
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

        responseData.forEach((element: any) => {

          //console.log(element);


          if(element.True == false){
            this.data.labels.push(element.YEAR);
            this.data.datasets[1].data.push(element.Label[0]);
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
