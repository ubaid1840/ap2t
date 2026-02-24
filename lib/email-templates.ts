import { sendSingleEmail } from "./notification-service";



export const sendNewJoiningEmail = async ({ email, fullName }: { email: string, fullName: string }): Promise<void> => {
  const subject = "Your Account Has Been Created – Advanced Physical and Technical Training";

  const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Account Created</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">
      
      <h2>Welcome, ${fullName} 👋</h2>

      <p style="font-size:16px; line-height:1.6;">
        Your account has been successfully created on 
        <strong>Advanced Physical and Technical Training</strong>.
      </p>

      <p style="font-size:16px; line-height:1.6;">
        You can now log in, manage your sessions, and access all features available to you.
      </p>

      <p style="margin-top:24px; font-size:16px;">
        If you have any questions, feel free to reach out to our support team.
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

export const sendWelcomeEmail = async ({ email, fullName }: { email: string, fullName: string }): Promise<void> => {
  const subject = "Welcome to Advanced Physical and Technical Training 🎉";

  const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">
      
      <h2>Welcome to the Team, ${fullName}! 🚀</h2>

      <p style="font-size:16px; line-height:1.6;">
        We’re excited to have you at 
        <strong>Advanced Physical and Technical Training</strong>.
      </p>

      <p style="font-size:16px; line-height:1.6;">
        Our platform is designed to help you improve performance, track progress, 
        and get the most out of your training sessions.
      </p>

      <p style="font-size:16px; line-height:1.6;">
        Log in anytime to view your schedule, sessions, and updates.
      </p>

      <p style="margin-top:30px; font-size:16px; font-weight:bold;">
        Let’s grow stronger together 💪
      </p>

      <p style="font-size:16px; font-weight:bold;">
        — Advanced Physical and Technical Training Team
      </p>
    </div>
  </body>
</html>
`;

  await sendSingleEmail(message, subject, email);
};

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
}) : Promise<void> => {
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

export const sendAdminNewSignupEmail = async ({
  adminEmail,
  fullName,
  userEmail,
  role = "User",
  signupDate,
}: {
  adminEmail: string,
  fullName: string,
  userEmail: string,
  role: string,
  signupDate: string,
}) : Promise<void> => {
  const subject = "New User Signup – Advanced Physical and Technical Training";

  const message = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>New User Signup</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#111827;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:30px;border-radius:8px;">

      <h2>New User Joined 🚀</h2>

      <p style="font-size:16px; line-height:1.6;">
        A new user has successfully signed up on 
        <strong>Advanced Physical and Technical Training</strong>.
      </p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:8px; font-weight:bold;">Full Name</td>
          <td style="padding:8px;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Email</td>
          <td style="padding:8px;">${userEmail}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Role</td>
          <td style="padding:8px;">${role}</td>
        </tr>
        <tr>
          <td style="padding:8px; font-weight:bold;">Signup Date</td>
          <td style="padding:8px;">${signupDate}</td>
        </tr>
      </table>

      <p style="margin-top:24px; font-size:16px;">
        You may review this user, assign sessions, or take any required action from the admin panel.
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

}) : Promise<void> => {
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
  adminEmail,
  fullName,
  userEmail,
  sessionName,
  coachName = "Not Assigned",
  sessionDate = "To Be Confirmed",
  enrollmentDate = new Date().toLocaleString(),
}: {
  adminEmail: string;
  fullName: string;
  userEmail: string;
  sessionName: string;
  coachName?: string;
  sessionDate?: string;
  enrollmentDate?: string;
}): Promise<void> => {
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

  await sendSingleEmail(message, subject, adminEmail);
};