// src/components/LoginPage.tsx
import { useState } from 'react';

export default function LoginPage({ onLogin, onIrRegistro }: { onLogin: (nombre: string) => void, onIrRegistro: () => void }) {
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = localStorage.getItem(`user_${nombre}`);
    if (user && JSON.parse(user).clave === clave) {
      localStorage.setItem('usuario', nombre);
      onLogin(nombre);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3>🔐 Iniciar Sesión</h3>
      <form onSubmit={handleSubmit} className="mt-3 w-50 mx-auto">
        <input type="text" className="form-control mb-2" placeholder="Usuario" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} required />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
      <p className="mt-3">¿No tenés cuenta? <button className="btn btn-link" onClick={onIrRegistro}>Registrarse</button></p>
    </div>
  );
}
