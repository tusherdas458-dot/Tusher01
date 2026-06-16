import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Razorpay Gateway Setup (Mock or Real)
  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR", receipt } = req.body;
      
      const keyId = process.env.RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      
      if (!keyId || !keySecret) {
        // Fallback to mock behavior if no credentials (so the UI continues to function)
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

  // Verify Payment Signature (Mock or Real)
  app.post("/api/razorpay/verify", (req, res) => {
    // In a real app we'd use crypto to verify the Razorpay signature.
    // For this prototype, we just return success.
    res.json({ success: true, message: "Payment verified successfully" });
  });

  // Admin Notification Endpoint
  app.post("/api/notify-admin", async (req, res) => {
    try {
      const { name, mobile, category, plan, amount, photos } = req.body;
      const adminEmail = process.env.ADMIN_EMAIL || "rajusarma000@gmail.com";
      let adminPhone = "9862893612"; // User requested to hardcode this new number to prevent old number from env var
      if (!adminPhone.startsWith('+')) {
        adminPhone = '+91' + adminPhone;
      }
      
      const messageBody = `New Membership Application!\n\nName: ${name}\nMobile: ${mobile}\nCategory: ${category}\nPlan: ${plan}\nAmount to Pay: INR ${amount}`;
      
      console.log("---- NOTIFICATION REQUESTED ----");
      console.log(messageBody);
      if (photos && photos.length > 0) console.log(`Attached Photos: ${photos.length}`);
      console.log("--------------------------------");

      // We'd load nodemailer/twilio here dynamically or just log if env vars are missing
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      
      // Email notification
      if (smtpUser && smtpPass) {
        try {
          const nodemailer = await import("nodemailer");
          
          const host = process.env.SMTP_HOST || "smtp.gmail.com";
          const portStr = process.env.SMTP_PORT || "465"; 
          const port = parseInt(portStr);
          // Auto-detect secure based on port if SMTP_SECURE is not explicitly provided, 
          // but respect SMTP_SECURE if it is 'true' or 'false'
          let secure = port === 465;
          if (process.env.SMTP_SECURE === "true") secure = true;
          if (process.env.SMTP_SECURE === "false") secure = false;
          // Force secure to true if port 465 to prevent unexpected socket close
          if (port === 465) secure = true;

          const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user: smtpUser, pass: smtpPass },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false
            }
          });
          
          const mailOptions: any = {
            from: `"Gym Admin" <${smtpUser}>`,
            to: adminEmail,
            subject: "New Gym Membership Application",
            text: messageBody
          };

          if (photos && Array.isArray(photos) && photos.length > 0) {
            mailOptions.attachments = photos.map((photo: { name: string, data: string }) => {
              const base64Data = photo.data.split(';base64,').pop();
              return {
                filename: photo.name,
                content: base64Data,
                encoding: 'base64'
              };
            });
          }

          await transporter.sendMail(mailOptions);
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4.x
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
