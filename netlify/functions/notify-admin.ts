import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, mobile, category, plan, amount } = body;
    
    // Fallback to the requested values
    const adminEmail = process.env.ADMIN_EMAIL || "rajusarma000@gmail.com";
    let adminPhone = "9862893612"; 
    if (!adminPhone.startsWith('+')) {
      adminPhone = '+91' + adminPhone;
    }

    const messageBody = `New Membership Application!\n\nName: ${name}\nMobile: ${mobile}\nCategory: ${category}\nPlan: ${plan}\nAmount to Pay: INR ${amount}`;
    
    // 1. Email notification
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
      await transporter.sendMail({
        from: smtpUser,
        to: adminEmail,
        subject: 'New Gym Membership Application',
        text: messageBody
      });
      console.log("Email sent successfully via Netlify Function");
    }

    // 2. Twilio SMS notification
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    if (twilioSid && twilioAuthToken && twilioPhone) {
      const client = twilio(twilioSid, twilioAuthToken);
      
      await client.messages.create({
        body: messageBody,
        from: twilioPhone,
        to: adminPhone
      });
      console.log("SMS sent successfully via Netlify Function");
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Notification sent successfully." })
    };
  } catch (error: any) {
    console.error("Netlify Function Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: "Failed to send notification." })
    };
  }
};
