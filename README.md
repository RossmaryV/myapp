Sistema de Gestión de Mascotas - Examen Final PW1

Este proyecto fue desarrollado como parte del examen final de la materia **Programación Web 1** (React.js). 
La aplicación permite gestionar dueños y sus mascotas, con autenticación de usuario, CRUD completos, relación entre tablas y generación de reportes visuales.

Acerca de  Instalación y ejecución

1. Clona el repositorio
git clone https://github.com/RossmaryV/myapp.git
2. Instala dependencias del backend
cd backend
npm install
node server.js

3. Instala dependencias del frontend
cd ../frontend
npm install
npm run dev

Funcionalidades principales:

Login de usuarios con validación de seguridad.
Registro de nuevos usuarios y confirmación de contraseña.
Menú de navegación superior después del login.
Pantalla de bienvenida al ingresar.
CRUD completo de:
Dueños
Mascotas (relacionadas con los dueños)

Validaciones de campos (edad no negativa, nombres sin números, etc.).
Prevención de registros duplicados.
Reporte visual y textual.

Módulos CRUD
Módulo 1: Dueños
Crear, listar, editar y eliminar dueños.
Validaciones en el formulario (campos obligatorios, teléfono válido, etc.).
Evita la duplicación de registros.

Módulo 2: Mascotas
Crear, listar, editar y eliminar mascotas.
Relación directa con un dueño (uno a muchos).
Edad con unidad (años o meses).
No se permiten nombres duplicados por dueño.
Validaciones en todos los campos.

Reporte
Incluye 2 tipos de reportes combinados:
Cantidad de mascotas por dueño
Se muestra con gráfico de barras + listado textual con totales por persona.

Tipo de mascota más registrado
Gráfico de barras mostrando la cantidad de mascotas por tipo.

Tecnologías usadas
React.js + TypeScript:
Librería de JavaScript para construir interfaces de usuario reactivas, utilizando tipado estático para mayor seguridad y escalabilidad.
Bootstrap 5:
Framework de estilos CSS que permite crear interfaces modernas y responsivas con clases predefinidas.
Chart.js:
Librería para crear gráficos visuales e interactivos, ideal para reportes de datos.
Node.js + Express:
Entorno de ejecución y framework backend que permite manejar rutas y lógica del servidor de manera rápida y sencilla.
LocalStorage:
Mecanismo del navegador que almacena datos localmente en el cliente, utilizado para mantener sesiones simples de login.
CRA (Create React App):
Es una herramienta de línea de comandos que facilita la creación rápida de proyectos React sin necesidad de configuración.

✍️ Autor
Rossmary V.
Examen Final – Programación Web 1
FCyT - UNCA
