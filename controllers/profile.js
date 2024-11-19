const { ejecutarQuerySQL } = require("../database/conectar");

function getProfile(req, res) {
    // Obtenemos el nombre de usuario y contraseña del cuerpo de la solicitud
    const { correo } = req.query;

    const sql = `
        SELECT
            id_usuario,
            Nombre,
            Email,
            Celular,
            Direccion,
            Programa,
            rol
        FROM usuario WHERE Email = '${correo}'
        LIMIT 1
    `;
    // Ejecuta la consulta SQL y enviamos res para que maneje la respuesta del endpoint
    // Si la contraseña es correcta, se envia un mensaje de sesion iniciada
    // Si la contraseña es incorrecta, se envia un mensaje de verifique sus credenciales
    // Then es una promesa que se ejecuta cuando la promesa se resuelve correctamente
    // Catch es una promesa que se ejecuta cuando la promesa falla
    ejecutarQuerySQL(sql)
        .then((resultado) => {
            if(resultado.length === 0) {
                return res.send({ mensaje: 'Usuario no encontrado' }).status(404);
            }
            res.send(resultado[0]).status(200);
        })
        .catch((error) => {
            res.send({ mensaje: error }).status(500);
        });
}

function updateProfile(req, res) {
    const { Celular, Direccion, Programa } = req.body;
    const { correo } = req.query;

    const sql = `
        UPDATE usuario
        SET Celular = '${Celular}', Direccion = '${Direccion}', Programa = '${Programa}'
        WHERE Email = '${correo}'
    `;

    ejecutarQuerySQL(sql)
        .then((resultado) => {
            res.send({ mensaje: 'Datos actualizados' }).status(200);
        })
        .catch((error) => {
            res.send({ mensaje: error }).status(500);
        });
}

module.exports = { getProfile, updateProfile };