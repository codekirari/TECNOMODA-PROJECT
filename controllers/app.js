const express = require('express');
const { registrarUsuario } = require('./register');  // Importamos el controlador de registro
const { login } = require('./login');  // Importamos el controlador de registro
const { getProfile, updateProfile } = require('./profile');  // Importamos el controlador de profile
const { borrarUsuario, obtenerUsuarios } = require('./admin');

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

// Ruta para obtener el perfil de un usuario
app.get('/profile', (req, res) => {
    getProfile(req, res);
});

// Ruta para actualizar el perfil de un usuario
app.put('/profile', (req, res) => {
    updateProfile(req, res);
});

// Obtener usuarios
app.get('/usuarios', (req, res) => {
    obtenerUsuarios(req, res);
})

// Borrar usuario
app.delete('/usuarios/:correo', (req, res) => {
    borrarUsuario(req, res);
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
