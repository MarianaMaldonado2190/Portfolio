require('dotenv').config(); // al principio del archivo

const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura el transporte de Nodemailer con tu Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta para recibir el formulario
app.post("/enviar-formulario", (req, res) => {
  const { nombre, email, proyecto, mensaje } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nueva propuesta de ${nombre}`,
    text: `Proyecto: ${proyecto}\n\nMensaje:\n${mensaje}\n\nContacto: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error al enviar el correo");
    }
    res.status(200).send("Correo enviado correctamente");
  });
});

// Servidor en puerto 3000
app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
