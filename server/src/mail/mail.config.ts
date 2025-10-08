import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: '',
  port: '',
  secure: '', // true for 465, false for other ports
  auth: {
    user: '',
    pass: '',
  },
  // Required for development phase
  tls: {
    rejectUnauthorized: false,
  },
} );
