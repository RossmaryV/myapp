// src/App.tsx
import { useState } from 'react';
import DuenosPage from './pages/DuenosPage';
import MascotasPage from './pages/MascotasPage';
import LoginPage from './pages/LoginP';
import RegisterPage from './pages/Register';
import HomePage from './pages/HomeP';
import ReportePage from './pages/ReporteP';


function App() {
  const [usuario, setUsuario] = useState<string | null>(localStorage.getItem('usuario'));
  const [vista, setVista] = useState(usuario ? 'home' : 'login');

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setVista('login');
  };

  if (vista === 'login') {
    return <LoginPage onLogin={(nombre: string) => { setUsuario(nombre); setVista('home'); }} onIrRegistro={() => setVista('register')} />;
  }

  if (vista === 'register') {
    return <RegisterPage onRegistro={() => setVista('login')} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>🐶 Sistema de Mascotas</h4>
        <div className="btn-group">
          <button onClick={() => setVista('home')} className="btn btn-outline-secondary">Inicio</button>
          <button onClick={() => setVista('duenos')} className="btn btn-outline-primary">Dueños</button>
          <button onClick={() => setVista('mascotas')} className="btn btn-outline-primary">Mascotas</button>
          <button onClick={() => setVista('reporte')} className="btn btn-outline-primary">Reporte</button>
          <button onClick={cerrarSesion} className="btn btn-danger">Cerrar sesión</button>
        </div>
      </div>

      {vista === 'home' && <HomePage nombre={usuario!} onIr={setVista} />}
      {vista === 'duenos' && <DuenosPage />}
      {vista === 'mascotas' && <MascotasPage />}
      {vista === 'reporte' && <ReportePage />}

    </div>
  );
}

export default App;
