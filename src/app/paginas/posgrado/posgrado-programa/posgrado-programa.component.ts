import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatriculadoPosgrado } from 'src/app/modelos/matriculadoPosgrado';
import { PosgradoMatriculadosService } from 'src/app/servicios/matriculados/posgrado-matriculados.service';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-posgrado-programa',
  templateUrl: './posgrado-programa.component.html',
  styleUrls: ['./posgrado-programa.component.css']
})
export class PosgradoProgramaComponent implements OnInit {

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


  matriculadoArray: Array<any> = new Array();
  sedeAdmisionArray: Array<any> = new Array();
  matriculadoPosgrado: MatriculadoPosgrado;

  facultad: String = "";
  nivel: String = "";

  data: any;
  basicOptions: any;
  showGraph: boolean = false;
  displayBasic: boolean = false;
  dialogMessage: string = '';
  progressBar: boolean = false;
  ListaExcel: any[]

  constructor(private fb: FormBuilder, private posgradoMatriculadoService: PosgradoMatriculadosService) {

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

    this.matriculadoPosgrado = new MatriculadoPosgrado();

    this.formularioMatriculadoPosgrado = this.fb.group({
      NIVEL: ['', Validators.required],
      FACULTAD: ['', [Validators.required]],
      PROGRAMA: ['', [Validators.required]],
    });



    this.nivelArray = [
      { label: 'Doctorado', value: 'Doctorado' },
      { label: 'Maestr??a', value: 'Maestr??a' },
      { label: 'Especializaci??n', value: 'Especializaci??n' },
      { label: 'Especialidades m??dicas', value: 'Especialidades m??dicas' },

    ]

    this.facultadArray = [
      { label: 'Agronom??a', value: 'Agronom??a' },
      { label: 'Artes', value: 'Artes' },
      { label: 'Ciencias', value: 'Ciencias' },
      { label: 'Ciencias econ??micas', value: 'Ciencias econ??micas' },
      { label: 'Ciencias humanas', value: 'Ciencias humanas' },
      { label: 'Derecho, ciencias pol??ticas y sociales', value: 'Derecho, ciencias pol??ticas y sociales' },
      { label: 'Enfermer??a', value: 'Enfermer??a' },
      { label: 'Ingenier??a', value: 'Ingenier??a' },
      { label: 'Medicina	', value: 'Medicina' },
      { label: 'Medicina veterinaria y de zootecnia', value: 'Medicina veterinaria y de zootecnia' },
      { label: 'Odontolog??a', value: 'Odontolog??a' },
      { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },

    ]

    this.sexoArray = [
      { label: 'Mujeres', value: 'Mujeres' },
      { label: 'Hombres', value: 'Hombres' },

    ]

    this.depNacArray = [
      { label: 'CARIBE', value: 'CARIBE' },
      { label: 'EJE CAFETERO', value: 'EJE CAFETERO' },
      { label: 'PAC??FICO', value: 'PAC??FICO' },
      { label: 'CENTRO ORIENTE', value: 'CENTRO ORIENTE' },
      { label: 'LLANO', value: 'LLANO' },
      { label: 'CENTRO SUR', value: 'CENTRO SUR' },
    ]

    this.depProcArray = [
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

    this.matriculadoArray = [
      { label: 'S??', value: 'S??' },
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


    if (this.facultad == 'Agronom??a' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias agropecuarias	', value: 'Ciencias agropecuarias	' },
        { label: 'Agroecolog??a', value: 'Agroecolog??a' }
      ]
    } else if (this.facultad == 'Agronom??a' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Geom??tica', value: 'Geom??tica' }
      ]
    } else if (this.facultad == 'Agronom??a' && this.nivel == 'Especializaci??n') {
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
    } else if (this.facultad == 'Artes' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Escrituras creativas', value: 'Escrituras creativas' },
        { label: 'Museolog??a y gesti??n del patrimonio', value: 'Museolog??a y gesti??n del patrimonio' },
        { label: 'Artes pl??sticas y visuales', value: 'Artes pl??sticas y visuales' },
        { label: 'Maestr??a interdisciplinaria en teatro y artes vivas', value: 'Maestr??a interdisciplinaria en teatro y artes vivas' },
        { label: 'Ordenamiento urbano-regional', value: 'Ordenamiento urbano-regional' },
        { label: 'Arquitectura de la vivienda', value: 'Arquitectura de la vivienda' },
        { label: 'Arquitectura', value: 'Arquitectura' },
        { label: 'Construcci??n', value: 'Construcci??n' },
        { label: 'Urbanismo', value: 'Urbanismo' },
        { label: 'H??bitat', value: 'H??bitat' },
        { label: 'Dise??o urbano', value: 'Dise??o urbano' },
        { label: 'Dise??o multimedia', value: 'Dise??o multimedia' },
        { label: 'Historia y teor??a del arte y la arquitectura', value: 'Historia y teor??a del arte y la arquitectura' },
        { label: 'Musicoterapia', value: 'Musicoterapia' },
        { label: 'Conservaci??n del patrimonio cultural inmueble', value: 'Conservaci??n del patrimonio cultural inmueble' },
        { label: 'Pedagog??a del piano', value: 'Pedagog??a del piano' },
        { label: 'Comunicaci??n y medios', value: 'Comunicaci??n y medios' },
        { label: 'Historia y teor??a del arte, la arquitectura y la ciudad', value: 'Historia y teor??a del arte, la arquitectura y la ciudad' },
        { label: 'Direcci??n sinf??nica', value: 'Direcci??n sinf??nica' },
        { label: 'Educaci??n art??stica', value: 'Educaci??n art??stica' },
        { label: 'Musicolog??a', value: 'Musicolog??a' },
        { label: 'Dise??o', value: 'Dise??o' },
        { label: 'Interpretaci??n y pedagog??a instrumental', value: 'Interpretaci??n y pedagog??a instrumental' },
      ]
    } else if (this.facultad == 'Artes' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Pedagog??a del dise??o', value: 'Pedagog??a del dise??o' },
        { label: 'Dise??o y desarrollo del producto', value: 'Dise??o y desarrollo del producto' },
        { label: 'Dise??o urbano', value: 'Dise??o urbano' },
        { label: 'Fotograf??a', value: 'Fotograf??a' },
        { label: 'Instrumentos de ordenamiento urbano - regional', value: 'Instrumentos de ordenamiento urbano - regional' },
        { label: 'Animaci??n', value: 'Animaci??n' },
        { label: 'Educaci??n art??stica', value: 'Educaci??n art??stica' },

      ]
    }

    if (this.facultad == 'Ciencias' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Biolog??a', value: 'Biolog??a' },
        { label: 'Qu??mica', value: 'Qu??mica' },
        { label: 'F??sica', value: 'F??sica' },
        { label: 'Ciencias farmac??uticas', value: 'Ciencias farmac??uticas' },
        { label: 'Matem??ticas', value: 'Matem??ticas' },
        { label: 'Estad??stica', value: 'Estad??stica' },
        { label: 'Biotecnolog??a', value: 'Biotecnolog??a' },
        { label: 'Geociencias', value: 'Geociencias' },
        { label: 'Bioqu??mica', value: 'Bioqu??mica' },
        { label: 'Astronom??a', value: 'Astronom??a' },
      ]
    } else if (this.facultad == 'Ciencias' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Biolog??a', value: 'Biolog??a' },
        { label: 'Qu??mica', value: 'Qu??mica' },
        { label: 'Ciencias farmac??uticas', value: 'Ciencias farmac??uticas' },
        { label: 'Geof??sica', value: 'Geof??sica' },
        { label: 'F??sica', value: 'F??sica' },
        { label: 'Astronom??a', value: 'Astronom??a' },
        { label: 'Matem??ticas', value: 'Matem??ticas' },
        { label: 'Estad??stica', value: 'Estad??stica' },
        { label: 'Geolog??a', value: 'Geolog??a' },
        { label: 'Meteorolog??a', value: 'Meteorolog??a' },
        { label: 'F??sica m??dica', value: 'F??sica m??dica' },
        { label: 'Matem??tica aplicada', value: 'Matem??tica aplicada' },
        { label: 'Farmacolog??a', value: 'Farmacolog??a' },
        { label: 'Bioqu??mica', value: 'Bioqu??mica' },
        { label: 'Ense??anza de las ciencias exactas y naturales', value: 'Ense??anza de las ciencias exactas y naturales' },
        { label: 'Ciencia y tecnolog??a de alimentos', value: 'Ciencia y tecnolog??a de alimentos' },
        { label: 'Bioestad??stica', value: 'Bioestad??stica' },
        { label: 'Actuar??a y finanzas', value: 'Actuar??a y finanzas' }
      ]
    } else if (this.facultad == 'Ciencias' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Ciencia y tecnolog??a de alimentos', value: 'Ciencia y tecnolog??a de alimentos' },
        { label: 'Estad??stica', value: 'Estad??stica' },
        { label: 'Ciencias f??sica', value: 'Ciencias f??sica' },
        { label: 'Actuar??a', value: 'Actuar??a' },
        { label: 'Ciencia y tecnolog??a cosm??tica', value: 'Ciencia y tecnolog??a cosm??tica' },
        { label: 'Derecho del trabajo', value: 'Derecho del trabajo' },
        { label: 'M??todos estad??sticos b??sicos', value: 'M??todos estad??sticos b??sicos' },
      ]
    }

    if (this.facultad == 'Ciencias econ??micas' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias econ??micas', value: 'Ciencias econ??micas' },
        { label: 'Administraci??n', value: 'Administraci??n' },
      ]
    } else if (this.facultad == 'Ciencias econ??micas' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Ciencias econ??micas', value: 'Ciencias econ??micas' },
        { label: 'Medio ambiente y desarrollo', value: 'Medio ambiente y desarrollo' },
        { label: 'Administraci??n', value: 'Administraci??n' },
        { label: 'Estudios pol??ticos', value: 'Estudios pol??ticos' },
        { label: 'Contabilidad y finanzas', value: 'Contabilidad y finanzas' },
        { label: 'Gobierno urbano', value: 'Gobierno urbano' },
      ]
    }

    if (this.facultad == 'Ciencias humanas' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Filosof??a', value: 'Filosof??a' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Geograf??a', value: 'Geograf??a' },
        { label: 'Ciencias humanas y sociales', value: 'Ciencias humanas y sociales' },
        { label: 'Antropolog??a', value: 'Antropolog??a' },
        { label: 'Psicolog??a', value: 'Psicolog??a' },
      ]
    } else if (this.facultad == 'Ciencias humanas' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Estudios literarios', value: 'Estudios literarios' },
        { label: 'Estudios de g??nero ??rea mujer y desarrollo', value: 'Estudios de g??nero ??rea mujer y desarrollo' },
        { label: 'Antropolog??a', value: 'Antropolog??a' },
        { label: 'Filosof??a', value: 'Filosof??a' },
        { label: 'Estudios culturales', value: 'Estudios culturales' },
        { label: 'Historia', value: 'Historia' },
        { label: 'Psicolog??a', value: 'Psicolog??a' },
        { label: 'Sociolog??a', value: 'Sociolog??a' },
        { label: 'Ling????stica', value: 'Ling????stica' },
        { label: 'Estudios sociales de la ciencia', value: 'Estudios sociales de la ciencia' },
        { label: 'Educaci??n', value: 'Educaci??n' },
        { label: 'Psicoan??lisis, subjetividad y cultura', value: 'Psicoan??lisis, subjetividad y cultura' },
        { label: 'Trabajo social', value: 'Trabajo social' },
        { label: 'Geograf??a', value: 'Geograf??a' },
        { label: 'Comunicaci??n y medios', value: 'Comunicaci??n y medios' },
      ]
    } else if (this.facultad == 'Ciencias humanas' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Antropolog??a forense', value: 'Antropolog??a forense' },
        { label: 'Especializaci??n acci??n sin da??os y construcci??n de paz', value: 'Especializaci??n acci??n sin da??os y construcci??n de paz' },
        { label: 'Filosof??a pol??tica', value: 'Filosof??a pol??tica' },
        { label: 'Estudios feministas y de g??nero', value: 'Estudios feministas y de g??nero' },
        { label: 'An??lisis espacial', value: 'An??lisis espacial' },
        { label: 'Turismo, ambiente y territorio', value: 'Turismo, ambiente y territorio' }
      ]
    }

    if (this.facultad == 'Derecho, ciencias pol??ticas y sociales' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Estudios pol??ticos y relaci??nes internaci??nales', value: 'Estudios pol??ticos y relaci??nes internaci??nales' },
        { label: 'Derecho', value: 'Derecho' }
      ]
    } else if (this.facultad == 'Derecho, ciencias pol??ticas y sociales' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Derecho', value: 'Derecho' },
        { label: 'Estudios pol??ticos', value: 'Estudios pol??ticos' },
        { label: 'Biociencias y derecho', value: 'Biociencias y derecho' },
        { label: 'Pol??ticas p??blicas', value: 'Pol??ticas p??blicas' },
        { label: 'Estudios pol??ticos latinoam??ricanos', value: 'Estudios pol??ticos latinoam??ricanos' }
      ]
    } else if (this.facultad == 'Derecho, ciencias pol??ticas y sociales' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Derecho del trabajo', value: 'Derecho del trabajo' },
        { label: 'Derecho constituci??nal', value: 'Derecho constituci??nal' },
        { label: 'An??lisis de pol??ticas p??blicas', value: 'An??lisis de pol??ticas p??blicas' },
        { label: 'Derecho privado econ??mico', value: 'Derecho privado econ??mico' },
        { label: 'Derecho administrativo', value: 'Derecho administrativo' },
        { label: 'Instituciones jur??dico-procesales', value: 'Instituciones jur??dico-procesales' },
        { label: 'Instituciones jur??dico-penales', value: 'Instituciones jur??dico-penales' },
        { label: 'Mercados y pol??ticas de suelo en am??rica latina', value: 'Mercados y pol??ticas de suelo en am??rica latina' },
        { label: 'Instituci??nes juridicas de la seguridad social', value: 'Instituci??nes juridicas de la seguridad social' },
        { label: 'Derecho de familia', value: 'Derecho de familia' },
        { label: 'Derechos humanos y derecho internaci??nal humanitario', value: 'Derechos humanos y derecho internaci??nal humanitario' },
        { label: 'Instituciones jur??dicas de la seguridad social', value: 'Instituciones jur??dicas de la seguridad social' },
        { label: 'Justicia, v??ctimas y construcci??n de paz', value: 'Justicia, v??ctimas y construcci??n de paz' },
      ]
    }

    if (this.facultad == 'Enfermer??a' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Enfermer??a', value: 'Enfermer??a' },
      ]
    } else if (this.facultad == 'Enfermer??a' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Enfermer??a', value: 'Enfermer??a' },
        { label: 'Salud y seguridad en el trabajo', value: 'Salud y seguridad en el trabajo' }
      ]
    } else if (this.facultad == 'Enfermer??a' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Enfermer??a materno perinatal', value: 'Enfermer??a materno perinatal' },
        { label: 'Salud ocupaci??nal', value: 'Salud ocupaci??nal' },
        { label: 'Enfermer??a cardiorrespiratoria', value: 'Enfermer??a cardiorrespiratoria' },
        { label: 'Salud y seguridad en el trabajo', value: 'Salud y seguridad en el trabajo' },
        { label: 'Enfermer??a materna perinatal con apoyo familiar', value: 'Enfermer??a materna perinatal con apoyo familiar' }
      ]
    }

    if (this.facultad == 'Ingenier??a' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ingenier??a el??ctrica', value: 'Ingenier??a el??ctrica' },
        { label: 'Ingenier??a de sistemas', value: 'Ingenier??a de sistemas' },
        { label: 'Ingenier??a - geotecnia', value: 'Ingenier??a - geotecnia' },
        { label: 'Ingenier??a - ciencia y tecnolog??a de los materiales', value: 'Ingenier??a - ciencia y tecnolog??a de los materiales' },
        { label: 'Ingenier??a qu??mica', value: 'Ingenier??a qu??mica' },
        { label: 'Ingenier??a mec??nica y mecatr??nica', value: 'Ingenier??a mec??nica y mecatr??nica' },
        { label: 'Ingenier??a - industria y organizaciones', value: 'Ingenier??a - industria y organizaciones' },
        { label: 'Ingenier??a civil', value: 'Ingenier??a civil' },
        { label: 'Estudios ambientales', value: 'Estudios ambientales' }
      ]
    } else if (this.facultad == 'Ingenier??a' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Ingenier??a - telecomunicaci??nes', value: 'Ingenier??a - telecomunicaci??nes' },
        { label: 'Ingenier??a - estructuras', value: 'Ingenier??a - estructuras' },
        { label: 'Ingenier??a ambiental', value: 'Ingenier??a ambiental' },
        { label: 'Ingenier??a - transportes', value: 'Ingenier??a - transportes' },
        { label: 'Ingenier??a qu??mica', value: 'Ingenier??a qu??mica' },
        { label: 'Ingenier??a el??ctrica', value: 'Ingenier??a el??ctrica' },
        { label: 'Ingenier??a - materiales y procesos', value: 'Ingenier??a - materiales y procesos' },
        { label: 'Ingenier??a - automatizaci??n industrial', value: 'Ingenier??a - automatizaci??n industrial' },
        { label: 'Ingenier??a mec??nica', value: 'Ingenier??a mec??nica' },
        { label: 'Ingenier??a - recursos hidr??ulicos', value: 'Ingenier??a - recursos hidr??ulicos' },
        { label: 'Ingenier??a - geotecnia', value: 'Ingenier??a - geotecnia' },
        { label: 'Ingenier??a de sistemas', value: 'Ingenier??a de sistemas' },
        { label: 'Ingenier??a industrial', value: 'Ingenier??a industrial' },
        { label: 'Ingenier??a agr??cola', value: 'Ingenier??a agr??cola' },
        { label: 'Ingenier??a electr??nica', value: 'Ingenier??a electr??nica' },
        { label: 'Bioinform??tica', value: 'Bioinform??tica' }


      ]
    } else if (this.facultad == 'Ingenier??a' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Tr??nsito, dise??o y seguridad vial', value: 'Tr??nsito, dise??o y seguridad vial' },
        { label: 'Automatizaci??n industrial', value: 'Automatizaci??n industrial' },
        { label: 'Iluminaci??n p??blica y privada', value: 'Iluminaci??n p??blica y privada' },
        { label: 'Estructuras', value: 'Estructuras' },
        { label: 'Ingenier??a ambiental - ??rea sanitaria', value: 'Ingenier??a ambiental - ??rea sanitaria' },
        { label: 'Transportes', value: 'Transportes' },
        { label: 'Gobierno electr??nico', value: 'Gobierno electr??nico' }
      ]
    }

    if (this.facultad == 'Medicina' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Salud p??blica', value: 'Salud p??blica' },
        { label: 'Ciencias biom??dicas', value: 'Ciencias biom??dicas' },
        { label: 'Oncolog??a', value: 'Oncolog??a' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Medicina alternativa', value: 'Medicina alternativa' },
        { label: 'Salud p??blica', value: 'Salud p??blica' },
        { label: 'Toxicolog??a', value: 'Toxicolog??a' },
        { label: 'Discapacidad e inclusi??n social', value: 'Discapacidad e inclusi??n social' },
        { label: 'Ingenier??a biom??dica', value: 'Ingenier??a biom??dica' },
        { label: 'Bioqu??mica', value: 'Bioqu??mica' },
        { label: 'Fisiolog??a', value: 'Fisiolog??a' },
        { label: 'Neurociencias', value: 'Neurociencias' },
        { label: 'Epidemiolog??a cl??nica', value: 'Epidemiolog??a cl??nica' },
        { label: 'Infecciones y salud en el tr??pico', value: 'Infecciones y salud en el tr??pico' },
        { label: 'Gen??tica humana', value: 'Gen??tica humana' },
        { label: 'Morfolog??a humana', value: 'Morfolog??a humana' },
        { label: 'Fisioterapia del deporte y la actividad f??sica', value: 'Fisioterapia del deporte y la actividad f??sica' },
        { label: 'Seguridad alimentaria y nutrici??nal', value: 'Seguridad alimentaria y nutrici??nal' },
        { label: 'Inmunolog??a', value: 'Inmunolog??a' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Alimentaci??n y nutrici??n en promoci??n de la salud', value: 'Alimentaci??n y nutrici??n en promoci??n de la salud' },
        { label: 'Administraci??n salud p??blica', value: 'Administraci??n salud p??blica' }
      ]
    } else if (this.facultad == 'Medicina' && this.nivel == 'Especialidades m??dicas') {
      this.programaArray = [
        { label: 'Ortopedia y traumatolog??a', value: 'Ortopedia y traumatolog??a' },
        { label: 'Urolog??a', value: 'Urolog??a' },
        { label: 'Oncohematolog??a pedi??trica', value: 'Oncohematolog??a pedi??trica' },
        { label: 'Medicina interna', value: 'Medicina interna' },
        { label: 'Cirug??a general', value: 'Cirug??a general' },
        { label: 'Endocrinolog??a', value: 'Endocrinolog??a' },
        { label: 'Infectolog??a', value: 'Infectolog??a' },
        { label: 'Medicina f??sica y rehabilitaci??n', value: 'Medicina f??sica y rehabilitaci??n' },
        { label: 'Anestesiolog??a y reanimaci??n', value: 'Anestesiolog??a y reanimaci??n' },
        { label: 'Obstetricia y ginecolog??a', value: 'Obstetricia y ginecolog??a' },
        { label: 'Dermatolog??a', value: 'Dermatolog??a' },
        { label: 'Medicina aeroespacial', value: 'Medicina aeroespacial' },
        { label: 'Cirug??a pl??stica', value: 'Cirug??a pl??stica' },
        { label: 'Psiquiatr??a', value: 'Psiquiatr??a' },
        { label: 'Neurocirug??a', value: 'Neurocirug??a' },
        { label: 'Neurolog??a cl??nica', value: 'Neurolog??a cl??nica' },
        { label: 'Patolog??a anat??mica y cl??nica', value: 'Patolog??a anat??mica y cl??nica' },
        { label: 'Otorrinolaringolog??a', value: 'Otorrinolaringolog??a' },
        { label: 'Pediatr??a', value: 'Pediatr??a' },
        { label: 'Geriatr??a', value: 'Geriatr??a' },
        { label: 'Cirug??a pedi??trica', value: 'Cirug??a pedi??trica' },
        { label: 'Radiolog??a e im??genes diagn??sticas', value: 'Radiolog??a e im??genes diagn??sticas' },
        { label: 'Cuidado intensivo pedi??trico', value: 'Cuidado intensivo pedi??trico' },
        { label: 'Perinatolog??a y neonatolog??a', value: 'Perinatolog??a y neonatolog??a' },
        { label: 'Oftalmolog??a', value: 'Oftalmolog??a' },
        { label: 'Medicina forense', value: 'Medicina forense' },
        { label: 'Gastroenterolog??a', value: 'Gastroenterolog??a' },
        { label: 'Hematolog??a', value: 'Hematolog??a' },
        { label: 'Reumatolog??a', value: 'Reumatolog??a' },
        { label: 'Neuropedatr??a', value: 'Neuropedatr??a' },
        { label: 'Neumolog??a cl??nica', value: 'Neumolog??a cl??nica' },
        { label: 'Neuropediatr??a', value: 'Neuropediatr??a' },
        { label: 'Radiolog??a pedi??trica', value: 'Radiolog??a pedi??trica' },
        { label: 'Medicina del deporte', value: 'Medicina del deporte' }
      ]
    }

    if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Salud animal o producci??n animal', value: 'Salud animal o producci??n animal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Salud y producci??n animal', value: 'Salud y producci??n animal' },
      ]
    } else if (this.facultad == 'Medicina veterinaria y de zootecnia' && this.nivel == 'Especialidades m??dicas') {
      this.programaArray = [
        { label: 'Anatomopatolog??a veterinaria', value: 'Anatomopatolog??a veterinaria' },
      ]
    }

    if (this.facultad == 'Odontolog??a' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Odontolog??a', value: 'Odontolog??a' },
      ]
    } else if (this.facultad == 'Odontolog??a' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Operatoria dental est??tica', value: 'Operatoria dental est??tica' },
      ]
    } else if (this.facultad == 'Odontolog??a' && this.nivel == 'Especialidades m??dicas') {
      this.programaArray = [
        { label: 'Cirug??a oral y maxilofacial', value: 'Cirug??a oral y maxilofacial' },
        { label: 'Estomatolog??a pedi??trica y ortopedia maxilar', value: 'Estomatolog??a pedi??trica y ortopedia maxilar' },
        { label: 'Rehabilitaci??n oral', value: 'Rehabilitaci??n oral' },
        { label: 'Ortodoncia', value: 'Ortodoncia' },
        { label: 'Periodoncia', value: 'Periodoncia' },
        { label: 'Endodoncia', value: 'Endodoncia' },
        { label: 'Ortodoncia y ortopedia maxilar', value: 'Ortodoncia y ortopedia maxilar' },
      ]
    }

    if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Doctorado') {
      this.programaArray = [
        { label: 'Ciencias agropecuarias', value: 'Ciencias agropecuarias' },
        { label: 'Agroecolog??a', value: 'Agroecolog??a' },
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Ciencia y tecnolog??a de alimentos', value: 'Ciencia y tecnolog??a de alimentos' },
      ]
    } else if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Maestr??a') {
      this.programaArray = [
        { label: 'Ciencia y tecnolog??a de alimentos', value: 'Ciencia y tecnolog??a de alimentos' },
        { label: 'Ciencias agrarias', value: 'Ciencias agrarias' },
        { label: 'Geom??tica', value: 'Geom??tica' },
        { label: 'Gesti??n y desarrollo rural', value: 'Gesti??n y desarrollo rural' },
      ]
    } else if (this.facultad == 'Ciencias agrarias' && this.nivel == 'Especializaci??n') {
      this.programaArray = [
        { label: 'Ciencia y tecnolog??a de alimentos', value: 'Ciencia y tecnolog??a de alimentos' },
        { label: 'Cultivos perennes industriales', value: 'Cultivos perennes industriales' },
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
      this.saveAsExcelFile(excelBuffer, 'Predicciones matriculados posgrado');
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


    this.matriculadoPosgrado.NIVEL = this.formularioMatriculadoPosgrado.value.NIVEL.value;
    this.matriculadoPosgrado.FACULTAD = this.formularioMatriculadoPosgrado.value.FACULTAD.value;
    this.matriculadoPosgrado.PROGRAMA = this.formularioMatriculadoPosgrado.value.PROGRAMA.value;


    console.log(this.matriculadoPosgrado);

    this.posgradoMatriculadoService.matriculados_posgrado_programa(this.matriculadoPosgrado).subscribe(
      responseData => {

        console.log(responseData)
        this.ListaExcel = responseData;

        responseData.forEach((element: any) => {

          // console.log(element);
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
