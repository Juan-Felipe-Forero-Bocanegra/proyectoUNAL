
from xmlrpc.client import boolean
from pycaret.regression import *
from flask import Flask, request, redirect, url_for, flash, jsonify
import pandas as pd
import pickle as p
import numpy as np
import json
import random
from pandas import DataFrame
from flask_cors import CORS, cross_origin
from random import choice
from experta import *
import json

app = Flask(__name__)
CORS(app)
model_matriculados_posgrado = load_model('modelos/modeloMatriculadosPosgradoPycaret')
model_matriculados_pregrado = load_model('modelos/modeloMatriculadosPregradoPycaret')
model_graduados_posgrado = load_model('modelos/modeloGraduadosPosgradoPycaret')
model_graduados_pregrado = load_model('modelos/modeloGraduadosPregradoPycaret')
model_docentes = load_model('modelos/modeloDocentesPycaret')
model_admin = load_model('modelos/modeloAdministrativosPycaret')


PATH_MATRICULADOS_POSGRADO = 'posgradoGB.xlsx'
PATH_MATRICULADOS_PREGRADO = 'pregradoGB.xlsx'
PATH_GRADUADOS_POSGRADO = 'graduadosPosgradoGB.xlsx'
PATH_GRADUADOS_PREGRADO = 'graduadosPregradoGB.xlsx'
PATH_DOCENTES = 'docentesGB.xlsx'
PATH_ADMIN = 'AdminGB.xlsx'

PATH_MATRICULADOS_POSGRADO_CM = 'Periodo/matriculadosPosgradoCM.xlsx'
PATH_MATRICULADOS_PREGRADO_CM = 'Periodo/matriculadosPregradoCM.xlsx'
PATH_GRADUADOS_POSGRADO_CM = 'Periodo/graduadosPosgradoCM.xlsx'
PATH_GRADUADOS_PREGRADO_CM = 'Periodo/graduadosPregradoCM.xlsx'
PATH_DOCENTES_CM = 'Periodo/docentesCM.xlsx'
PATH_ADMIN_CM = 'Periodo/adminCM.xlsx'

posgrado = pd.read_excel(PATH_MATRICULADOS_POSGRADO)
pregrado = pd.read_excel(PATH_MATRICULADOS_PREGRADO)
graduadosPosgradoGB = pd.read_excel(PATH_GRADUADOS_POSGRADO)
graduadosPregradoGB = pd.read_excel(PATH_GRADUADOS_PREGRADO)
docentesGB = pd.read_excel(PATH_DOCENTES)
adminGB = pd.read_excel(PATH_ADMIN)

matriculadosPosgradoCM = pd.read_excel(PATH_MATRICULADOS_POSGRADO_CM)
matriculadosPregradoCM = pd.read_excel(PATH_MATRICULADOS_PREGRADO_CM)
graduadosPosgradoCM = pd.read_excel(PATH_GRADUADOS_POSGRADO_CM)
graduadosPregradoCM = pd.read_excel(PATH_GRADUADOS_PREGRADO_CM)
docentesCM = pd.read_excel(PATH_DOCENTES_CM)
adminCM = pd.read_excel(PATH_ADMIN_CM)

@app.route('/api/matriculados_posgrado_programa', methods=['POST'])
@cross_origin()
def matriculadosPosgradoPrograma():
    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)

    posgradoGB = posgrado
    print('posgrado GB')
    print(posgradoGB)
    nivel = df['NIVEL'].values[0]
    print('nivel')
    print(nivel)

    posgradoNivel = posgradoGB[posgradoGB['NIVEL'] ==  nivel]
    posgradoNivelCM = matriculadosPosgradoCM[matriculadosPosgradoCM['NIVEL'] ==  nivel]
    print('posgrado nivel')
    print(posgradoNivel)
    print('posgrado nivel CM')
    print(posgradoNivelCM)

    programa = df['PROGRAMA'].values[0]
    print('programa')
    print(programa)
    posgradoNivelPrograma = posgradoNivel[posgradoNivel['PROGRAMA'] == programa ]
    posgradoNivelProgramaCM = posgradoNivelCM[posgradoNivelCM['PROGRAMA'] == programa ] 

    print('posgradoNivelPrograma')
    print(posgradoNivelPrograma)

    print('posgradoNivelPrograma con Cantidad Matriculados')
    print(posgradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = posgradoNivelProgramaCM['PERIODO']
    CM['Label'] = posgradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True

   
    posgradoPrograma2009_1 = posgradoNivelPrograma
    posgradoPrograma2009_1['PERIODO'] = '2009-1'
    prediction = predict_model(model_matriculados_posgrado, data= posgradoPrograma2009_1)
    mean2009_1 = prediction['Label'].mean()


    posgradoPrograma2009_7 = posgradoNivelPrograma
    posgradoPrograma2009_7['PERIODO'] = '2009-7'
    prediction2 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2009_7)
    mean2009_7 = prediction2['Label'].mean()
    
    posgradoPrograma2010_1 = posgradoNivelPrograma
    posgradoPrograma2010_1['PERIODO'] = '2010-1'
    prediction3 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2010_1)
    mean2010_1 = prediction3['Label'].mean()
    
    posgradoPrograma2010_7 = posgradoNivelPrograma
    posgradoPrograma2010_7['PERIODO'] = '2010-7'
    prediction3 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2010_7)
    mean2010_7 = prediction3['Label'].mean()

    posgradoPrograma2011_1 = posgradoNivelPrograma
    posgradoPrograma2011_1['PERIODO'] = '2011-1'
    prediction4 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2011_1)
    mean2011_1 = prediction4['Label'].mean()

    posgradoPrograma2011_7 = posgradoNivelPrograma
    posgradoPrograma2011_7['PERIODO'] = '2011-7'
    prediction5 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2011_7)
    mean2011_7 = prediction5['Label'].mean()

    posgradoPrograma2012_1 = posgradoNivelPrograma
    posgradoPrograma2012_1['PERIODO'] = '2012-1'
    prediction6 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2012_1)
    mean2012_1 = prediction6['Label'].mean()

    posgradoPrograma2012_7 = posgradoNivelPrograma
    posgradoPrograma2012_7['PERIODO'] = '2012-7'
    prediction7 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2012_7)
    mean2012_7 = prediction7['Label'].mean()

    posgradoPrograma2013_1 = posgradoNivelPrograma
    posgradoPrograma2013_1['PERIODO'] = '2013-1'
    prediction8 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2013_1)
    mean2013_1 = prediction8['Label'].mean()
    
    posgradoPrograma2013_7 = posgradoNivelPrograma
    posgradoPrograma2013_7['PERIODO'] = '2013-7'
    prediction = predict_model(model_matriculados_posgrado, data= posgradoPrograma2013_7)
    mean2013_7 = prediction['Label'].mean()
    
    posgradoPrograma2014_1 = posgradoNivelPrograma
    posgradoPrograma2014_1['PERIODO'] = '2014-1'
    prediction9 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2014_1)
    mean2014_1 = prediction9['Label'].mean()

    posgradoPrograma2014_7 = posgradoNivelPrograma
    posgradoPrograma2014_7['PERIODO'] = '2014-7'
    prediction10 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2014_7)
    mean2014_7 = prediction10['Label'].mean()
    
    posgradoPrograma2015_1 = posgradoNivelPrograma
    posgradoPrograma2015_1['PERIODO'] = '2015-1'
    prediction11 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2015_1)
    mean2015_1 = prediction11['Label'].mean()
 
    posgradoPrograma2015_7 = posgradoNivelPrograma
    posgradoPrograma2015_7['PERIODO'] = '2015-7'
    prediction12 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2015_7)
    mean2015_7 = prediction12['Label'].mean()

    posgradoPrograma2016_1 = posgradoNivelPrograma
    posgradoPrograma2016_1['PERIODO'] = '2016-1'
    prediction13 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2016_1)
    mean2016_1 = prediction13['Label'].mean()
    
    posgradoPrograma2016_7 = posgradoNivelPrograma
    posgradoPrograma2016_7['PERIODO'] = '2016-7'
    prediction14 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2016_7)
    mean2016_7 = prediction14['Label'].mean()
    
    posgradoPrograma2017_1 = posgradoNivelPrograma
    posgradoPrograma2017_1['PERIODO'] = '2017-1'
    prediction15 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2017_1)
    mean2017_1 = prediction15['Label'].mean()

    posgradoPrograma2017_7 = posgradoNivelPrograma
    posgradoPrograma2017_7['PERIODO'] = '2017-7'
    prediction16 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2017_7)
    mean2017_7 = prediction16['Label'].mean()

    posgradoPrograma2018_1 = posgradoNivelPrograma
    posgradoPrograma2018_1['PERIODO'] = '2018-1'
    prediction17 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2018_1)
    mean2018_1 = prediction17['Label'].mean()
    
    posgradoPrograma2018_7 = posgradoNivelPrograma
    posgradoPrograma2018_7['PERIODO'] = '2018-7'
    prediction18 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2018_7)
    mean2018_7 = prediction18['Label'].mean()

    posgradoPrograma2019_1 = posgradoNivelPrograma
    posgradoPrograma2019_1['PERIODO'] = '2019-1'
    prediction19 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2019_1)
    mean2019_1 = prediction19['Label'].mean()

    posgradoPrograma2019_7 = posgradoNivelPrograma
    posgradoPrograma2019_7['PERIODO'] = '2019-7'
    prediction20 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2019_7)
    mean2019_7 = prediction20['Label'].mean()

    posgradoPrograma2020_1 = posgradoNivelPrograma
    posgradoPrograma2020_1['PERIODO'] = '2020-1'
    prediction21 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2020_1)
    mean2020_1 = prediction21['Label'].mean()

    posgradoPrograma2020_7 = posgradoNivelPrograma
    posgradoPrograma2020_7['PERIODO'] = '2020-7'
    prediction22 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2020_7)
    mean2020_7 = prediction22['Label'].mean()
    
    posgradoPrograma2021_1 = posgradoNivelPrograma
    posgradoPrograma2021_1['PERIODO'] = '2021-1'
    prediction25 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2021_1)
    mean2021_1 = prediction25['Label'].mean()

    posgradoPrograma2021_7 = posgradoNivelPrograma
    posgradoPrograma2021_7['PERIODO'] = '2021-7'
    prediction25 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2021_7)
    mean2021_7 = prediction25['Label'].mean()

    posgradoPrograma2022_1 = posgradoNivelPrograma
    posgradoPrograma2022_1['PERIODO'] = '2022-1'
    prediction26 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2022_1)
    mean2022_1 = prediction26['Label'].mean()

    posgradoPrograma2022_7 = posgradoNivelPrograma
    posgradoPrograma2022_7['PERIODO'] = '2022-7'
    prediction26 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2022_7)
    mean2022_7 = prediction26['Label'].mean()

    posgradoPrograma2023_1 = posgradoNivelPrograma
    posgradoPrograma2023_1['PERIODO'] = '2023-1'
    prediction27 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2023_1)
    mean2023_1 = prediction27['Label'].mean()

    posgradoPrograma2023_7 = posgradoNivelPrograma
    posgradoPrograma2023_7['PERIODO'] = '2023-7'
    prediction28 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2023_7)
    mean2023_7 = prediction28['Label'].mean()

    posgradoPrograma2024_1 = posgradoNivelPrograma
    posgradoPrograma2024_1['PERIODO'] = '2024-1'
    prediction29 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2024_1)
    mean2024_1 = prediction29['Label'].mean()

    posgradoPrograma2024_7 = posgradoNivelPrograma
    posgradoPrograma2024_7['PERIODO'] = '2024-7'
    prediction30 = predict_model(model_matriculados_posgrado, data= posgradoPrograma2024_7)
    mean2024_7 = prediction30['Label'].mean()
    
    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2' ],                
        "Label":[
            mean2009_1, mean2009_7,
            mean2010_1, mean2010_7, 
            mean2011_1, mean2011_7, 
            mean2012_1, mean2012_7,
            mean2013_1, mean2013_7,

            mean2014_1, mean2014_7, 
            mean2015_1, mean2015_7, 
            mean2016_1, mean2016_7,
            mean2017_1, mean2017_7,
            mean2018_1, mean2018_7,
            mean2019_1, mean2019_7, 

            mean2020_1, mean2020_7, 
            mean2021_1, mean2021_7, 
            mean2022_1, mean2022_7,
            mean2023_1, mean2023_7,
            mean2024_1, mean2024_7],
                    "True": False
                    })
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response





@app.route('/api/matriculados_posgrado', methods=['POST'])
@cross_origin()
def matriculadosPosgrado():
    data = request.get_json() 
    print(data)
 
    nivel = data['NIVEL']
    print('nivel')
    print(nivel)

    posgradoNivelCM = matriculadosPosgradoCM[matriculadosPosgradoCM['NIVEL'] ==  nivel]
  
    print('posgrado nivel CM')
    print(posgradoNivelCM)

    programa = data['PROGRAMA']
    print('programa')
    print(programa)
  
    posgradoNivelProgramaCM = posgradoNivelCM[posgradoNivelCM['PROGRAMA'] == programa ] 

    print('posgradoNivelPrograma con Cantidad Matriculados')
    print(posgradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = posgradoNivelProgramaCM['PERIODO']
    CM['Label'] = posgradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True

    df20091 = pd.json_normalize(data)    
    df20091['PERIODO'] = '2009-1'
    prediction20091 = predict_model(model_matriculados_posgrado, data=df20091)

    df20097 = pd.json_normalize(data)    
    df20097['PERIODO'] = '2009-7'
    prediction20097 = predict_model(model_matriculados_posgrado, data=df20097)

    df20101 = pd.json_normalize(data)    
    df20101['PERIODO'] = '2010-1'
    prediction20101 = predict_model(model_matriculados_posgrado, data=df20101)

    df20107 = pd.json_normalize(data)    
    df20107['PERIODO'] = '2010-7'
    prediction20107 = predict_model(model_matriculados_posgrado, data=df20107)

    df20111 = pd.json_normalize(data)    
    df20111['PERIODO'] = '2011-1'
    prediction20111 = predict_model(model_matriculados_posgrado, data=df20111)

    df20117 = pd.json_normalize(data)    
    df20117['PERIODO'] = '2011-7'
    prediction20117 = predict_model(model_matriculados_posgrado, data=df20117)

    df20121 = pd.json_normalize(data)    
    df20121['PERIODO'] = '2012-1'
    prediction20121 = predict_model(model_matriculados_posgrado, data=df20121)

    df20127 = pd.json_normalize(data)    
    df20127['PERIODO'] = '2012-7'
    prediction20127 = predict_model(model_matriculados_posgrado, data=df20127)

    df20131 = pd.json_normalize(data)    
    df20131['PERIODO'] = '2013-1'
    prediction20131 = predict_model(model_matriculados_posgrado, data=df20131)

    df20137 = pd.json_normalize(data)    
    df20137['PERIODO'] = '2013-7'
    prediction20137 = predict_model(model_matriculados_posgrado, data=df20137)

    df20141 = pd.json_normalize(data)    
    df20141['PERIODO'] = '2014-1'
    prediction20141 = predict_model(model_matriculados_posgrado, data=df20141)

    df20147 = pd.json_normalize(data)    
    df20147['PERIODO'] = '2014-7'
    prediction20147 = predict_model(model_matriculados_posgrado, data=df20147)

    df20151 = pd.json_normalize(data)    
    df20151['PERIODO'] = '2015-1'
    prediction20151 = predict_model(model_matriculados_posgrado, data=df20151)

    df20157 = pd.json_normalize(data)    
    df20157['PERIODO'] = '2015-7'
    prediction20157 = predict_model(model_matriculados_posgrado, data=df20157)

    df20161 = pd.json_normalize(data)    
    df20161['PERIODO'] = '2016-1'
    prediction20161 = predict_model(model_matriculados_posgrado, data=df20161)

    df20167 = pd.json_normalize(data)    
    df20167['PERIODO'] = '2016-7'
    prediction20167 = predict_model(model_matriculados_posgrado, data=df20167)

    df20171 = pd.json_normalize(data)    
    df20171['PERIODO'] = '2017-1'
    prediction20171 = predict_model(model_matriculados_posgrado, data=df20171)

    df20177 = pd.json_normalize(data)    
    df20177['PERIODO'] = '2017-7'
    prediction20177 = predict_model(model_matriculados_posgrado, data=df20177)

    df20181 = pd.json_normalize(data)    
    df20181['PERIODO'] = '2018-1'
    prediction20181 = predict_model(model_matriculados_posgrado, data=df20181)

    df20187 = pd.json_normalize(data)    
    df20187['PERIODO'] = '2018-7'
    prediction20187 = predict_model(model_matriculados_posgrado, data=df20187)

    df20191 = pd.json_normalize(data)    
    df20191['PERIODO'] = '2019-1'
    prediction20191 = predict_model(model_matriculados_posgrado, data=df20191)

    df20197 = pd.json_normalize(data)    
    df20197['PERIODO'] = '2019-7'
    prediction20197 = predict_model(model_matriculados_posgrado, data=df20197)

    df20201 = pd.json_normalize(data)    
    df20201['PERIODO'] = '2020-1'
    prediction20201 = predict_model(model_matriculados_posgrado, data=df20201)

    df20207 = pd.json_normalize(data)    
    df20207['PERIODO'] = '2020-7'
    prediction20207 = predict_model(model_matriculados_posgrado, data=df20207)

    df20211 = pd.json_normalize(data)    
    df20211['PERIODO'] = '2021-1'
    prediction20211 = predict_model(model_matriculados_posgrado, data=df20211)

    df20217 = pd.json_normalize(data)    
    df20217['PERIODO'] = '2021-7'
    prediction20217 = predict_model(model_matriculados_posgrado, data=df20217)
    

    df2 = pd.json_normalize(data)    
    df2['PERIODO'] = '2022-1'
    prediction1 = predict_model(model_matriculados_posgrado, data=df2)
    

    df3 = pd.json_normalize(data)
    df3['PERIODO'] = '2022-7'
    prediction2 = predict_model(model_matriculados_posgrado, data=df3)  

    df4 = pd.json_normalize(data)
    df4['PERIODO'] = '2023-1'
    prediction3 = predict_model(model_matriculados_posgrado, data=df4)

    df5 = pd.json_normalize(data)
    df5['PERIODO'] = '2023-7'
    prediction4 = predict_model(model_matriculados_posgrado, data=df5)

    df6 = pd.json_normalize(data)
    df6['PERIODO'] = '2024-1'
    prediction5 = predict_model(model_matriculados_posgrado, data=df6)    

    df7 = pd.json_normalize(data)
    df7['PERIODO'] = '2024-7'
    prediction6 = predict_model(model_matriculados_posgrado, data=df7)  

    df8 = pd.json_normalize(data)
    df8['PERIODO'] = '2025-1'
    prediction7 = predict_model(model_matriculados_posgrado, data=df8)

    df9 = pd.json_normalize(data)
    df9['PERIODO'] = '2025-7'
    prediction8 = predict_model(model_matriculados_posgrado, data=df9)

    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2',
        '2025-1', '2025-2' ],                
        "Label":[
    prediction20091['Label'],
    prediction20097['Label'],
    prediction20101['Label'],
    prediction20107['Label'],
    prediction20111['Label'],
    prediction20117['Label'],
    prediction20121['Label'],
    prediction20127['Label'],

    prediction20131['Label'],
    prediction20137['Label'],
    prediction20141['Label'],
    prediction20147['Label'],
    prediction20151['Label'],
    prediction20157['Label'],
    prediction20161['Label'],
    prediction20167['Label'],
    prediction20171['Label'],
    prediction20177['Label'],
    prediction20181['Label'],
    prediction20187['Label'],
    prediction20191['Label'],
    prediction20197['Label'],

    prediction20201['Label'],
    prediction20207['Label'],
    prediction20211['Label'],
    prediction20217['Label'],
    prediction1['Label'], 
    prediction2['Label'], 
    prediction3['Label'], 
    prediction4['Label'], 
    prediction5['Label'], 
    prediction6['Label'], 
    prediction7['Label'], 
    prediction8['Label']],
                "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

@app.route('/api/matriculados_pregrado_programa', methods=['POST'])
@cross_origin()
def matriculadosPregradoPrograma():
    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)

    pregradoGB = pregrado
    print('pregrado GB')
    print(pregradoGB)


    programa = df['PROGRAMA'].values[0]
    print('programa')
    print(programa)
    pregradoNivelPrograma = pregradoGB[pregradoGB['PROGRAMA'] == programa ]
    pregradoNivelProgramaCM = matriculadosPregradoCM[matriculadosPregradoCM['PROGRAMA'] == programa ] 

    print('pregradoNivelPrograma')
    print(pregradoNivelPrograma)

    print('pregradoNivelPrograma con Cantidad Matriculados')
    print(pregradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = pregradoNivelProgramaCM['PERIODO']
    CM['Label'] = pregradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True


    pregradoNivelPrograma['PERIODO'] = '2009-1'
    prediction1 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2009_1 = prediction1['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2009-7'
    prediction2 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2009_7 = prediction2['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2010-1'
    prediction3 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2010_1 = prediction3['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2010-7'
    prediction00 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2010_7 = prediction00['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2011-1'
    prediction4 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2011_1 = prediction4['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2011-7'
    prediction5 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2011_7 = prediction5['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2012-1'
    prediction01 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2012_1 = prediction01['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2012-7'
    prediction6 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2012_7 = prediction6['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2013-1'
    prediction7 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2013_1 = prediction7['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2013-7'
    prediction8 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2013_7 = prediction8['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2014-1'
    prediction9 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2014_1 = prediction9['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2014-7'
    prediction10 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2014_7 = prediction10['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2015-1'
    prediction11 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2015_1 = prediction11['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2015-7'
    prediction12 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2015_7 = prediction12['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2016-1'
    prediction13 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2016_1 = prediction13['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2016-7'
    prediction14 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2016_7 = prediction14['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2017-1'
    prediction15 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2017_1 = prediction15['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2017-7'
    prediction16 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2017_7 = prediction16['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2018-1'
    prediction17 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2018_1 = prediction17['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2018-7'
    prediction18 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2018_7 = prediction18['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2019-1'
    prediction19 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2019_1 = prediction19['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2019-7'
    prediction20 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2019_7 = prediction20['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2020-1'
    prediction21 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2020_1 = prediction21['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2020-7'
    prediction22 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2020_7 = prediction22['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2021-1'
    prediction23 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2021_1 = prediction23['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2021-7'
    prediction24 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2021_7 = prediction24['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2022-1'
    prediction25 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2022_1 = prediction25['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2022-7'
    prediction26 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2022_7 = prediction26['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2023-1'
    prediction27 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2023_1 = prediction27['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2023-7'
    prediction28 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2023_7 = prediction28['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2024-1'
    prediction29 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2024_1 = prediction29['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2024-7'
    prediction30 = predict_model(model_matriculados_pregrado, data= pregradoNivelPrograma)
    mean2024_7 = prediction30['Label'].mean()

    
    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2' ],                
        "Label":[
            mean2009_1, mean2009_7,
            mean2010_1, mean2010_7, 
            mean2011_1, mean2011_7, 
            mean2012_1, mean2012_7,
            mean2013_1, mean2013_7,

            mean2014_1, mean2014_7, 
            mean2015_1, mean2015_7, 
            mean2016_1, mean2016_7,
            mean2017_1, mean2017_7,
            mean2018_1, mean2018_7,
            mean2019_1, mean2019_7, 

            mean2020_1, mean2020_7, 
            mean2021_1, mean2021_7, 
            mean2022_1, mean2022_7,
            mean2023_1, mean2023_7,
            mean2024_1, mean2024_7],
                    "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

@app.route('/api/matriculados_pregrado', methods=['POST'])
@cross_origin()
def matriculadosPregrado():
    data = request.get_json() 
    print(data)
 

    programa = data['PROGRAMA']
    print('programa')
    print(programa)
  
    pregradoProgramaCM = matriculadosPregradoCM[matriculadosPregradoCM['PROGRAMA'] == programa ] 

    print('pregradoPrograma con Cantidad Matriculados')
    print(pregradoProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = pregradoProgramaCM['PERIODO']
    CM['Label'] = pregradoProgramaCM['CantidadMatriculados']
    CM['True'] = True

    df20091 = pd.json_normalize(data)    
    df20091['PERIODO'] = '2009-1'
    prediction20091 = predict_model(model_matriculados_pregrado, data=df20091)

    df20097 = pd.json_normalize(data)    
    df20097['PERIODO'] = '2009-7'
    prediction20097 = predict_model(model_matriculados_pregrado, data=df20097)

    df20101 = pd.json_normalize(data)    
    df20101['PERIODO'] = '2010-1'
    prediction20101 = predict_model(model_matriculados_pregrado, data=df20101)

    df20107 = pd.json_normalize(data)    
    df20107['PERIODO'] = '2010-7'
    prediction20107 = predict_model(model_matriculados_pregrado, data=df20107)

    df20111 = pd.json_normalize(data)    
    df20111['PERIODO'] = '2011-1'
    prediction20111 = predict_model(model_matriculados_pregrado, data=df20111)

    df20117 = pd.json_normalize(data)    
    df20117['PERIODO'] = '2011-7'
    prediction20117 = predict_model(model_matriculados_pregrado, data=df20117)

    df20121 = pd.json_normalize(data)    
    df20121['PERIODO'] = '2012-1'
    prediction20121 = predict_model(model_matriculados_pregrado, data=df20121)

    df20127 = pd.json_normalize(data)    
    df20127['PERIODO'] = '2012-7'
    prediction20127 = predict_model(model_matriculados_pregrado, data=df20127)

    df20131 = pd.json_normalize(data)    
    df20131['PERIODO'] = '2013-1'
    prediction20131 = predict_model(model_matriculados_pregrado, data=df20131)

    df20137 = pd.json_normalize(data)    
    df20137['PERIODO'] = '2013-7'
    prediction20137 = predict_model(model_matriculados_pregrado, data=df20137)

    df20141 = pd.json_normalize(data)    
    df20141['PERIODO'] = '2014-1'
    prediction20141 = predict_model(model_matriculados_pregrado, data=df20141)

    df20147 = pd.json_normalize(data)    
    df20147['PERIODO'] = '2014-7'
    prediction20147 = predict_model(model_matriculados_pregrado, data=df20147)

    df20151 = pd.json_normalize(data)    
    df20151['PERIODO'] = '2015-1'
    prediction20151 = predict_model(model_matriculados_pregrado, data=df20151)

    df20157 = pd.json_normalize(data)    
    df20157['PERIODO'] = '2015-7'
    prediction20157 = predict_model(model_matriculados_pregrado, data=df20157)

    df20161 = pd.json_normalize(data)    
    df20161['PERIODO'] = '2016-1'
    prediction20161 = predict_model(model_matriculados_pregrado, data=df20161)

    df20167 = pd.json_normalize(data)    
    df20167['PERIODO'] = '2016-7'
    prediction20167 = predict_model(model_matriculados_pregrado, data=df20167)

    df20171 = pd.json_normalize(data)    
    df20171['PERIODO'] = '2017-1'
    prediction20171 = predict_model(model_matriculados_pregrado, data=df20171)

    df20177 = pd.json_normalize(data)    
    df20177['PERIODO'] = '2017-7'
    prediction20177 = predict_model(model_matriculados_pregrado, data=df20177)

    df20181 = pd.json_normalize(data)    
    df20181['PERIODO'] = '2018-1'
    prediction20181 = predict_model(model_matriculados_pregrado, data=df20181)

    df20187 = pd.json_normalize(data)    
    df20187['PERIODO'] = '2018-7'
    prediction20187 = predict_model(model_matriculados_pregrado, data=df20187)

    df20191 = pd.json_normalize(data)    
    df20191['PERIODO'] = '2019-1'
    prediction20191 = predict_model(model_matriculados_pregrado, data=df20191)

    df20197 = pd.json_normalize(data)    
    df20197['PERIODO'] = '2019-7'
    prediction20197 = predict_model(model_matriculados_pregrado, data=df20197)

    df20201 = pd.json_normalize(data)    
    df20201['PERIODO'] = '2020-1'
    prediction20201 = predict_model(model_matriculados_pregrado, data=df20201)

    df20207 = pd.json_normalize(data)    
    df20207['PERIODO'] = '2020-7'
    prediction20207 = predict_model(model_matriculados_pregrado, data=df20207)

    df20211 = pd.json_normalize(data)    
    df20211['PERIODO'] = '2021-1'
    prediction20211 = predict_model(model_matriculados_pregrado, data=df20211)

    df20217 = pd.json_normalize(data)    
    df20217['PERIODO'] = '2021-7'
    prediction20217 = predict_model(model_matriculados_pregrado, data=df20217)
    

    df2 = pd.json_normalize(data)    
    df2['PERIODO'] = '2022-1'
    prediction1 = predict_model(model_matriculados_pregrado, data=df2)
    

    df3 = pd.json_normalize(data)
    df3['PERIODO'] = '2022-7'
    prediction2 = predict_model(model_matriculados_pregrado, data=df3)  

    df4 = pd.json_normalize(data)
    df4['PERIODO'] = '2023-1'
    prediction3 = predict_model(model_matriculados_pregrado, data=df4)

    df5 = pd.json_normalize(data)
    df5['PERIODO'] = '2023-7'
    prediction4 = predict_model(model_matriculados_pregrado, data=df5)

    df6 = pd.json_normalize(data)
    df6['PERIODO'] = '2024-1'
    prediction5 = predict_model(model_matriculados_pregrado, data=df6)    

    df7 = pd.json_normalize(data)
    df7['PERIODO'] = '2024-7'
    prediction6 = predict_model(model_matriculados_pregrado, data=df7)  

    df8 = pd.json_normalize(data)
    df8['PERIODO'] = '2025-1'
    prediction7 = predict_model(model_matriculados_pregrado, data=df8)

    df9 = pd.json_normalize(data)
    df9['PERIODO'] = '2025-7'
    prediction8 = predict_model(model_matriculados_pregrado, data=df9)

    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2',
        '2025-1', '2025-2' ],                
        "Label":[
    prediction20091['Label'],
    prediction20097['Label'],
    prediction20101['Label'],
    prediction20107['Label'],
    prediction20111['Label'],
    prediction20117['Label'],
    prediction20121['Label'],
    prediction20127['Label'],

    prediction20131['Label'],
    prediction20137['Label'],
    prediction20141['Label'],
    prediction20147['Label'],
    prediction20151['Label'],
    prediction20157['Label'],
    prediction20161['Label'],
    prediction20167['Label'],
    prediction20171['Label'],
    prediction20177['Label'],
    prediction20181['Label'],
    prediction20187['Label'],
    prediction20191['Label'],
    prediction20197['Label'],

    prediction20201['Label'],
    prediction20207['Label'],
    prediction20211['Label'],
    prediction20217['Label'],
    prediction1['Label'], 
    prediction2['Label'], 
    prediction3['Label'], 
    prediction4['Label'], 
    prediction5['Label'], 
    prediction6['Label'], 
    prediction7['Label'], 
    prediction8['Label']],
                "True": False
                    })

  
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response  

    
@app.route('/api/graduados_posgrado_programa', methods=['POST'])
@cross_origin()
def graduadosPosgradoPrograma():
    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)

    posgradoGB = graduadosPosgradoGB
    print('posgrado GB')
    print(posgradoGB)
    nivel = df['NIVEL'].values[0]
    print('nivel')
    print(nivel)

    posgradoNivel = posgradoGB[posgradoGB['NIVEL'] ==  nivel]
    posgradoNivelCM = graduadosPosgradoCM[graduadosPosgradoCM['NIVEL'] ==  nivel]
    print('posgrado nivel')
    print(posgradoNivel)
    print('posgrado nivel CM')
    print(posgradoNivelCM)

    programa = df['PROGRAMA'].values[0]
    print('programa')
    print(programa)
    posgradoNivelPrograma = posgradoNivel[posgradoNivel['PROGRAMA'] == programa ]
    posgradoNivelProgramaCM = posgradoNivelCM[posgradoNivelCM['PROGRAMA'] == programa ] 

    print('posgradoNivelPrograma')
    print(posgradoNivelPrograma)

    print('posgradoNivelPrograma con Cantidad graduados')
    print(posgradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = posgradoNivelProgramaCM['PERIODO']
    CM['Label'] = posgradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True

   
    posgradoPrograma2009_1 = posgradoNivelPrograma
    posgradoPrograma2009_1['PERIODO'] = '2009-1'
    prediction = predict_model(model_graduados_posgrado, data= posgradoPrograma2009_1)
    mean2009_1 = prediction['Label'].mean()


    posgradoPrograma2009_7 = posgradoNivelPrograma
    posgradoPrograma2009_7['PERIODO'] = '2009-7'
    prediction2 = predict_model(model_graduados_posgrado, data= posgradoPrograma2009_7)
    mean2009_7 = prediction2['Label'].mean()
    
    posgradoPrograma2010_1 = posgradoNivelPrograma
    posgradoPrograma2010_1['PERIODO'] = '2010-1'
    prediction3 = predict_model(model_graduados_posgrado, data= posgradoPrograma2010_1)
    mean2010_1 = prediction3['Label'].mean()
    
    posgradoPrograma2010_7 = posgradoNivelPrograma
    posgradoPrograma2010_7['PERIODO'] = '2010-7'
    prediction3 = predict_model(model_graduados_posgrado, data= posgradoPrograma2010_7)
    mean2010_7 = prediction3['Label'].mean()

    posgradoPrograma2011_1 = posgradoNivelPrograma
    posgradoPrograma2011_1['PERIODO'] = '2011-1'
    prediction4 = predict_model(model_graduados_posgrado, data= posgradoPrograma2011_1)
    mean2011_1 = prediction4['Label'].mean()

    posgradoPrograma2011_7 = posgradoNivelPrograma
    posgradoPrograma2011_7['PERIODO'] = '2011-7'
    prediction5 = predict_model(model_graduados_posgrado, data= posgradoPrograma2011_7)
    mean2011_7 = prediction5['Label'].mean()

    posgradoPrograma2012_1 = posgradoNivelPrograma
    posgradoPrograma2012_1['PERIODO'] = '2012-1'
    prediction6 = predict_model(model_graduados_posgrado, data= posgradoPrograma2012_1)
    mean2012_1 = prediction6['Label'].mean()

    posgradoPrograma2012_7 = posgradoNivelPrograma
    posgradoPrograma2012_7['PERIODO'] = '2012-7'
    prediction7 = predict_model(model_graduados_posgrado, data= posgradoPrograma2012_7)
    mean2012_7 = prediction7['Label'].mean()

    posgradoPrograma2013_1 = posgradoNivelPrograma
    posgradoPrograma2013_1['PERIODO'] = '2013-1'
    prediction8 = predict_model(model_graduados_posgrado, data= posgradoPrograma2013_1)
    mean2013_1 = prediction8['Label'].mean()
    
    posgradoPrograma2013_7 = posgradoNivelPrograma
    posgradoPrograma2013_7['PERIODO'] = '2013-7'
    prediction = predict_model(model_graduados_posgrado, data= posgradoPrograma2013_7)
    mean2013_7 = prediction['Label'].mean()
    
    posgradoPrograma2014_1 = posgradoNivelPrograma
    posgradoPrograma2014_1['PERIODO'] = '2014-1'
    prediction9 = predict_model(model_graduados_posgrado, data= posgradoPrograma2014_1)
    mean2014_1 = prediction9['Label'].mean()

    posgradoPrograma2014_7 = posgradoNivelPrograma
    posgradoPrograma2014_7['PERIODO'] = '2014-7'
    prediction10 = predict_model(model_graduados_posgrado, data= posgradoPrograma2014_7)
    mean2014_7 = prediction10['Label'].mean()
    
    posgradoPrograma2015_1 = posgradoNivelPrograma
    posgradoPrograma2015_1['PERIODO'] = '2015-1'
    prediction11 = predict_model(model_graduados_posgrado, data= posgradoPrograma2015_1)
    mean2015_1 = prediction11['Label'].mean()
 
    posgradoPrograma2015_7 = posgradoNivelPrograma
    posgradoPrograma2015_7['PERIODO'] = '2015-7'
    prediction12 = predict_model(model_graduados_posgrado, data= posgradoPrograma2015_7)
    mean2015_7 = prediction12['Label'].mean()

    posgradoPrograma2016_1 = posgradoNivelPrograma
    posgradoPrograma2016_1['PERIODO'] = '2016-1'
    prediction13 = predict_model(model_graduados_posgrado, data= posgradoPrograma2016_1)
    mean2016_1 = prediction13['Label'].mean()
    
    posgradoPrograma2016_7 = posgradoNivelPrograma
    posgradoPrograma2016_7['PERIODO'] = '2016-7'
    prediction14 = predict_model(model_graduados_posgrado, data= posgradoPrograma2016_7)
    mean2016_7 = prediction14['Label'].mean()
    
    posgradoPrograma2017_1 = posgradoNivelPrograma
    posgradoPrograma2017_1['PERIODO'] = '2017-1'
    prediction15 = predict_model(model_graduados_posgrado, data= posgradoPrograma2017_1)
    mean2017_1 = prediction15['Label'].mean()

    posgradoPrograma2017_7 = posgradoNivelPrograma
    posgradoPrograma2017_7['PERIODO'] = '2017-7'
    prediction16 = predict_model(model_graduados_posgrado, data= posgradoPrograma2017_7)
    mean2017_7 = prediction16['Label'].mean()

    posgradoPrograma2018_1 = posgradoNivelPrograma
    posgradoPrograma2018_1['PERIODO'] = '2018-1'
    prediction17 = predict_model(model_graduados_posgrado, data= posgradoPrograma2018_1)
    mean2018_1 = prediction17['Label'].mean()
    
    posgradoPrograma2018_7 = posgradoNivelPrograma
    posgradoPrograma2018_7['PERIODO'] = '2018-7'
    prediction18 = predict_model(model_graduados_posgrado, data= posgradoPrograma2018_7)
    mean2018_7 = prediction18['Label'].mean()

    posgradoPrograma2019_1 = posgradoNivelPrograma
    posgradoPrograma2019_1['PERIODO'] = '2019-1'
    prediction19 = predict_model(model_graduados_posgrado, data= posgradoPrograma2019_1)
    mean2019_1 = prediction19['Label'].mean()

    posgradoPrograma2019_7 = posgradoNivelPrograma
    posgradoPrograma2019_7['PERIODO'] = '2019-7'
    prediction20 = predict_model(model_graduados_posgrado, data= posgradoPrograma2019_7)
    mean2019_7 = prediction20['Label'].mean()

    posgradoPrograma2020_1 = posgradoNivelPrograma
    posgradoPrograma2020_1['PERIODO'] = '2020-1'
    prediction21 = predict_model(model_graduados_posgrado, data= posgradoPrograma2020_1)
    mean2020_1 = prediction21['Label'].mean()

    posgradoPrograma2020_7 = posgradoNivelPrograma
    posgradoPrograma2020_7['PERIODO'] = '2020-7'
    prediction22 = predict_model(model_graduados_posgrado, data= posgradoPrograma2020_7)
    mean2020_7 = prediction22['Label'].mean()
    
    posgradoPrograma2021_1 = posgradoNivelPrograma
    posgradoPrograma2021_1['PERIODO'] = '2021-1'
    prediction25 = predict_model(model_graduados_posgrado, data= posgradoPrograma2021_1)
    mean2021_1 = prediction25['Label'].mean()

    posgradoPrograma2021_7 = posgradoNivelPrograma
    posgradoPrograma2021_7['PERIODO'] = '2021-7'
    prediction25 = predict_model(model_graduados_posgrado, data= posgradoPrograma2021_7)
    mean2021_7 = prediction25['Label'].mean()

    posgradoPrograma2022_1 = posgradoNivelPrograma
    posgradoPrograma2022_1['PERIODO'] = '2022-1'
    prediction26 = predict_model(model_graduados_posgrado, data= posgradoPrograma2022_1)
    mean2022_1 = prediction26['Label'].mean()

    posgradoPrograma2022_7 = posgradoNivelPrograma
    posgradoPrograma2022_7['PERIODO'] = '2022-7'
    prediction26 = predict_model(model_graduados_posgrado, data= posgradoPrograma2022_7)
    mean2022_7 = prediction26['Label'].mean()

    posgradoPrograma2023_1 = posgradoNivelPrograma
    posgradoPrograma2023_1['PERIODO'] = '2023-1'
    prediction27 = predict_model(model_graduados_posgrado, data= posgradoPrograma2023_1)
    mean2023_1 = prediction27['Label'].mean()

    posgradoPrograma2023_7 = posgradoNivelPrograma
    posgradoPrograma2023_7['PERIODO'] = '2023-7'
    prediction28 = predict_model(model_graduados_posgrado, data= posgradoPrograma2023_7)
    mean2023_7 = prediction28['Label'].mean()

    posgradoPrograma2024_1 = posgradoNivelPrograma
    posgradoPrograma2024_1['PERIODO'] = '2024-1'
    prediction29 = predict_model(model_graduados_posgrado, data= posgradoPrograma2024_1)
    mean2024_1 = prediction29['Label'].mean()

    posgradoPrograma2024_7 = posgradoNivelPrograma
    posgradoPrograma2024_7['PERIODO'] = '2024-7'
    prediction30 = predict_model(model_graduados_posgrado, data= posgradoPrograma2024_7)
    mean2024_7 = prediction30['Label'].mean()
    
    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2' ],                
        "Label":[
            mean2009_1, mean2009_7,
            mean2010_1, mean2010_7, 
            mean2011_1, mean2011_7, 
            mean2012_1, mean2012_7,
            mean2013_1, mean2013_7,

            mean2014_1, mean2014_7, 
            mean2015_1, mean2015_7, 
            mean2016_1, mean2016_7,
            mean2017_1, mean2017_7,
            mean2018_1, mean2018_7,
            mean2019_1, mean2019_7, 

            mean2020_1, mean2020_7, 
            mean2021_1, mean2021_7, 
            mean2022_1, mean2022_7,
            mean2023_1, mean2023_7,
            mean2024_1, mean2024_7],
                    "True": False
                    })
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response
  
@app.route('/api/graduados_posgrado', methods=['POST'])
@cross_origin()
def graduadosPosgrado():
    data = request.get_json() 
    print(data)
 
    nivel = data['NIVEL']
    print('nivel')
    print(nivel)

    posgradoNivelCM = graduadosPosgradoCM[graduadosPosgradoCM['NIVEL'] ==  nivel]
  
    print('posgrado nivel CM')
    print(posgradoNivelCM)

    programa = data['PROGRAMA']
    print('programa')
    print(programa)
  
    posgradoNivelProgramaCM = posgradoNivelCM[posgradoNivelCM['PROGRAMA'] == programa ] 

    print('posgradoNivelPrograma con Cantidad Matriculados')
    print(posgradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = posgradoNivelProgramaCM['PERIODO']
    CM['Label'] = posgradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True

    df20091 = pd.json_normalize(data)    
    df20091['PERIODO'] = '2009-1'
    prediction20091 = predict_model(model_graduados_posgrado, data=df20091)

    df20097 = pd.json_normalize(data)    
    df20097['PERIODO'] = '2009-7'
    prediction20097 = predict_model(model_graduados_posgrado, data=df20097)

    df20101 = pd.json_normalize(data)    
    df20101['PERIODO'] = '2010-1'
    prediction20101 = predict_model(model_graduados_posgrado, data=df20101)

    df20107 = pd.json_normalize(data)    
    df20107['PERIODO'] = '2010-7'
    prediction20107 = predict_model(model_graduados_posgrado, data=df20107)

    df20111 = pd.json_normalize(data)    
    df20111['PERIODO'] = '2011-1'
    prediction20111 = predict_model(model_graduados_posgrado, data=df20111)

    df20117 = pd.json_normalize(data)    
    df20117['PERIODO'] = '2011-7'
    prediction20117 = predict_model(model_graduados_posgrado, data=df20117)

    df20121 = pd.json_normalize(data)    
    df20121['PERIODO'] = '2012-1'
    prediction20121 = predict_model(model_graduados_posgrado, data=df20121)

    df20127 = pd.json_normalize(data)    
    df20127['PERIODO'] = '2012-7'
    prediction20127 = predict_model(model_graduados_posgrado, data=df20127)

    df20131 = pd.json_normalize(data)    
    df20131['PERIODO'] = '2013-1'
    prediction20131 = predict_model(model_graduados_posgrado, data=df20131)

    df20137 = pd.json_normalize(data)    
    df20137['PERIODO'] = '2013-7'
    prediction20137 = predict_model(model_graduados_posgrado, data=df20137)

    df20141 = pd.json_normalize(data)    
    df20141['PERIODO'] = '2014-1'
    prediction20141 = predict_model(model_graduados_posgrado, data=df20141)

    df20147 = pd.json_normalize(data)    
    df20147['PERIODO'] = '2014-7'
    prediction20147 = predict_model(model_graduados_posgrado, data=df20147)

    df20151 = pd.json_normalize(data)    
    df20151['PERIODO'] = '2015-1'
    prediction20151 = predict_model(model_graduados_posgrado, data=df20151)

    df20157 = pd.json_normalize(data)    
    df20157['PERIODO'] = '2015-7'
    prediction20157 = predict_model(model_graduados_posgrado, data=df20157)

    df20161 = pd.json_normalize(data)    
    df20161['PERIODO'] = '2016-1'
    prediction20161 = predict_model(model_graduados_posgrado, data=df20161)

    df20167 = pd.json_normalize(data)    
    df20167['PERIODO'] = '2016-7'
    prediction20167 = predict_model(model_graduados_posgrado, data=df20167)

    df20171 = pd.json_normalize(data)    
    df20171['PERIODO'] = '2017-1'
    prediction20171 = predict_model(model_graduados_posgrado, data=df20171)

    df20177 = pd.json_normalize(data)    
    df20177['PERIODO'] = '2017-7'
    prediction20177 = predict_model(model_graduados_posgrado, data=df20177)

    df20181 = pd.json_normalize(data)    
    df20181['PERIODO'] = '2018-1'
    prediction20181 = predict_model(model_graduados_posgrado, data=df20181)

    df20187 = pd.json_normalize(data)    
    df20187['PERIODO'] = '2018-7'
    prediction20187 = predict_model(model_graduados_posgrado, data=df20187)

    df20191 = pd.json_normalize(data)    
    df20191['PERIODO'] = '2019-1'
    prediction20191 = predict_model(model_graduados_posgrado, data=df20191)

    df20197 = pd.json_normalize(data)    
    df20197['PERIODO'] = '2019-7'
    prediction20197 = predict_model(model_graduados_posgrado, data=df20197)

    df20201 = pd.json_normalize(data)    
    df20201['PERIODO'] = '2020-1'
    prediction20201 = predict_model(model_graduados_posgrado, data=df20201)

    df20207 = pd.json_normalize(data)    
    df20207['PERIODO'] = '2020-7'
    prediction20207 = predict_model(model_graduados_posgrado, data=df20207)

    df20211 = pd.json_normalize(data)    
    df20211['PERIODO'] = '2021-1'
    prediction20211 = predict_model(model_graduados_posgrado, data=df20211)

    df20217 = pd.json_normalize(data)    
    df20217['PERIODO'] = '2021-7'
    prediction20217 = predict_model(model_graduados_posgrado, data=df20217)
    

    df2 = pd.json_normalize(data)    
    df2['PERIODO'] = '2022-1'
    prediction1 = predict_model(model_graduados_posgrado, data=df2)
    

    df3 = pd.json_normalize(data)
    df3['PERIODO'] = '2022-7'
    prediction2 = predict_model(model_graduados_posgrado, data=df3)  

    df4 = pd.json_normalize(data)
    df4['PERIODO'] = '2023-1'
    prediction3 = predict_model(model_graduados_posgrado, data=df4)

    df5 = pd.json_normalize(data)
    df5['PERIODO'] = '2023-7'
    prediction4 = predict_model(model_graduados_posgrado, data=df5)

    df6 = pd.json_normalize(data)
    df6['PERIODO'] = '2024-1'
    prediction5 = predict_model(model_graduados_posgrado, data=df6)    

    df7 = pd.json_normalize(data)
    df7['PERIODO'] = '2024-7'
    prediction6 = predict_model(model_graduados_posgrado, data=df7)  

    df8 = pd.json_normalize(data)
    df8['PERIODO'] = '2025-1'
    prediction7 = predict_model(model_graduados_posgrado, data=df8)

    df9 = pd.json_normalize(data)
    df9['PERIODO'] = '2025-7'
    prediction8 = predict_model(model_graduados_posgrado, data=df9)

    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2',
        '2025-1', '2025-2' ],                
        "Label":[
    prediction20091['Label'],
    prediction20097['Label'],
    prediction20101['Label'],
    prediction20107['Label'],
    prediction20111['Label'],
    prediction20117['Label'],
    prediction20121['Label'],
    prediction20127['Label'],

    prediction20131['Label'],
    prediction20137['Label'],
    prediction20141['Label'],
    prediction20147['Label'],
    prediction20151['Label'],
    prediction20157['Label'],
    prediction20161['Label'],
    prediction20167['Label'],
    prediction20171['Label'],
    prediction20177['Label'],
    prediction20181['Label'],
    prediction20187['Label'],
    prediction20191['Label'],
    prediction20197['Label'],

    prediction20201['Label'],
    prediction20207['Label'],
    prediction20211['Label'],
    prediction20217['Label'],
    prediction1['Label'], 
    prediction2['Label'], 
    prediction3['Label'], 
    prediction4['Label'], 
    prediction5['Label'], 
    prediction6['Label'], 
    prediction7['Label'], 
    prediction8['Label']],
                "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

@app.route('/api/graduados_pregrado', methods=['POST'])
@cross_origin()
def graduadosPregrado():
    
    data = request.get_json() 
    print(data)
 
    programa = data['PROGRAMA']
    print('programa')
    print(programa)
  
    pregradoProgramaCM = graduadosPregradoCM[graduadosPregradoCM['PROGRAMA'] == programa ] 

    print('pregradoPrograma con Cantidad Matriculados')
    print(pregradoProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = pregradoProgramaCM['PERIODO']
    CM['Label'] = pregradoProgramaCM['CantidadMatriculados']
    CM['True'] = True

    df20091 = pd.json_normalize(data)    
    df20091['PERIODO'] = '2009-1'
    prediction20091 = predict_model(model_graduados_pregrado, data=df20091)

    df20097 = pd.json_normalize(data)    
    df20097['PERIODO'] = '2009-7'
    prediction20097 = predict_model(model_graduados_pregrado, data=df20097)

    df20101 = pd.json_normalize(data)    
    df20101['PERIODO'] = '2010-1'
    prediction20101 = predict_model(model_graduados_pregrado, data=df20101)

    df20107 = pd.json_normalize(data)    
    df20107['PERIODO'] = '2010-7'
    prediction20107 = predict_model(model_graduados_pregrado, data=df20107)

    df20111 = pd.json_normalize(data)    
    df20111['PERIODO'] = '2011-1'
    prediction20111 = predict_model(model_graduados_pregrado, data=df20111)

    df20117 = pd.json_normalize(data)    
    df20117['PERIODO'] = '2011-7'
    prediction20117 = predict_model(model_graduados_pregrado, data=df20117)

    df20121 = pd.json_normalize(data)    
    df20121['PERIODO'] = '2012-1'
    prediction20121 = predict_model(model_graduados_pregrado, data=df20121)

    df20127 = pd.json_normalize(data)    
    df20127['PERIODO'] = '2012-7'
    prediction20127 = predict_model(model_graduados_pregrado, data=df20127)

    df20131 = pd.json_normalize(data)    
    df20131['PERIODO'] = '2013-1'
    prediction20131 = predict_model(model_graduados_pregrado, data=df20131)

    df20137 = pd.json_normalize(data)    
    df20137['PERIODO'] = '2013-7'
    prediction20137 = predict_model(model_graduados_pregrado, data=df20137)

    df20141 = pd.json_normalize(data)    
    df20141['PERIODO'] = '2014-1'
    prediction20141 = predict_model(model_graduados_pregrado, data=df20141)

    df20147 = pd.json_normalize(data)    
    df20147['PERIODO'] = '2014-7'
    prediction20147 = predict_model(model_graduados_pregrado, data=df20147)

    df20151 = pd.json_normalize(data)    
    df20151['PERIODO'] = '2015-1'
    prediction20151 = predict_model(model_graduados_pregrado, data=df20151)

    df20157 = pd.json_normalize(data)    
    df20157['PERIODO'] = '2015-7'
    prediction20157 = predict_model(model_graduados_pregrado, data=df20157)

    df20161 = pd.json_normalize(data)    
    df20161['PERIODO'] = '2016-1'
    prediction20161 = predict_model(model_graduados_pregrado, data=df20161)

    df20167 = pd.json_normalize(data)    
    df20167['PERIODO'] = '2016-7'
    prediction20167 = predict_model(model_graduados_pregrado, data=df20167)

    df20171 = pd.json_normalize(data)    
    df20171['PERIODO'] = '2017-1'
    prediction20171 = predict_model(model_graduados_pregrado, data=df20171)

    df20177 = pd.json_normalize(data)    
    df20177['PERIODO'] = '2017-7'
    prediction20177 = predict_model(model_graduados_pregrado, data=df20177)

    df20181 = pd.json_normalize(data)    
    df20181['PERIODO'] = '2018-1'
    prediction20181 = predict_model(model_graduados_pregrado, data=df20181)

    df20187 = pd.json_normalize(data)    
    df20187['PERIODO'] = '2018-7'
    prediction20187 = predict_model(model_graduados_pregrado, data=df20187)

    df20191 = pd.json_normalize(data)    
    df20191['PERIODO'] = '2019-1'
    prediction20191 = predict_model(model_graduados_pregrado, data=df20191)

    df20197 = pd.json_normalize(data)    
    df20197['PERIODO'] = '2019-7'
    prediction20197 = predict_model(model_graduados_pregrado, data=df20197)

    df20201 = pd.json_normalize(data)    
    df20201['PERIODO'] = '2020-1'
    prediction20201 = predict_model(model_graduados_pregrado, data=df20201)

    df20207 = pd.json_normalize(data)    
    df20207['PERIODO'] = '2020-7'
    prediction20207 = predict_model(model_graduados_pregrado, data=df20207)

    df20211 = pd.json_normalize(data)    
    df20211['PERIODO'] = '2021-1'
    prediction20211 = predict_model(model_graduados_pregrado, data=df20211)

    df20217 = pd.json_normalize(data)    
    df20217['PERIODO'] = '2021-7'
    prediction20217 = predict_model(model_graduados_pregrado, data=df20217)
    

    df2 = pd.json_normalize(data)    
    df2['PERIODO'] = '2022-1'
    prediction1 = predict_model(model_graduados_pregrado, data=df2)
    

    df3 = pd.json_normalize(data)
    df3['PERIODO'] = '2022-7'
    prediction2 = predict_model(model_graduados_pregrado, data=df3)  

    df4 = pd.json_normalize(data)
    df4['PERIODO'] = '2023-1'
    prediction3 = predict_model(model_graduados_pregrado, data=df4)

    df5 = pd.json_normalize(data)
    df5['PERIODO'] = '2023-7'
    prediction4 = predict_model(model_graduados_pregrado, data=df5)

    df6 = pd.json_normalize(data)
    df6['PERIODO'] = '2024-1'
    prediction5 = predict_model(model_graduados_pregrado, data=df6)    

    df7 = pd.json_normalize(data)
    df7['PERIODO'] = '2024-7'
    prediction6 = predict_model(model_graduados_pregrado, data=df7)  

    df8 = pd.json_normalize(data)
    df8['PERIODO'] = '2025-1'
    prediction7 = predict_model(model_graduados_pregrado, data=df8)

    df9 = pd.json_normalize(data)
    df9['PERIODO'] = '2025-7'
    prediction8 = predict_model(model_graduados_pregrado, data=df9)

    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2',
        '2025-1', '2025-2' ],                
        "Label":[
    prediction20091['Label'],
    prediction20097['Label'],
    prediction20101['Label'],
    prediction20107['Label'],
    prediction20111['Label'],
    prediction20117['Label'],
    prediction20121['Label'],
    prediction20127['Label'],

    prediction20131['Label'],
    prediction20137['Label'],
    prediction20141['Label'],
    prediction20147['Label'],
    prediction20151['Label'],
    prediction20157['Label'],
    prediction20161['Label'],
    prediction20167['Label'],
    prediction20171['Label'],
    prediction20177['Label'],
    prediction20181['Label'],
    prediction20187['Label'],
    prediction20191['Label'],
    prediction20197['Label'],

    prediction20201['Label'],
    prediction20207['Label'],
    prediction20211['Label'],
    prediction20217['Label'],
    prediction1['Label'], 
    prediction2['Label'], 
    prediction3['Label'], 
    prediction4['Label'], 
    prediction5['Label'], 
    prediction6['Label'], 
    prediction7['Label'], 
    prediction8['Label']],
                "True": False
                    })

  
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response 


@app.route('/api/graduados_pregrado_programa', methods=['POST'])
@cross_origin()
def graduadosPregradoPrograma():

    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)

    pregradoGB = graduadosPregradoGB
    print('pregrado GB')
    print(pregradoGB)


    programa = df['PROGRAMA'].values[0]
    print('programa')
    print(programa)
    pregradoNivelPrograma = pregradoGB[pregradoGB['PROGRAMA'] == programa ]
    pregradoNivelProgramaCM = graduadosPregradoCM[graduadosPregradoCM['PROGRAMA'] == programa ] 

    print('pregradoNivelPrograma')
    print(pregradoNivelPrograma)

    print('pregradoNivelPrograma con Cantidad Matriculados')
    print(pregradoNivelProgramaCM)

    CM = pd.DataFrame({"PERIODO": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['PERIODO'] = pregradoNivelProgramaCM['PERIODO']
    CM['Label'] = pregradoNivelProgramaCM['CantidadMatriculados']
    CM['True'] = True


    pregradoNivelPrograma['PERIODO'] = '2009-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2009_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2009-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2009_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2010-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2010_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2010-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2010_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2011-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2011_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2011-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2011_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2012-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2012_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2012-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2012_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2013-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2013_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2013-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2013_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2014-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2014_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2014-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2014_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2015-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2015_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2015-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2015_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2016-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2016_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2016-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2016_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2017-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2017_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2017-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2017_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2018-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2018_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2018-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2018_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2019-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2019_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2019-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2019_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2020-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2020_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2020-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2020_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2021-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2021_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2021-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2021_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2022-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2022_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2022-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2022_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2023-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2023_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2023-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2023_7 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2024-1'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2024_1 = prediction['Label'].mean()

    pregradoNivelPrograma['PERIODO'] = '2024-7'
    prediction = predict_model(model_graduados_pregrado, data= pregradoNivelPrograma)
    mean2024_7 = prediction['Label'].mean()

    
    predictionDataframe = pd.DataFrame({"PERIODO": [
        '2009-1', '2009-2',
        '2010-1', '2010-2',
        '2011-1', '2011-2',
        '2012-1', '2012-2',
        '2013-1', '2013-2',
        '2014-1', '2014-2',
        '2015-1', '2015-2',
        '2016-1', '2016-2',
        '2017-1', '2017-2',
        '2018-1', '2018-2',
        '2019-1', '2019-2',   
        '2020-1', '2020-2', 
        '2021-1', '2021-2', 
        '2022-1', '2022-2', 
        '2023-1', '2023-2', 
        '2024-1', '2024-2' ],                
        "Label":[
            mean2009_1, mean2009_7,
            mean2010_1, mean2010_7, 
            mean2011_1, mean2011_7, 
            mean2012_1, mean2012_7,
            mean2013_1, mean2013_7,

            mean2014_1, mean2014_7, 
            mean2015_1, mean2015_7, 
            mean2016_1, mean2016_7,
            mean2017_1, mean2017_7,
            mean2018_1, mean2018_7,
            mean2019_1, mean2019_7, 

            mean2020_1, mean2020_7, 
            mean2021_1, mean2021_7, 
            mean2022_1, mean2022_7,
            mean2023_1, mean2023_7,
            mean2024_1, mean2024_7],
                    "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

@app.route('/api/docentes', methods=['POST'])
@cross_origin()
def docentes():
    data = request.get_json() 
    print(data)

    unidad = data['UNIDAD']
    print('unidad')
    print(unidad)
  
    docentesUnidadCM = docentesCM[docentesCM['UNIDAD'] == unidad ] 

    print('docentesUnidad con Cantidad docentes')
    print(docentesUnidadCM)

    CM = pd.DataFrame({"YEAR": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['YEAR'] = docentesUnidadCM['YEAR']
    CM['Label'] = docentesUnidadCM['CantidadDocentes']
    CM['True'] = True

    df20081 = pd.json_normalize(data)    
    df20081['YEAR'] = 2008
    prediction20081 = predict_model(model_docentes, data=df20081)

    df20091 = pd.json_normalize(data)    
    df20091['YEAR'] = 2009
    prediction20091 = predict_model(model_docentes, data=df20091)

    df20101 = pd.json_normalize(data)    
    df20101['YEAR'] = 2010
    prediction20101 = predict_model(model_docentes, data=df20101)

    df20111 = pd.json_normalize(data)    
    df20111['YEAR'] = 2011
    prediction20111 = predict_model(model_docentes, data=df20111)

    df20121 = pd.json_normalize(data)    
    df20121['YEAR'] = 2012
    prediction20121 = predict_model(model_docentes, data=df20121)

    df20131 = pd.json_normalize(data)    
    df20131['YEAR'] = 2013
    prediction20131 = predict_model(model_docentes, data=df20131)

    df20141 = pd.json_normalize(data)    
    df20141['YEAR'] = 2014
    prediction20141 = predict_model(model_docentes, data=df20141)

    df20151 = pd.json_normalize(data)    
    df20151['YEAR'] = 2015
    prediction20151 = predict_model(model_docentes, data=df20151)

    df20161 = pd.json_normalize(data)    
    df20161['YEAR'] = 2016
    prediction20161 = predict_model(model_docentes, data=df20161)

    df20171 = pd.json_normalize(data)    
    df20171['YEAR'] = 2017
    prediction20171 = predict_model(model_docentes, data=df20171)

    df20181 = pd.json_normalize(data)    
    df20181['YEAR'] = 2018
    prediction20181 = predict_model(model_docentes, data=df20181)

    df20191 = pd.json_normalize(data)    
    df20191['YEAR'] = 2019
    prediction20191 = predict_model(model_docentes, data=df20191)

    df20201 = pd.json_normalize(data)    
    df20201['YEAR'] = 2020
    prediction20201 = predict_model(model_docentes, data=df20201)


    df20211 = pd.json_normalize(data)    
    df20211['YEAR'] = 2021
    prediction20211 = predict_model(model_docentes, data=df20211)
    

    df2 = pd.json_normalize(data)    
    df2['YEAR'] = 2022
    prediction1 = predict_model(model_docentes, data=df2)
    

    df4 = pd.json_normalize(data)
    df4['YEAR'] = 2023
    prediction3 = predict_model(model_docentes, data=df4)

    df6 = pd.json_normalize(data)
    df6['YEAR'] = 2024
    prediction5 = predict_model(model_docentes, data=df6)    

    df8 = pd.json_normalize(data)
    df8['YEAR'] = 2025
    prediction7 = predict_model(model_docentes, data=df8)


    predictionDataframe = pd.DataFrame({"YEAR": [
        '2008',
        '2009', 
        '2010', 
        '2011', 
        '2012', 
        '2013', 
        '2014', 
        '2015', 
        '2016', 
        '2017', 
        '2018', 
        '2019',    
        '2020', 
        '2021',  
        '2022',  
        '2023',  
        '2024', 
        '2025',  ],                
        "Label":[
    prediction20081['Label'],
    prediction20091['Label'],  
    prediction20101['Label'],   
    prediction20111['Label'],  
    prediction20121['Label'],
    prediction20131['Label'],
    prediction20141['Label'],   
    prediction20151['Label'],
    prediction20161['Label'],   
    prediction20171['Label'],   
    prediction20181['Label'],   
    prediction20191['Label'],
    prediction20201['Label'], 
    prediction20211['Label'],  
    prediction1['Label'],     
    prediction3['Label'], 
    prediction5['Label'],  
    prediction7['Label'], 
    ], "True": False
                    })

  
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response  

@app.route('/api/docentes_unidad', methods=['POST'])
@cross_origin()
def docentesUnidad():

    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)


    Unidad = df['UNIDAD'].values[0]
    print('Unidad')
    print(Unidad)
    docentesUnidad = docentesGB[docentesGB['UNIDAD'] == Unidad ]
    docentesUnidadCM = docentesCM[docentesCM['UNIDAD'] == Unidad ] 

    print('docentesUnidad')
    print(docentesUnidad)

    print('docentesUnidad con Cantidad Docentes')
    print(docentesUnidadCM)

    CM = pd.DataFrame({"YEAR": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['YEAR'] = docentesUnidadCM['YEAR']
    CM['Label'] = docentesUnidadCM['CantidadDocentes']
    CM['True'] = True

    docentesUnidad['YEAR'] = 2008
    prediction001 = predict_model(model_docentes, data= docentesUnidad)
    mean2008_1 = prediction001['Label'].mean()

    docentesUnidad['YEAR'] = 2009
    prediction1 = predict_model(model_docentes, data= docentesUnidad)
    mean2009_1 = prediction1['Label'].mean()


    docentesUnidad['YEAR'] = 2010
    prediction3 = predict_model(model_docentes, data= docentesUnidad)
    mean2010_1 = prediction3['Label'].mean()


    docentesUnidad['YEAR'] = 2011
    prediction4 = predict_model(model_docentes, data= docentesUnidad)
    mean2011_1 = prediction4['Label'].mean()


    docentesUnidad['YEAR'] = 2012
    prediction01 = predict_model(model_docentes, data= docentesUnidad)
    mean2012_1 = prediction01['Label'].mean()

    docentesUnidad['YEAR'] = 2013
    prediction7 = predict_model(model_docentes, data= docentesUnidad)
    mean2013_1 = prediction7['Label'].mean()

    docentesUnidad['YEAR'] = 2014
    prediction9 = predict_model(model_docentes, data= docentesUnidad)
    mean2014_1 = prediction9['Label'].mean()

    docentesUnidad['YEAR'] = 2015
    prediction11 = predict_model(model_docentes, data= docentesUnidad)
    mean2015_1 = prediction11['Label'].mean()

    docentesUnidad['YEAR'] = 2016
    prediction13 = predict_model(model_docentes, data= docentesUnidad)
    mean2016_1 = prediction13['Label'].mean()

    docentesUnidad['YEAR'] = 2017
    prediction15 = predict_model(model_docentes, data= docentesUnidad)
    mean2017_1 = prediction15['Label'].mean()

    docentesUnidad['YEAR'] = 2018
    prediction17 = predict_model(model_docentes, data= docentesUnidad)
    mean2018_1 = prediction17['Label'].mean()

    docentesUnidad['YEAR'] = 2019
    prediction19 = predict_model(model_docentes, data= docentesUnidad)
    mean2019_1 = prediction19['Label'].mean()

    docentesUnidad['YEAR'] = 2020
    prediction21 = predict_model(model_docentes, data= docentesUnidad)
    mean2020_1 = prediction21['Label'].mean()

    docentesUnidad['YEAR'] = 2021
    prediction23 = predict_model(model_docentes, data= docentesUnidad)
    mean2021_1 = prediction23['Label'].mean()

    docentesUnidad['YEAR'] = 2022
    prediction25 = predict_model(model_docentes, data= docentesUnidad)
    mean2022_1 = prediction25['Label'].mean()

    docentesUnidad['YEAR'] = 2023
    prediction27 = predict_model(model_docentes, data= docentesUnidad)
    mean2023_1 = prediction27['Label'].mean()

    docentesUnidad['YEAR'] = 2024
    prediction29 = predict_model(model_docentes, data= docentesUnidad)
    mean2024_1 = prediction29['Label'].mean()

    docentesUnidad['YEAR'] = 2025
    prediction30 = predict_model(model_docentes, data= docentesUnidad)
    mean2025_1 = prediction30['Label'].mean()


    
    predictionDataframe = pd.DataFrame({"YEAR": [
        '2008',
        '2009', 
        '2010', 
        '2011', 
        '2012', 
        '2013', 
        '2014', 
        '2015', 
        '2016', 
        '2017', 
        '2018', 
        '2019',    
        '2020',  
        '2021',  
        '2022',  
        '2023',  
        '2024',
        '2025',  ],                
        "Label":[
            mean2008_1,
            mean2009_1,
            mean2010_1,
            mean2011_1, 
            mean2012_1, 
            mean2013_1, 

            mean2014_1, 
            mean2015_1,  
            mean2016_1, 
            mean2017_1, 
            mean2018_1, 
            mean2019_1,  

            mean2020_1, 
            mean2021_1,  
            mean2022_1, 
            mean2023_1, 
            mean2024_1,
            mean2025_1 ],
                    "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

@app.route('/api/admin', methods=['POST'])
@cross_origin()
def administrativos():
    
    data = request.get_json() 
    print(data)

    nivel = data['NIVEL']
    print('nivel')
    print(nivel)
  
    adminnivelCM = adminCM[adminCM['NIVEL'] == nivel ] 

    print('adminnivel con CantidadAdmin')
    print(adminnivelCM)

    CM = pd.DataFrame({"YEAR": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['YEAR'] = adminnivelCM['YEAR']
    CM['Label'] = adminnivelCM['CantidadAdmin']
    CM['True'] = True

    df20081 = pd.json_normalize(data)    
    df20081['YEAR'] = 2008
    prediction20081 = predict_model(model_admin, data=df20081)

    df20091 = pd.json_normalize(data)    
    df20091['YEAR'] = 2009
    prediction20091 = predict_model(model_admin, data=df20091)

    df20101 = pd.json_normalize(data)    
    df20101['YEAR'] = 2010
    prediction20101 = predict_model(model_admin, data=df20101)

    df20111 = pd.json_normalize(data)    
    df20111['YEAR'] = 2011
    prediction20111 = predict_model(model_admin, data=df20111)

    df20121 = pd.json_normalize(data)    
    df20121['YEAR'] = 2012
    prediction20121 = predict_model(model_admin, data=df20121)

    df20131 = pd.json_normalize(data)    
    df20131['YEAR'] = 2013
    prediction20131 = predict_model(model_admin, data=df20131)

    df20141 = pd.json_normalize(data)    
    df20141['YEAR'] = 2014
    prediction20141 = predict_model(model_admin, data=df20141)

    df20151 = pd.json_normalize(data)    
    df20151['YEAR'] = 2015
    prediction20151 = predict_model(model_admin, data=df20151)

    df20161 = pd.json_normalize(data)    
    df20161['YEAR'] = 2016
    prediction20161 = predict_model(model_admin, data=df20161)

    df20171 = pd.json_normalize(data)    
    df20171['YEAR'] = 2017
    prediction20171 = predict_model(model_admin, data=df20171)

    df20181 = pd.json_normalize(data)    
    df20181['YEAR'] = 2018
    prediction20181 = predict_model(model_admin, data=df20181)

    df20191 = pd.json_normalize(data)    
    df20191['YEAR'] = 2019
    prediction20191 = predict_model(model_admin, data=df20191)

    df20201 = pd.json_normalize(data)    
    df20201['YEAR'] = 2020
    prediction20201 = predict_model(model_admin, data=df20201)


    df20211 = pd.json_normalize(data)    
    df20211['YEAR'] = 2021
    prediction20211 = predict_model(model_admin, data=df20211)
    

    df2 = pd.json_normalize(data)    
    df2['YEAR'] = 2022
    prediction1 = predict_model(model_admin, data=df2)
    

    df4 = pd.json_normalize(data)
    df4['YEAR'] = 2023
    prediction3 = predict_model(model_admin, data=df4)

    df6 = pd.json_normalize(data)
    df6['YEAR'] = 2024
    prediction5 = predict_model(model_admin, data=df6)    

    df8 = pd.json_normalize(data)
    df8['YEAR'] = 2025
    prediction7 = predict_model(model_admin, data=df8)


    predictionDataframe = pd.DataFrame({"YEAR": [
        '2008',
        '2009', 
        '2010', 
        '2011', 
        '2012', 
        '2013', 
        '2014', 
        '2015', 
        '2016', 
        '2017', 
        '2018', 
        '2019',    
        '2020', 
        '2021',  
        '2022',  
        '2023',  
        '2024', 
        '2025',  ],                
        "Label":[
    prediction20081['Label'],
    prediction20091['Label'],  
    prediction20101['Label'],   
    prediction20111['Label'],  
    prediction20121['Label'],
    prediction20131['Label'],
    prediction20141['Label'],   
    prediction20151['Label'],
    prediction20161['Label'],   
    prediction20171['Label'],   
    prediction20181['Label'],   
    prediction20191['Label'],
    prediction20201['Label'], 
    prediction20211['Label'],  
    prediction1['Label'],     
    prediction3['Label'], 
    prediction5['Label'],  
    prediction7['Label'], 
    ], "True": False
                    })

  
    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response   

@app.route('/api/admin_nivel', methods=['POST'])
@cross_origin()
def admin_nivel():

    data = request.get_json() 
    print(data)
    df = pd.json_normalize(data)
    print(df)


    Nivel = df['NIVEL'].values[0]
    print('Nivel')
    print(Nivel)
    adminNivel = adminGB[adminGB['NIVEL'] == Nivel ]
    adminNivelCM = adminCM[adminCM['NIVEL'] == Nivel ] 

    print('adminNivel')
    print(adminNivel)

    print('adminNivel con Cantidad admin')
    print(adminNivelCM)

    CM = pd.DataFrame({"YEAR": [ ],                
                    "Label":[],
                    "True": boolean
                    })

    CM['YEAR'] = adminNivelCM['YEAR']
    CM['Label'] = adminNivelCM['CantidadAdmin']
    CM['True'] = True

    adminNivel['YEAR'] = 2008
    prediction001 = predict_model(model_admin, data= adminNivel)
    mean2008_1 = prediction001['Label'].mean()

    adminNivel['YEAR'] = 2009
    prediction1 = predict_model(model_admin, data= adminNivel)
    mean2009_1 = prediction1['Label'].mean()


    adminNivel['YEAR'] = 2010
    prediction3 = predict_model(model_admin, data= adminNivel)
    mean2010_1 = prediction3['Label'].mean()


    adminNivel['YEAR'] = 2011
    prediction4 = predict_model(model_admin, data= adminNivel)
    mean2011_1 = prediction4['Label'].mean()


    adminNivel['YEAR'] = 2012
    prediction01 = predict_model(model_admin, data= adminNivel)
    mean2012_1 = prediction01['Label'].mean()

    adminNivel['YEAR'] = 2013
    prediction7 = predict_model(model_admin, data= adminNivel)
    mean2013_1 = prediction7['Label'].mean()

    adminNivel['YEAR'] = 2014
    prediction9 = predict_model(model_admin, data= adminNivel)
    mean2014_1 = prediction9['Label'].mean()

    adminNivel['YEAR'] = 2015
    prediction11 = predict_model(model_admin, data= adminNivel)
    mean2015_1 = prediction11['Label'].mean()

    adminNivel['YEAR'] = 2016
    prediction13 = predict_model(model_admin, data= adminNivel)
    mean2016_1 = prediction13['Label'].mean()

    adminNivel['YEAR'] = 2017
    prediction15 = predict_model(model_admin, data= adminNivel)
    mean2017_1 = prediction15['Label'].mean()

    adminNivel['YEAR'] = 2018
    prediction17 = predict_model(model_admin, data= adminNivel)
    mean2018_1 = prediction17['Label'].mean()

    adminNivel['YEAR'] = 2019
    prediction19 = predict_model(model_admin, data= adminNivel)
    mean2019_1 = prediction19['Label'].mean()

    adminNivel['YEAR'] = 2020
    prediction21 = predict_model(model_admin, data= adminNivel)
    mean2020_1 = prediction21['Label'].mean()

    adminNivel['YEAR'] = 2021
    prediction23 = predict_model(model_admin, data= adminNivel)
    mean2021_1 = prediction23['Label'].mean()

    adminNivel['YEAR'] = 2022
    prediction25 = predict_model(model_admin, data= adminNivel)
    mean2022_1 = prediction25['Label'].mean()

    adminNivel['YEAR'] = 2023
    prediction27 = predict_model(model_admin, data= adminNivel)
    mean2023_1 = prediction27['Label'].mean()

    adminNivel['YEAR'] = 2024
    prediction29 = predict_model(model_admin, data= adminNivel)
    mean2024_1 = prediction29['Label'].mean()

    adminNivel['YEAR'] = 2025
    prediction30 = predict_model(model_admin, data= adminNivel)
    mean2025_1 = prediction30['Label'].mean()


    
    predictionDataframe = pd.DataFrame({"YEAR": [
        '2008',
        '2009', 
        '2010', 
        '2011', 
        '2012', 
        '2013', 
        '2014', 
        '2015', 
        '2016', 
        '2017', 
        '2018', 
        '2019',    
        '2020',  
        '2021',  
        '2022',  
        '2023',  
        '2024',
        '2025',  ],                
        "Label":[
            mean2008_1,
            mean2009_1,
            mean2010_1,
            mean2011_1, 
            mean2012_1, 
            mean2013_1, 

            mean2014_1, 
            mean2015_1,  
            mean2016_1, 
            mean2017_1, 
            mean2018_1, 
            mean2019_1,  

            mean2020_1, 
            mean2021_1,  
            mean2022_1, 
            mean2023_1, 
            mean2024_1,
            mean2025_1 ],
                    "True": False
                    })

    response = pd.concat([
    predictionDataframe, CM
    ]) 
    response = response.to_json(orient="records")
    parsed = json.loads(response)
    response = json.dumps(parsed, indent=4) 
    return response

if __name__ == '__main__':   
    app.run(use_reloader=False, host='0.0.0.0')
