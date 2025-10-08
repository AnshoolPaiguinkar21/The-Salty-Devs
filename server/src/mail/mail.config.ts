import config from 'constants/config.ts';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

export const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: config.MAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
  // Required for development phase
  tls: {
    rejectUnauthorized: false,
  },
}as SMTPTransport.Options) ;
