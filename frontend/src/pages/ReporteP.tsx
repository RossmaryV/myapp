// src/pages/ReportePage.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Mascota {
  id: number;
  nombre: string;
  tipo: string;
  edad: number;
  duenio_id: number;
  nombre_dueno?: string;
}

export default function ReportePage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const obtenerMascotas = async () => {
    const res = await axios.get('http://localhost:3001/api/mascotas');
    setMascotas(res.data);
  };

  const contarTipos = () => {
    const conteo: Record<string, number> = {};
    mascotas.forEach((m) => {
      const tipo = m.tipo.trim().toLowerCase();
      conteo[tipo] = (conteo[tipo] || 0) + 1;
    });
    return conteo;
  };

  const contarPorDueno = () => {
    const conteo: Record<string, number> = {};
    mascotas.forEach((m) => {
      const dueno = m.nombre_dueno || `ID ${m.duenio_id}`;
      conteo[dueno] = (conteo[dueno] || 0) + 1;
    });
    return conteo;
  };

  const datosTipo = contarTipos();
  const labelsTipo = Object.keys(datosTipo);
  const valoresTipo = Object.values(datosTipo);

  const datosDueno = contarPorDueno();
  const labelsDueno = Object.keys(datosDueno);
  const valoresDueno = Object.values(datosDueno);

  const tipoMasRegistrado = labelsTipo[valoresTipo.indexOf(Math.max(...valoresTipo))];

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📊 Reporte de Mascotas Registradas</h3>

      <h5 className="mb-3">📋 Cantidad de Mascotas por Dueño</h5>
      {labelsDueno.length === 0 ? (
        <p className="text-center">No hay datos de dueños disponibles.</p>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <Bar
              data={{
                labels: labelsDueno,
                datasets: [
                  {
                    label: 'Mascotas por Dueño',
                    data: valoresDueno,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: {
                    display: true,
                    text: 'Número de mascotas por dueño',
                  },
                },
              }}
            />
          </div>
          <div className="col-md-6">
            <ul className="list-group">
              {labelsDueno.map((dueno, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  {dueno}
                  <span className="badge bg-primary rounded-pill">{valoresDueno[i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <hr className="my-5" />

      <h5 className="mb-3">🐾 Distribución por Tipo de Mascota</h5>
      {labelsTipo.length === 0 ? (
        <p className="text-center">No hay datos disponibles.</p>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <Bar
              data={{
                labels: labelsTipo,
                datasets: [
                  {
                    label: 'Cantidad por Tipo',
                    data: valoresTipo,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: {
                    display: true,
                    text: 'Cantidad de mascotas por tipo',
                  },
                },
              }}
            />
          </div>
          <div className="col-md-6">
            <div className="alert alert-info text-center">
              <strong>🐶 Tipo más registrado:</strong><br />
              {tipoMasRegistrado.toUpperCase()} ({Math.max(...valoresTipo)} registro/s)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
