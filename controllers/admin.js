const { ejecutarQuerySQL } = require("../database/conectar");

function obtenerUsuarios(req, res) {
    const sql = `
        SELECT * FROM usuario
    `;
    ejecutarQuerySQL(sql)
        .then((resultado) => {
            res.send(resultado).status(200);
        })
        .catch((error) => {
            res.send({ mensaje: error }).status(500);
        });
}

function borrarUsuario(req, res) {
    const { correo } = req.params;
    const sql = `
        DELETE FROM usuario WHERE Email = '${correo}'
    `;
    ejecutarQuerySQL(sql)
        .then((resultado) => {
            res.send({ mensaje: 'Usuario eliminado' }).status(200);
        })
        .catch((error) => {
            res.send({ mensaje: error }).status(500);
        });
}

module.exports = {
    obtenerUsuarios,
    borrarUsuario
}