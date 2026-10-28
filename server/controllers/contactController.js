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
 * Send email notification using HTTP APIs (Resend / Web3Forms) which work on Render Free Tier (Port 443),
 * with fallback to Nodemailer SMTP for environments that allow SMTP ports.
 */
const sendEmailNotification = async ({ name, senderEmail, message }) => {
  const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER || 'sivasaravanakumarm@gmail.com';

  // 1. Web3Forms HTTP API (Port 443 - Works on Render Free Tier, zero-setup key)
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: name,
          email: senderEmail,
          subject: `🕷️ Portfolio Inquiry from ${name}`,
          message: message,
          from_name: `Portfolio Contact (${name})`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(`📧 Email dispatched via Web3Forms (HTTP 443) to: ${recipient}`);
        return { sent: true, method: 'web3forms' };
      } else {
        throw new Error(data.message || 'Web3Forms dispatch failed');
      }
    } catch (err) {
      console.error('⚠️ Web3Forms error:', err.message);
      return { sent: false, error: err.message, method: 'web3forms' };
    }
  }

  // 2. Resend HTTP API (Port 443 - Works on Render Free Tier)
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Portfolio <onboarding@resend.dev>',
          to: [recipient],
          reply_to: senderEmail !== 'quick-signal@portfolio.local' ? senderEmail : undefined,
          subject: `🕷️ Portfolio Inquiry from ${name}`,
          text: `New Portfolio Message!\n\nName: ${name}\nEmail: ${senderEmail}\nMessage:\n${message}`,
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
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(`📧 Email dispatched via Resend (HTTP 443) to: ${recipient}`);
        return { sent: true, method: 'resend' };
      } else {
        throw new Error(data.message || 'Resend dispatch failed');
      }
    } catch (err) {
      console.error('⚠️ Resend error:', err.message);
      return { sent: false, error: err.message, method: 'resend' };
    }
  }

  // 3. Fallback: Nodemailer SMTP (Works on local dev; blocked by Render free firewall)
  const transporter = createTransporter();
  if (transporter) {
    try {
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
      console.log(`📧 Email dispatched successfully via Nodemailer to: ${recipient}`);
      return { sent: true, method: 'nodemailer' };
    } catch (mailErr) {
      console.error('⚠️ Nodemailer SMTP failed (Render Free Tier blocks outbound SMTP ports 25/465/587):', mailErr.message);
      return { sent: false, error: mailErr.message, method: 'nodemailer' };
    }
  }

  return { sent: false, error: 'NO_EMAIL_SERVICE_CONFIGURED', method: 'none' };
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

    // 2. Dispatch email notification (HTTP-based on Render, SMTP fallback on local)
    const emailResult = await sendEmailNotification({ name, senderEmail, message });

    return res.status(200).json({
      success: true,
      message: 'Your message has been received successfully!',
      savedToDB: mongoose.connection.readyState === 1,
      emailSent: emailResult.sent,
      emailMethod: emailResult.method,
      emailError: emailResult.sent ? null : emailResult.error,
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
