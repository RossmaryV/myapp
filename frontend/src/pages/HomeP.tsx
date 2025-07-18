// src/pages/HomePage.tsx
import React from 'react';

interface Props {
  nombre: string;
  onIr: (vista: string) => void;
}

const HomePage: React.FC<Props> = ({ nombre, onIr }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '70vh' }}
    >
      <h1 className="mb-4 text-center">✨¡Bienvenido/a, {nombre}!✨</h1>
      <p className="text-muted mb-4">Selecciona una sección para comenzar:</p>
      <div className="d-flex gap-3">
        <button className="btn btn-outline-primary" onClick={() => onIr('duenos')}>Gestionar Dueños</button>
        <button className="btn btn-outline-primary" onClick={() => onIr('mascotas')}>Gestionar Mascotas</button>
        <button className="btn btn-outline-primary" onClick={() => onIr('reporte')}>Ver Reporte</button>
      </div>
    </div>
  );
};

export default HomePage;
