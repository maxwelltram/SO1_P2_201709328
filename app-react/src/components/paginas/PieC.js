import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Chart } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

function PieC() {
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!hasFetchedData) {
    // Realiza una solicitud al backend de Node.js para obtener los datos
    axios.get('http://localhost:3001/aprobacionCurSem')
      .then(response => {
        const dataFromBackend = response.data;
        setData(dataFromBackend);
        setHasFetchedData(true);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
    }
  }, [hasFetchedData]);

  // Asegúrate de que la instancia de la gráfica se cree una vez
  useEffect(() => {
    if (data.length > 0 && chartInstance === null) {
      const labels = data.map(d => d.aprobados);
      const label2 = data.map(d => d.reprobados);
      const values = data.map(d => d.aprobados);
      const value2 = data.map(d => d.reprobados);

      const chartData = {
        labels: [labels,label2,],
        datasets: [
          {
            data: [values,value2,],
            backgroundColor: ['red', 'green'], // Colores para las categorías
          },
        ],
      };

      const canvas = document.getElementById('myCanvas');

      // Crea la nueva gráfica en el elemento canvas
      const newChartInstance = new Chart(canvas, {
        type: 'pie',
        data: chartData,
      });

      setChartInstance(newChartInstance);
    }
  }, [data, chartInstance]);

  return (
    <div>
      <h2>Gráfica de Pastel</h2>
      <canvas id="myCanvas" width="200" height="200"></canvas>
    </div>
  );
}

export default PieC;
