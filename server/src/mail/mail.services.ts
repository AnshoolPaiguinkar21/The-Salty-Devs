import { AppError } from '@utils/appError.ts';
import { transporter } from './mail.config.ts';
import { HttpStatusCodes } from '@utils/httpStatusCodes.ts';
// The original imports and sendWelcomeEmail function should remain here
// ... (existing code for transporter and sendWelcomeEmail)

/**
 * Sends a welcome email to a newly registered user.
 * This is designed as 'fire-and-forget' so user registration isn't blocked 
 * if the email service is slow or fails. Errors are logged but not re-thrown.
 * * @param toEmail The recipient's email address.
 * @param userName The recipient's name for personalization.
 */
export const sendWelcomeEmail = async (toEmail: string, userName: string | null): Promise<void> => {
    
    const recipientName = userName || 'Valued User';

    const htmlContent = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; margin: auto;">
            <h2 style="color: #333;">Welcome to the Platform, ${recipientName}!</h2>
            <p style="color: #555; line-height: 1.6;">
                Thank you for joining our community. We are excited to have you on board.
                You can now log in and start engaging with the latest posts!
            </p>
            <a href="#" style="display: inline-block; padding: 10px 20px; margin-top: 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Go to the App
            </a>
            <p style="color: #888; font-size: 0.9em; margin-top: 30px;">
                This email was sent automatically. Please do not reply.
            </p>
        </div>
    `;

    const mailOptions = {
        from: process.env.MAIL_USER, // Sender address from environment variable
        to: toEmail,
        subject: `Welcome to the Platform, ${recipientName}!`,
        text: `Welcome to the Platform, ${recipientName}! Thank you for registering.`,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email Service] Welcome email sent to ${toEmail}. Message ID: ${info.messageId}`);
    } catch (error) {
        console.error(`[Email Service] FAILED to send welcome email to ${toEmail}:`, error);
    }
};


/**
 * Sends the OTP for registration verification.
 * @param toEmail - The recipient's email.
 * @param otp - The generated One-Time Password.
 */
export const sendOtpEmail = async (toEmail: string, otp: string): Promise<void> => {
    const htmlContent = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; margin: auto;">
            <h2 style="color: #333;">OTP Verification</h2>
            <p style="color: #555; line-height: 1.6;">
                Please use the following One-Time Password (OTP) to complete your registration:
            </p>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
                <strong>${otp}</strong>
            </div>
            <p style="color: #888; font-size: 0.9em;">
                This code will expire in 10 minutes. Do not share this code with anyone.
            </p>
            <p style="color: #888; font-size: 0.9em; margin-top: 30px;">
                If you did not request this, you can safely ignore this email.
            </p>
        </div>
    `;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: toEmail,
        subject: 'Your One-Time Password (OTP) for Registration',
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email Service] OTP email sent successfully to ${toEmail}.`);
    } catch (error) {
        console.error(`[Email Service] FAILED to send OTP email to ${toEmail}:`, error);
        throw new AppError('Could not send OTP email. Please try again.', HttpStatusCodes.SERVICE_UNAVAILABLE);
    }
};
