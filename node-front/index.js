const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const db = require('./db-config');
// db-config.js
//const mysql = require('mysql2');

// Allow requests from 'http://localhost:3000'
const corsOptions = {
    origin: 'http://localhost:3000',
  };

  app.use(cors(corsOptions));
/*const dbConnection = mysql.createConnection({
  host: '35.245.80.91', // Dirección del servidor de MySQL
  user: 'root', // Nombre de usuario de MySQL
  password: 'Olakeas123**', // Contraseña de MySQL
  database: 'alumno', // Nombre de la base de datos
});

dbConnection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a la base de datos');
    }
});*/

//module.exports = dbConnection;




//dbConnection = require('./db-config');

/*dbConnection.connect((err) => {
if (err) {
  console.error('Error al conectar a la base de datos:', err);
  return;
}
console.log('Conexión a la base de datos exitosa');*/

// Ejecutar consultas SQL aquí


// TODOS LOS ALUMNOS 
app.get('/todosAlumnos', (req, res) => {
    const consulta = 'SELECT *  FROM calificacion ORDER BY carnet ASC';
    db.query(consulta, (err, results) => {
        if (err) {
            throw err;
        }
        const jsonData = JSON.stringify(results);
        //res.json(results);
        console.log(jsonData+" Data enviada");
        res.send(jsonData);

    });
});

// PORCENTAJE DE APROBACION POR CURSO Y SEMESTRE
app.get('/aprobacionCurSem', (req, res) => {
    const consulta = 'SELECT SUM(CASE WHEN nota >= 60 THEN 1 ELSE 0 END) AS aprobados, SUM(CASE WHEN nota < 60 THEN 1 ELSE 0 END) AS reprobados FROM calificacion WHERE semestre = \'2S\' AND curso=\'SO1\'';
    db.query(consulta, (err, results) => {
        if (err) {
            throw err;
        }
        const jsonData = JSON.stringify(results);
        //res.json(results);
        console.log(jsonData+" Data enviada");
        res.send(jsonData);

    });
});


// CONSULTA PROMEDIO DE ESTUDIANTES EN UN SEMESTRE  
app.get('/calificacionProm', (req, res) => {
    const consulta = 'SELECT  carnet,AVG(nota) as promedio FROM calificacion WHERE  semestre=\'1S\' GROUP BY carnet LIMIT 5';
    db.query(consulta, (err, results) => {
        if (err) {
            throw err;
        }
        const jsonData = JSON.stringify(results);
        //res.json(results);
        console.log(jsonData+" Data enviada");
        res.send(jsonData);
    });
});

// CONSULTA CURSOS CON MAYOR NUMERO DE ALUMNOS
app.get('/cursoAlumAsig', (req, res) => {
    const consulta = 'SELECT  curso, COUNT(curso) as Asignados FROM calificacion WHERE semestre=\'1S\' GROUP BY curso LIMIT 3';
    db.query(consulta, (err, results) => {
        if (err) {
            throw err;
        }
        const jsonData = JSON.stringify(results);
        //res.json(results);
        console.log(jsonData+" Data enviada");
        res.send(jsonData);
        
    });
});

// CONSULTA CANTIDAD DE NOTAS POR CURSO
app.get('/cursoNotCur', (req, res) => {
    const consulta = 'SELECT curso, COUNT(nota) as CantidadDeNotas  FROM calificacion WHERE semestre=\'1S\' GROUP BY curso';
    db.query(consulta, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        //res.json(results);

    });
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Cerrar la conexión cuando hayas terminado
//dbConnection.end();
//});
