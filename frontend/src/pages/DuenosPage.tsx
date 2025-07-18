import { useEffect, useState } from 'react';
import axios from 'axios';

interface Dueno {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export default function DuenosPage() {
  const [duenos, setDuenos] = useState<Dueno[]>([]);
  const [form, setForm] = useState<Omit<Dueno, 'id'>>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    obtenerDuenos();
  }, []);

  const obtenerDuenos = async () => {
    const res = await axios.get('http://localhost:3001/api/duenos');
    setDuenos(res.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   if (!form.nombre.trim()) return alert('El nombre es obligatorio');
if (/\d/.test(form.nombre)) return alert('El nombre no debe contener números');

if (form.telefono && /[^\d]/.test(form.telefono)) return alert('El teléfono solo debe contener números');

if (form.email && !/\S+@\S+\.\S+/.test(form.email)) return alert('Email no válido');

const duplicado = duenos.find(d =>
  d.nombre.trim().toLowerCase() === form.nombre.trim().toLowerCase()
);
if (duplicado && editandoId === null) {
  return alert('Ya existe un dueño con ese nombre.');
}


    if (editandoId !== null) {
      await axios.put(`http://localhost:3001/api/duenos/${editandoId}`, form);
      cancelarEdicion();
    } else {
      await axios.post('http://localhost:3001/api/duenos', form);
    }

    setForm({ nombre: '', email: '', telefono: '', direccion: '' });
    obtenerDuenos();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este dueño?')) return;
    await axios.delete(`http://localhost:3001/api/duenos/${id}`);
    obtenerDuenos();
  };

  const cargarEdicion = (dueno: Dueno) => {
    setForm({
      nombre: dueno.nombre,
      email: dueno.email,
      telefono: dueno.telefono,
      direccion: dueno.direccion,
    });
    setEditandoId(dueno.id);
  };

  const cancelarEdicion = () => {
    setForm({ nombre: '', email: '', telefono: '', direccion: '' });
    setEditandoId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📋 Lista de Dueños</h2>

      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded">
        <div className="row">
          <div className="col">
            <input type="text" name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="email" name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" name="telefono" className="form-control" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          </div>
          <div className="col">
            <input type="text" name="direccion" className="form-control" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
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

      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {duenos.map((dueno) => (
            <tr key={dueno.id}>
              <td>{dueno.nombre}</td>
              <td>{dueno.email}</td>
              <td>{dueno.telefono}</td>
              <td>{dueno.direccion}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => cargarEdicion(dueno)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dueno.id)}>
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
