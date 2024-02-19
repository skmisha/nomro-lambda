"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
function sendEmail(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userEmail, subject, content, attachmentPath, } = args;
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
            },
        });
        const mailOptions = {
            from: 'webnumberify@gmail.com',
            to: [userEmail],
            subject: subject !== null && subject !== void 0 ? subject : 'Hello from WebNumberify',
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
    });
}
exports.sendEmail = sendEmail;
