// import nodemailer from 'nodemailer';

// // Configurar el servicio de correo (por ejemplo, usando Gmail)
// export const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Tu email
//     pass: process.env.EMAIL_PASS, // Tu contraseña
//   },
// });

// // Opciones predeterminadas para el correo electrónico
// export const mailOptions = (to: string, subject: string, html: string) => ({
//   from: process.env.EMAIL_USER,
//   to,
//   subject,
//   html,
// });

import nodemailer from 'nodemailer';

// Configurar el servicio de correo usando los datos de NinjaHosting
export const transporter = nodemailer.createTransport({
  host: 'mail.agendafree.cl', // Servidor SMTP de NinjaHosting
  port: 587, // Puerto para conexión TLS
  secure: false, // true para 465, false para otros puertos como 587
  auth: {
    user: 'info@agendafree.cl', // Correo de NinjaHosting
    pass: process.env.EMAIL_PASS, // La contraseña
  },
  tls: {
    rejectUnauthorized: false, // Permitir certificados no verificados
  },
});

// Opciones predeterminadas para el correo electrónico
export const mailOptions = (to: string, subject: string, html: string) => ({
  from: 'info@agendafree.cl', // El correo remitente
  to,
  subject,
  html,
});
