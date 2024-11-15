//Funcion de envio de correos con node
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
        html:crearMailVerificacion(token)
    })
}
//Envio de token para correo de verificacion 
function crearMailVerificacion(token) {
    return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificación de correo electrónico</title>
            <style>
                html {
                    background-color: white;
                }
                body {
                    max-width: 600px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: auto;
                    background-color: rgb(239, 255, 246);
                    padding: 40px;
                    border-radius: 4px;
                    margin-top: 10px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #555;
                }
            </style>
        </head>
        <body>
            <h1>Verificación de correo electrónico - pipe.diazn@gmail.com</h1>
            <p>Se ha creado una cuenta en pipe.diazn@gmail.com con este correo electrónico.</p>
            <p>Si esta cuenta no fue creada por usted, desestime este correo.</p>
            <p>Si usted creó la cuenta, por favor verifique la cuenta haciendo clic en el siguiente enlace:</p>
            <p><a href="http://mi-sitio.com/verificar?token=${token}" target="_blank" rel="noopener noreferrer">Verificar cuenta</a></p>
            <p><strong>Saludos,</strong></p>
            <p>CEO Felipe Diaz.</p>
        </body>
    </html>`;
}


