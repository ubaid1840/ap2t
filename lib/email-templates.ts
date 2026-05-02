import pool from "./db";
import { sendSingleEmail } from "./notification-service";


export const sendPaymentReceiptEmail = async ({
  email,
  fullName,
  amount,
  paymentId,
  sessionName,
  paymentDate,
}: {
  email: string,
  fullName: string,
  amount: string,
  paymentId: string,
  sessionName: string,
  paymentDate: string,
}): Promise<void> => {
  const subject = "Payment Receipt – Advanced Physical and Technical Training";

  const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Payment Receipt</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">
      
      <h2>Payment Successful ✅</h2>

      <p style="font-size:16px; line-height:1.6;">
        Hi ${fullName},
      </p>

      <p style="font-size:16px; line-height:1.6;">
        Thank you for your payment. Below are your transaction details:
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">Session</td>
          <td style="padding:8px;">${sessionName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Amount Paid</td>
          <td style="padding:8px;">${amount}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Payment ID</td>
          <td style="padding:8px;">${paymentId}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Date</td>
          <td style="padding:8px;">${paymentDate}</td>
        </tr>
      </table>

      <p style="margin-top:24px; font-size:16px;">
        Your session has been successfully confirmed. We look forward to training with you!
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        — Advanced Physical and Technical Training Team
      </p>
    </div>
  </body>
</html>
`;

  await sendSingleEmail(message, subject, email);
 
};

export const sendAdminPaymentNotificationEmail = async ({

  adminEmail,
  fullName,
  userEmail,
  amount,
  paymentId,
  sessionName,
  paymentMethod = "Online",
  paymentDate,
}: {
  adminEmail: string,
  fullName: string,
  userEmail: string,
  amount: string,
  paymentId: string,
  sessionName: string,
  paymentMethod: string,
  paymentDate: string,

}): Promise<void> => {
   const subject = "New Payment Received – Advanced Physical and Technical Training";

  const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Payment Received</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">

      <h2>Payment Received 💰</h2>

      <p style="font-size:16px; line-height:1.6;">
        A new payment has been successfully processed on 
        <strong>Advanced Physical and Technical Training</strong>.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">User Name</td>
          <td style="padding:8px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">User Email</td>
          <td style="padding:8px;">${userEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Session</td>
          <td style="padding:8px;">${sessionName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Amount Paid</td>
          <td style="padding:8px;">${amount}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Payment Method</td>
          <td style="padding:8px;">${paymentMethod}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Payment ID</td>
          <td style="padding:8px;">${paymentId}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Date</td>
          <td style="padding:8px;">${paymentDate}</td>
        </tr>
      </table>

      <p style="margin-top:24px; font-size:16px;">
        You can review this transaction and manage related sessions from the admin dashboard.
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        — System Notification<br/>
        Advanced Physical and Technical Training
      </p>

    </div>
  </body>
</html>
`;

  await sendSingleEmail(message, subject, adminEmail);

  
};

export const sendAdminSessionEnrollmentEmail = async ({
  fullName,
  userEmail,
  sessionName,
  coachName = "Not Assigned",
  sessionDate = "To Be Confirmed",
  enrollmentDate = new Date().toLocaleString(),
}: {
  fullName: string;
  userEmail: string;
  sessionName: string;
  coachName?: string;
  sessionDate?: string;
  enrollmentDate?: string;
}): Promise<void> => {

  try {



    const subject =
      "New Session Enrollment – Advanced Physical and Technical Training";

    const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New Session Enrollment</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">

      <h2>New Enrollment 📌</h2>

      <p style="font-size:16px; line-height:1.6;">
        A user has enrolled in a session on 
        <strong>Advanced Physical and Technical Training</strong>.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">User Name</td>
          <td style="padding:8px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">User Email</td>
          <td style="padding:8px;">${userEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Session</td>
          <td style="padding:8px;">${sessionName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Coach</td>
          <td style="padding:8px;">${coachName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Session Date</td>
          <td style="padding:8px;">${sessionDate}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Enrollment Date</td>
          <td style="padding:8px;">${enrollmentDate}</td>
        </tr>
      </table>

      <p style="margin-top:24px; font-size:16px;">
        You may review participant limits and manage this session from the admin dashboard.
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        — System Notification<br/>
        Advanced Physical and Technical Training
      </p>

    </div>
  </body>
</html>
`;


    const allAdmins = await fetchAllAdmins()

    await Promise.all(
      allAdmins.map(admin => {
        if (admin.new_booking) {
          return sendSingleEmail(message, subject, admin.email).catch(err => console.log(err))
        }
      }
      )
    );

  } catch (error) {
    console.log(error)
  }

};

export const sendCoachPlayerEnrollmentEmail = async ({
  coachEmail,
  coachName,
  playerName,
  playerEmail,
  sessionName,
  sessionDate = "To Be Confirmed",
  enrollmentDate = new Date().toLocaleString(),
}: {
  coachEmail: string;
  coachName: string;
  playerName: string;
  playerEmail: string;
  sessionName: string;
  sessionDate?: string;
  enrollmentDate?: string;
}): Promise<void> => {

  try {

    const subject = "New Player Enrolled in Your Session";

    const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Player Enrollment Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">

      <h2>New Player Enrolled ⚽</h2>

      <p style="font-size:16px; line-height:1.6;">
        Hello <strong>${coachName}</strong>,
      </p>

      <p style="font-size:16px; line-height:1.6;">
        A new player has enrolled in your session 
        <strong>${sessionName}</strong>.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">Player Name</td>
          <td style="padding:8px;">${playerName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Player Email</td>
          <td style="padding:8px;">${playerEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Session</td>
          <td style="padding:8px;">${sessionName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Session Date</td>
          <td style="padding:8px;">${sessionDate}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Enrollment Date</td>
          <td style="padding:8px;">${enrollmentDate}</td>
        </tr>
      </table>

      <p style="margin-top:24px; font-size:16px;">
        Please keep track of your session capacity and prepare accordingly.
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        — System Notification<br/>
        Advanced Physical and Technical Training
      </p>

    </div>
  </body>
</html>
`;

    await sendSingleEmail(message, subject, coachEmail);
  } catch (error) {
    console.log(error)
  }

};

export async function fetchAllAdmins() {

  const admins = await pool.query(`
  SELECT 
  u.id AS user_id,
  u.email,
  s.new_booking,
  s.payment_receive,
  s.session_cancel,
  s.promotion_purchase,
  s.email_notification,
  s.sms_notification
FROM users u
JOIN settings s ON s.user_id = u.id
WHERE u.role = 'admin';`)

  const allAdmins = admins.rows
  return allAdmins
}
