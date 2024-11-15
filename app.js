const express = require('express');
const bodyParser = require('body-parser');
const { registroUsuario } = require('./controladores/registro');  // Importamos el controlador de registro

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para registrar usuarios
app.post('/register', registroUsuario);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
