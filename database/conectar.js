const mysql = require('mysql2');

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Usuario de tu base de datos
    password: '331233',  // Contraseña de tu base de datos
    database: 'dbtecnomoda'  // Nombre de tu base de datos
});

// Promesa para ejecutar la consulta SQL
function ejecutarQuerySQL(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { ejecutarQuerySQL };
