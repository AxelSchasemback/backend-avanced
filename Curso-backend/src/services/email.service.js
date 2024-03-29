import nodemailer from 'nodemailer'
import { EMAIL_USER, EMAIL_PASSWORD } from '../config/config.js'

const transport = nodemailer.createTransport({
    service: 'hotmail',
    port: 587,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
})

class EmailService {

    async send(destinatario, asunto, mensaje) {

        const emailOptions = {
            from: EMAIL_USER,
            to: destinatario,
            subject: asunto,
            amp: mensaje,
            html: mensaje
        }

        await transport.sendMail(emailOptions)
    }

}

export const emailServices = new EmailService