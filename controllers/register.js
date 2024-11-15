
const bcrypt = require('bcrypt');
const { ejecutarQuerySQL } = require("../database/conectar");

function registrarUsuario(req, res) {
    if (req.body) {
        if (!req.body.correo && !req.body.correo.includes('@')) {
            res.send({ mensaje: 'Email invalido'}, 400);
            // Si el email no es valido, no se ejecuta la consulta SQL
            return;
        }
    }
    // Consulta SQL
    const { nombre, correo, contrasenia } = req.body;
    // encripta usando bcrypt, usando hashSync y 10 rondas de encriptacion
    const contrasenaEncriptada = bcrypt.hashSync(contrasenia, 10);

    const sql = `
        INSERT INTO usuario (Nombre, Email, contrasenia)
        VALUES ('${nombre}', '${correo}', '${contrasenaEncriptada}')
    `;
    // Ejecuta la consulta SQL y enviamos res para que maneje la respuesta del endpoint
    ejecutarQuerySQL(sql)
        .then((resultado) => {
            res.send({ mensaje: 'Usuario registrado' }, 200);
        })
        .catch((error) => {
            res.send({ mensaje: error }, 500);
        });
}

module.exports = {
    registrarUsuario
};