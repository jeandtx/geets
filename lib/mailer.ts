import nodemailer from 'nodemailer';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { updateUser } from './data/user';
import { ObjectId } from 'mongodb';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashed token
        const hashedToken = hashSync(userId.toString(), genSaltSync(10));

        // Convert userId to ObjectId if it's not already one
        // const userObjectId = new ObjectId(userId);

        if (emailType === 'verify') {
            await updateUser({
                _id: userId,
                verificationToken: hashedToken,
                verificationTokenExpires: new Date(Date.now() + 3600000) // 1 hour expiration
            });
        } else if (emailType === 'reset') {
            await updateUser({
                _id: userId,
                resetToken: hashedToken,
                resetTokenExpires: new Date(Date.now() + 3600000) // 1 hour expiration
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER, 
                pass: process.env.GMAIL_PASS, 
            },
        });


        const mailOptions = {
            from: 'contact.app.laruche@gmail.com',
            to: email,
            subject: emailType === 'verify' ? 'LaRuche - Email Verification' : 'LaRuche - Password Reset',
            html: emailType === 'verify' 
                ? `<p>Click <a href="http://localhost:3000/api/verifyemail?token=${hashedToken}">here</a> to verify your email</p>`
                : `<p>Click <a href="http://localhost:3000/api/resetpassword?token=${hashedToken}">here</a> to reset your password</p>`
        };


        const mailresponse = await transporter.sendMail(mailOptions);

        return mailresponse;
    } catch (error: any) {
        console.error("Error in sendEmail function:", error.message);
        throw new Error(error.message);
    }
};
