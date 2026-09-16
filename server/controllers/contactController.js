import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Check if MongoDB is connected (readyState === 1)
    if (mongoose.connection.readyState === 1) {
      const newContact = await Contact.create({
        name,
        email,
        message,
      });

      console.log(`📨 New contact inquiry saved to DB from: ${name} (${email})`);

      return res.status(201).json({
        success: true,
        message: 'Your message has been received successfully!',
        data: {
          id: newContact._id,
          name: newContact.name,
          createdAt: newContact.createdAt,
        },
      });
    } else {
      // Graceful fallback when MongoDB is not connected
      console.log('📬 [Local/Mock DB Log] Contact Inquiry Received:');
      console.log(`   Name: ${name}`);
      console.log(`   Email: ${email}`);
      console.log(`   Message: ${message}`);
      console.log(`   Time: ${new Date().toISOString()}`);

      return res.status(200).json({
        success: true,
        message: 'Message received! (Logged by server).',
        savedToDB: false,
      });
    }
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your message.',
    });
  }
};
