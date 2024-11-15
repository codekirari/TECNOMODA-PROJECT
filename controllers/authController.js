// # Controlador de autenticación

import bcryptjs from "bcryptjs";
import { enviarMailVerificacion } from "./mail.services.js";

const usuarios = []; // Definir el array de usuarios, si no está definido en otro lugar.

async function register(req, res) {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
    }

    // Encriptado de contraseña 
    const salt = await bcryptjs.genSalt(5);
    const hashpassword = await bcryptjs.hash(password, salt);

    const nuevoUsuario = {
        user, 
        email, 
        password: hashpassword
    };

    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);

    // Enviar el mail de verificación al cliente 
    try {
        await enviarMailVerificacion(email, "TOKEN DE PRUEBA");
        res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.user} agregado`, redirect: "/" });
    } catch (error) {
        res.status(500).send({ status: "Error", message: "Error al enviar el correo de verificación" });
    }
}

export { register };
