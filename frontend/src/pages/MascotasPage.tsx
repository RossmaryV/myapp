import { useEffect, useState } from 'react';
import axios from 'axios';

interface Dueno {
  id: number;
  nombre: string;
}

interface Mascota {
  id: number;
  nombre: string;
  tipo: string;
  edad: number;
  duenio_id: number;
  nombre_dueno?: string;
}

export default function MascotasPage() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [duenos, setDuenos] = useState<Dueno[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    edad: 0,
    unidadEdad: 'años',
    duenio_id: 0,
  });

  useEffect(() => {
    obtenerDuenos();
    obtenerMascotas();
  }, []);

  const obtenerDuenos = async () => {
    const res = await axios.get('http://localhost:3001/api/duenos');
    setDuenos(res.data);
  };

  const obtenerMascotas = async () => {
    const res = await axios.get('http://localhost:3001/api/mascotas');
    setMascotas(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'edad' && isNaN(Number(value))) return;
    if ((name === 'nombre' || name === 'tipo') && /\d/.test(value)) return;

    setForm({
      ...form,
      [name]: name === 'edad' || name === 'duenio_id' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.duenio_id || form.edad <= 0) return alert('Todos los campos son obligatorios');

    const duplicado = mascotas.find(m =>
      m.nombre.trim().toLowerCase() === form.nombre.trim().toLowerCase() &&
      m.duenio_id === form.duenio_id &&
      editandoId === null
    );
    if (duplicado) return alert('Esa mascota ya está registrada con ese dueño.');

    const edadFinal = form.unidadEdad === 'meses' ? form.edad : form.edad * 12;

    const payload = {
      nombre: form.nombre,
      tipo: form.tipo,
      edad: edadFinal,
      duenio_id: form.duenio_id,
    };

    if (editandoId !== null) {
      await axios.put(`http://localhost:3001/api/mascotas/${editandoId}`, payload);
      cancelarEdicion();
    } else {
      await axios.post('http://localhost:3001/api/mascotas', payload);
    }

    obtenerMascotas();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta mascota?')) return;
    await axios.delete(`http://localhost:3001/api/mascotas/${id}`);
    obtenerMascotas();
  };

  const cargarEdicion = (mascota: Mascota) => {
    const [valor, unidad] = mascota.edad >= 12
      ? [Math.floor(mascota.edad / 12), 'años']
      : [mascota.edad, 'meses'];

    setForm({
      nombre: mascota.nombre,
      tipo: mascota.tipo,
      edad: valor,
      unidadEdad: unidad,
      duenio_id: mascota.duenio_id,
    });
    setEditandoId(mascota.id);
  };

  const cancelarEdicion = () => {
    setForm({ nombre: '', tipo: '', edad: 0, unidadEdad: 'años', duenio_id: 0 });
    setEditandoId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🐾 Lista de Mascotas</h2>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded">
        <div className="row g-2">
          <div className="col">
            <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" name="tipo" className="form-control" placeholder="Tipo (Perro, Gato...)" value={form.tipo} onChange={handleChange} />
          </div>
          <div className="col">
            <div className="input-group">
              <input
                type="number"
                name="edad"
                className="form-control"
                placeholder="Edad"
                min={1}
                value={form.edad === 0 ? '' : form.edad}
                onChange={handleChange}
              />
              <select name="unidadEdad" className="form-select" value={form.unidadEdad} onChange={handleChange}>
                <option value="años">año(s)</option>
                <option value="meses">mes(es)</option>
              </select>
            </div>
          </div>
          <div className="col">
            <select name="duenio_id" className="form-select" value={form.duenio_id} onChange={handleChange}>
              <option value={0}>Seleccionar dueño</option>
              {duenos.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success">
              {editandoId !== null ? 'Actualizar' : 'Agregar'}
            </button>
            {editandoId !== null && (
              <button type="button" className="btn btn-secondary ms-2" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Edad</th>
            <th>Dueño</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.tipo}</td>
              <td>
                {m.edad >= 12 ? `${Math.floor(m.edad / 12)} año(s)` : `${m.edad} mes(es)`}
              </td>
              <td>{m.nombre_dueno}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => cargarEdicion(m)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
