import nodemailer from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import pool from './db';


const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const transporter = nodemailer.createTransport({
  host: process.env.BULK_EMAIL_HOST,
  port: process.env.BULK_EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.BULK_EMAIL_USER,
    pass: process.env.BULK_EMAIL_PASSWORD,
  },
} as SMTPConnection.Options);




export const sendSingleEmail = async (message: string, subject: string, email: string) => {
  try {

    if (email) {
      await transporter.sendMail({
        from: process.env.BULK_EMAIL_USER,
        to: email,
        subject,
        text: message.replace(/<[^>]+>/g, ''),
        html: message,
      });

      console.log(`Email sent successfully to ${email}`);
    } else {
      throw new Error(`email missing`);
    }
  } catch (error: any) {
    throw new Error(error?.message || "Error sending email");
  }
};

export const sendSignupEmail = async (email: string , password : string) => {

  if(!email || !password) return

  const subject = ""
  const htmlMessage = ""

  try {
    await sendSingleEmail(htmlMessage, subject, email)
  } catch (error : any) {
    throw new Error(error?.message);
  }
};


export const sendSingleSMS = async (message: string, id: string | number) => {
  try {
    const usersQuery = await pool.query('SELECT phone_no FROM users WHERE id = $1 LIMIT 1', [id]);
    const user = usersQuery.rows[0];

    if (user?.phone) {
      const response = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone,
      })


    } else {
      console.log(`User with id ${id} not found or missing phone.`);
    }
  } catch (error) {
    console.log('Error in sending sms:', error);
  }
};

// export const sendNotification = async (title: string, page: string, sendTo: string) => {
//   try {
//     const TimeStamp = moment().valueOf()

//     const notification = {
//       TimeStamp,
//       page,
//       read: false,
//       title,
//       sendTo
//     }

//     const db = admin.firestore()
//     const docRef = db.collection("user-notification").doc()
//     await docRef.set(notification)

//   } catch (error: any) {
//     console.log("Error sending notification:", error?.message)
//   }
// }


