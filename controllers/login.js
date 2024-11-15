const bcrypt = require('bcrypt');
const { ejecutarQuerySQL } = require("../database/conectar");

function login(req, res) {
    // Obtenemos el nombre de usuario y contraseña del cuerpo de la solicitud
    const { correo, contrasenia } = req.body;

    const sql = `
        SELECT contrasenia FROM usuario WHERE Email = '${correo}'
    `;
    // Ejecuta la consulta SQL y enviamos res para que maneje la respuesta del endpoint
    // Si la contraseña es correcta, se envia un mensaje de sesion iniciada
    // Si la contraseña es incorrecta, se envia un mensaje de verifique sus credenciales
    // Then es una promesa que se ejecuta cuando la promesa se resuelve correctamente
    // Catch es una promesa que se ejecuta cuando la promesa falla
    ejecutarQuerySQL(sql)
        .then((resultado) => {
            if (resultado.length > 0) {
                // Si existe un usuario con ese correo, se compara la contraseña
                const contrasenaEncriptada = resultado[0].contrasenia;
                const contrasenaValida = bcrypt.compareSync(contrasenia, contrasenaEncriptada);
                if (contrasenaValida) {
                    res.send({ mensaje: 'Sesion iniciada' });
                } else {
                    res.send({ mensaje: 'Contraseña incorrecta' }, 400);
                }
            } else {
                res.send({ mensaje: 'Verifique sus credenciales' }, 400);
            }
        })
        .catch((error) => {
            res.send({ mensaje: error }, 500);
        });
}

module.exports = { login };