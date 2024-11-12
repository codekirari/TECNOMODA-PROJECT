//1. Invocamos a express
const express = require('express');
const app = express();

//2. Seteamos urlencode para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3. Invocamos a doten
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//4. Setear el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5. Establecer el motor de plantillas
app.set('view engine', 'ejs');

//6. Invocar modulo para encriptar password
const bcryptjs = require('bcryptjs');

//7. variable de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}))

//8. Invocamos al módulo de conexión de la BD
const conexion = require('./database/db');

//9. Estableciendo las rutas
// app.get('/', (req, res)=>{
//     res.render('index', {msg:'Daniel Bernal'});
// })

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})


//10. Registración
app.post('/register', async (req, res)=>{
    const user = req.body.username;
    const email = req.body.email;
    const rol = req.body.rol;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    let id_user = Math.floor(Math.random() * (200000 - 100000)) + 100000
    conexion.query('INSERT INTO usuario SET ?', {Nombre:user, rol:rol, contrasenia:passwordHaash, Email:email, id_usuario:id_user}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register', {
                alert: true,
                alertTitle : "Registro",
                alertMessage: "Registro completado con exito!!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
})

//11. Autenticacion
app.post('/auth', async (req, res)=>{
    const user = req.body.email;
    const pass = req.body.password;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){ //Validamos si se ingreso una contraseña y un usuario
        conexion.query('SELECT * FROM usuario WHERE Email = ?', [user],  async (error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].contrasenia))){
                res.render('login', {
                    alert: true,
                    alertTitle : "Error",
                    alertMessage: "Usuario y/o contraseña incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            }else{
                req.session.loggedin = true;
                req.session.name = results[0].Nombre;
                res.render('login', {
                    alert: true,
                    alertTitle : "Conexion exitosa!!",
                    alertMessage: "Inicio de sesión exitoso",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        })
    }else{
        res.render('login', {
            alert: true,
            alertTitle : "Avertencia!!",
            alertMessage: "Ingrese el campo de usuario y contraseña!!",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
    }
})


//12. Metodo de autenticacion de las demas paginas
app.get('/', (req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name
        })
    }else{
        res.render('index',{
            login: false,
            name:'Debe iniciar sesión'
        })
    }
})


//13. Cerrar sesión
app.get('/logout', (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
})


app.listen(3000, (req, res)=>{
    console.log('Servidor ejecutandose en http://localhost:3000');
})