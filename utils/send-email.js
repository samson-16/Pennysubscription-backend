import dayjs from 'dayjs';
import { accountEmail, transporter } from '../config/nodemailer.js';
import {emailTemplate} from './email-template.js';


export const sendReminderEmail = async ({to, type, subscription}) => {
    if(!to || !type || !subscription){
        throw new Error("Missing required fields to send email")
    }

    const template = emailTemplate.find(t => t.type === type);
    if(!template){
        throw new Error(`No email template found for type ${type}`)
    }

    const mailInfo ={
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`
    }


    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to,

        subject,
        html: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });


}