from flask import Flask, request, jsonify
import simplejson as json
import redis


app = Flask(__name__)
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

class Alumno:
    def __init__(self, carnet, nombre , curso, nota, semestre, year):
        self.carnet = carnet
        self.nombre = nombre
        self.curso = curso
        self.nota = nota
        self.semestre = semestre
        self.year = year

@app.route('/agregarAlumno', methods=['POST'])
def agregar_alumno():
    
    try:
        data = request.get_json()
        alumno = Alumno(
            data['carnet'],
            data['nombre'], 
            data['curso'], 
            data['nota'], 
            data['semestre'], 
            data['year']
            )
        print(data)
        json_alumno = {
            "carnet": alumno.carnet,
            "nombre": alumno.nombre,
            "curso": alumno.curso,
            "nota": alumno.nota,
            "semestre": alumno.semestre,
            "year": alumno.year
        }

        counter = redis_client.incr('contador_alumnos')
        key = f"alumno:{counter}"
        json_alumno_str = json.dumps(json_alumno)
        redis_client.set(key, json_alumno_str)

        print("Alumno agregado exitosamente en Redis", json_alumno)
        return f"¡Gracias por votar! ({counter} votos registrados)", 200
    except Exception as e:
        return str(e), 500    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3300, debug=True)