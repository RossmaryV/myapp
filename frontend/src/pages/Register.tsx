import { useState } from 'react';

export default function RegisterPage({ onRegistro }: { onRegistro: () => void }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');

  const handleRegistro = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameValido = /^[a-zA-Z0-9]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const claveValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!usernameValido.test(nombre)) {
      return alert('El nombre de usuario solo puede contener letras y números, sin espacios ni símbolos.');
    }

    if (!emailValido.test(email)) {
      return alert('El correo electrónico no es válido.');
    }

    if (!claveValida.test(clave)) {
      return alert('La contraseña debe tener al menos 6 caracteres, incluyendo una mayúscula, una minúscula y un número.');
    }

    if (clave !== confirmarClave) {
      return alert('Las contraseñas no coinciden.');
    }

    if (localStorage.getItem(`user_${nombre}`)) {
      return alert('El usuario ya existe.');
    }

    localStorage.setItem(`user_${nombre}`, JSON.stringify({ clave, email }));
    alert('Registro exitoso');
    onRegistro();
  };

  return (
    <div className="container mt-5 text-center">
      <h3>📝 Registrarse</h3>
      <form onSubmit={handleRegistro} className="mt-3 w-50 mx-auto">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirmar contraseña"
          value={confirmarClave}
          onChange={(e) => setConfirmarClave(e.target.value)}
          required
        />
        <button className="btn btn-success w-100">Crear cuenta</button>
      </form>
    </div>
  );
}
