import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://172.19.0.7:3300"); // Asegúrate de que la URL coincida con la del servidor Express con Socket.IO



function App() {
   // Conecta el cliente al servidor
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [cantidadAlumnos, setCantidadAlumnos] = useState(0);

  useEffect(() => {
    // Escucha el evento 'totalRegistros' desde el servidor
    socket.on('totalRegistros', (total) => {
      setTotalRegistros(total);
    });

    // Escucha el evento 'cantidadAlumnos' desde el servidor
    socket.on('cantidadAlumnos', (cantidad) => {
      setCantidadAlumnos(cantidad);
    });

    // Emite el evento 'alumnosCursoSemestre' al servidor
    socket.emit('alumnosCursoSemestre', { curso: 'MiCurso', semestre: 'MiSemestre' });
  }, []);

  return (
    <div className="App">
      <h1>API en Tiempo Real con Socket.IO</h1>
      <p>Cantidad Total de Registros: {totalRegistros}</p>
      <p>Cantidad de Alumnos en Curso y Semestre Específico: {cantidadAlumnos}</p>
    </div>
  );
}

export default App;
