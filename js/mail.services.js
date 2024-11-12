import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function enviarMailVerificacion(direccion,token) {
    transporter.sendMail({
        form:"Felipe Diaz <pipe.diazn@gmail.com>",
        to:direccion,
        subject:"Verificacion de la nueva cuenta - Felipe Diaz",
        html:"crearMailVerificacion(token)"
    })
}

function crearMailVerificacion(token){
    return '
     <!Doctipe html>
    <html lang="es">
        <style>
            html{
                background-color: white;
            }
            body{
                max-width: 600px;
                from-family: 'segoe UI', tahoma, geneva, verdama, sans-serif;
                margin: auto;
                background-color: rgb(299, 255, 246)
                padding: 40px;
                border-radius: 4px;
                margin-top: 10px;
            }
        </style>
    <body> 
        <h1>verificacion de correo electronico - pipe.diazn@gmail.com</h1>
        <p>se ha creado una cuenta en pipe.diazn@gmail.com con este correo electronico</p>
            <p>si esta cuenta no fue creada por usted, desestiem este correo</p>
            <p></p>si usted creo la cuenta, entonces verifique la cuenta <a href="http://"target="_blank" rel="noopener noreferrer">
            <p><strong>calo</strong></p>
            <p>CEO Felipe Diaz.</p>
    </body>
    </html>
}
