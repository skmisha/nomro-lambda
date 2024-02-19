import nodemailer from 'nodemailer';
import 'dotenv/config';
import {EmailSender} from "../types";

export async function sendEmail(args: EmailSender) {
    const {
        userEmail,
        subject,
        content,
        attachmentPath,
    } = args;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "login",
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'webnumberify@gmail.com',
        to: [userEmail],
        subject: subject ?? 'Hello from WebNumberify',
        text: content,
        attachments: [
            // {
            //     filename: 'file.txt',
            //     content: 'Attachment content as a string or Buffer',
            // },
            {
                path: attachmentPath,
            },
        ],
    };

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            console.log('Email sent:', JSON.stringify(info));
        })
        .catch((error) => {
            console.error('Error sending email', error);
        });
}