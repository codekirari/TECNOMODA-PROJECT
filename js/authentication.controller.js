import { enviarMailVerificacion } from "./mail.services.js"

async function register(req,res) {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if (!user || !password || !email){
        return res.status(400).send({status:"Error",message:"Los campos estan incompletos"})
    } 
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar){
        return res.status(400).send({status:"Error", message:"Este usuario ya existe"})
    }
    const salt = await bcryptjs.gensalt(5);
    const hashpassword = await bcryptjs.hash(password,salt);
}

// Enviar el mail de verificacion al cliente 
const mail = await enviarMailVerificacion(email,"TOKEN DE PRUEBA") 
