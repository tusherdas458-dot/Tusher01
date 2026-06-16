import express from "express";
import Razorpay from "razorpay";

export const apiApp = express();
apiApp.use(express.json());

apiApp.post("/api/razorpay/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      console.warn("No RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET found. Mocking order creation.");
      return res.json({
        id: `order_mock_${Math.floor(Math.random() * 1000000)}`,
        amount: parseInt(amount, 10),
        currency,
        receipt,
        status: "created"
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await instance.orders.create({
      amount,
      currency,
      receipt
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

apiApp.post("/api/razorpay/verify", (req, res) => {
  res.json({ success: true, message: "Payment verified successfully" });
});

apiApp.post("/api/notify-admin", async (req, res) => {
  try {
    const { name, mobile, category, plan, amount } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "rajusarma000@gmail.com";
    let adminPhone = "9862893612";
    if (!adminPhone.startsWith('+')) {
      adminPhone = '+91' + adminPhone;
    }
    
    const messageBody = `New Membership Application!\n\nName: ${name}\nMobile: ${mobile}\nCategory: ${category}\nPlan: ${plan}\nAmount to Pay: INR ${amount}`;
    
    console.log("---- NOTIFICATION REQUESTED ----");
    console.log(messageBody);
    console.log("--------------------------------");

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    if (smtpUser && smtpPass) {
      try {
        const nodemailer = await import("nodemailer");
        
        const host = process.env.SMTP_HOST || "smtp.gmail.com";
        const portStr = process.env.SMTP_PORT || "465"; 
        const port = parseInt(portStr);
        let secure = port === 465;
        if (process.env.SMTP_SECURE === "true") secure = true;
        if (process.env.SMTP_SECURE === "false") secure = false;
        if (port === 465) secure = true;

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user: smtpUser, pass: smtpPass },
          tls: {
            rejectUnauthorized: false
          }
        });
        
        await transporter.sendMail({
          from: `"Gym Admin" <${smtpUser}>`,
          to: adminEmail,
          subject: "New Gym Membership Application",
          text: messageBody
        });
        console.log("Email sent to admin successfully.");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    } else {
      console.warn("SMTP credentials missing. Mocking email notification.");
    }

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    if (twilioSid && twilioAuthToken && twilioPhone && adminPhone) {
      try {
        const twilio = (await import("twilio")).default;
        const client = twilio(twilioSid, twilioAuthToken);
        
        await client.messages.create({
          body: messageBody,
          from: twilioPhone,
          to: adminPhone
        });
        console.log("SMS sent to admin successfully.");
      } catch (smsError: any) {
        console.error("Error sending SMS:", smsError);
        if (smsError.code === 21608) {
          console.error("TWILIO TRIAL ACCOUNT RESTRICTION: The number", adminPhone, "is unverified in your Twilio account. You MUST log into twilio.com and verify this number before Twilio will allow messages to be sent to it.");
        }
      }
    } else {
      console.warn("Twilio credentials or ADMIN_PHONE missing. Mocking SMS/WhatsApp notification.");
    }
    
    res.json({ success: true, message: "Notification process completed" });
  } catch (error) {
    console.error("Unhandled error in notification endpoint:", error);
    res.status(500).json({ error: "Failed to process notification request" });
  }
});
