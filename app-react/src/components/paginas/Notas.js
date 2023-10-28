import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


function Notas() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Realiza una solicitud al backend de Node.js para obtener los datos
      axios.get('http://localhost:3001/calificacionProm')  // Asegúrate de ajustar la URL a tu API backend
        .then(response => {
          const dataFromBackend = response.data;
          console.log(dataFromBackend);
          setData(dataFromBackend);
          //const parsedData = JSON.parse(dataFromBackend);
          console.log(dataFromBackend);
          
          
          //const { labels, values } = response.data;
          //console.log(labels, values);
          //setData({ labels, values });
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    }, []);
  
    const labels = data.map(d => d.carnet);
    const values = data.map(d => d.promedio);

    // Configuración de la gráfica de barras
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Valores',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div>
        <h2>Promedio de alumnos</h2>
        <Bar data={chartData} />
      </div>
    );
  }
  
  export default Notas;
//rafce como shortcut