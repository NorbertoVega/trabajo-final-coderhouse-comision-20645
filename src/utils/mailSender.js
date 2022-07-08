import { createTransport } from 'nodemailer';
import logger from '../logger/logger.js';
import config from '../../config.js';

export async function sendEmail(body, subjectString, email) {

   const transporter = createTransport({
      service: "gmail",
      port: 587,
      auth: {
         user: config.EMAIL_SENDER,
         pass: config.PASSWORD_EMAIL_SENDER,
      },
   });

   const mailOptions = {
      from: 'Servidor Node.js',
      to: email,
      subject: subjectString,
      html: body,
      attachments: []
   }

   try {
      const info = await transporter.sendMail(mailOptions)
      logger.info(`EmailSender: transporter.sendMail() response: ${info}`);
   }
   catch (error) {
      logger.error(`EmailSender: error al enviar email: ${error}`)
   }
}
