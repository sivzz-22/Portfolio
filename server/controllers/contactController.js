import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

/**
 * Configure Nodemailer transporter if email credentials are in .env
 */
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
  const pass = rawPass ? rawPass.replace(/\s+/g, '') : null;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
};

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least a name and message.',
      });
    }

    const senderEmail = email && email.trim() ? email.trim() : 'quick-signal@portfolio.local';

    let savedContact = null;

    // 1. Check if MongoDB is connected (readyState === 1) and save
    if (mongoose.connection.readyState === 1) {
      savedContact = await Contact.create({
        name,
        email: senderEmail,
        message,
      });
      console.log(`📨 New contact inquiry saved to MongoDB: ${name} (${senderEmail})`);
    } else {
      console.log('📬 [Mock DB Log] Contact Inquiry Received:');
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${senderEmail}`);
      console.log(`   Message: ${message}`);
      console.log(`   Time: ${new Date().toISOString()}`);
    }

    // 2. Attempt email notification via Nodemailer
    const transporter = createTransporter();
    let emailSent = false;
    let emailError = null;

    if (transporter) {
      try {
        const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER || 'sivasaravanakumarm@gmail.com';
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: recipient,
          replyTo: senderEmail !== 'quick-signal@portfolio.local' ? senderEmail : undefined,
          subject: `🕷️ Portfolio Inquiry from ${name}`,
          text: `You received a new inquiry from your portfolio website!\n\nName: ${name}\nEmail: ${senderEmail}\nMessage:\n${message}\n\nTime: ${new Date().toLocaleString()}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #e61a22; margin-top: 0;">🕷️ New Portfolio Message</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
              <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #1266f1; border-radius: 4px; margin: 20px 0;">
                <p style="margin: 0; white-space: pre-wrap; font-size: 15px; color: #1e293b;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #94a3b8; margin-bottom: 0;">Sent at: ${new Date().toLocaleString()}</p>
            </div>
          `,
        });
        emailSent = true;
        console.log(`📧 Email dispatched successfully to: ${recipient}`);
      } catch (mailErr) {
        emailError = mailErr.message;
        console.error('⚠️ Could not send email notification via Nodemailer:', mailErr.message);
      }
    } else {
      emailError = 'EMAIL_CREDENTIALS_MISSING: EMAIL_USER or EMAIL_PASS not found in server environment variables.';
      console.log('ℹ️ Email dispatch skipped: EMAIL_USER and EMAIL_PASS not in environment variables.');
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received successfully!',
      savedToDB: mongoose.connection.readyState === 1,
      emailSent,
      emailError: emailSent ? null : emailError,
      data: savedContact ? { id: savedContact._id, name: savedContact.name, createdAt: savedContact.createdAt } : null,
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message.',
    });
  }
};
