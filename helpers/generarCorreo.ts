import { transporter, mailOptions } from '../config/email';

export const generarCorreo = async (destinatario: string, asunto: string, cuerpo: string): Promise<void> => {
  try {
    // Enviar el correo electrónico usando el transporter configurado
    await transporter.sendMail(mailOptions(destinatario, asunto, cuerpo));
    console.log(`Correo enviado a ${destinatario} con asunto: ${asunto}`);
  } catch (error) {
    console.error(`Error enviando correo a ${destinatario}:`, error);
    throw new Error('Error enviando correo');
  }
};


