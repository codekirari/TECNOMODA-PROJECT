// 1. Invocamos a express
const express = require('express');
const app = express();

// 2. Seteamos urlencode para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3. Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

// 4. Setear el directorio public
app.use('/resources', express.static(__dirname + '/public'));

// 5. Establecer el motor de plantillas
app.set('view engine', 'ejs');

// 6. Invocar módulo para encriptar password
const bcryptjs = require('bcryptjs');

// 7. Variable de sesión
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8. Invocamos al módulo de conexión de la BD
const conexion = require('./database/db');

// 9. Estableciendo las rutas
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// 10. Registración
app.post('/register', async (req, res) => {
    const { username, email, rol, password } = req.body;

    // Validar que todos los campos están completos
    if (!username || !email || !password || !rol) {
        return res.render('register', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Por favor complete todos los campos.",
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'register'
        });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);  // Usando un salt rounds de 10

    // Generar un ID aleatorio para el usuario
    const id_user = Math.floor(Math.random() * (200000 - 100000)) + 100000;

    // Insertar el nuevo usuario en la base de datos
    conexion.query('INSERT INTO usuario SET ?', { Nombre: username, rol: rol, contrasenia: passwordHash, Email: email, id_usuario: id_user }, (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Hubo un error al registrar al usuario.",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro completado con éxito!!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        }
    });
});

// 11. Autenticación
app.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    // Validamos si se ingresaron la contraseña y el usuario
    if (email && password) {
        conexion.query('SELECT * FROM usuario WHERE Email = ?', [email], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(password, results[0].contrasenia))) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                // Guardamos la sesión del usuario
                req.session.loggedin = true;
                req.session.name = results[0].Nombre;

                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa!!",
                    alertMessage: "Inicio de sesión exitoso",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }
        });
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia!!",
            alertMessage: "Ingrese el campo de usuario y contraseña!!",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
    }
});

// 12. Método de autenticación para las demás páginas
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        });
    }
});

// 13. Cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// 14. Levantando el servidor
app.listen(3000, (req, res) => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
