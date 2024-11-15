const express = require('express');
const { registrarUsuario } = require('./register');  // Importamos el controlador de registro
const { login } = require('./login');  // Importamos el controlador de registro

const app = express();
const PORT = process.env.PORT || 3000;

// lea archivos estaticos
// Esto es util porque no necesitamos hacer un endpoint para cada archivo
// en la carpeta vista
app.use(express.static('views'))

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json())

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    registrarUsuario(req, res);
});

// Ruta para iniciar sesion
app.post('/login', (req, res) => {
    login(req, res);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
