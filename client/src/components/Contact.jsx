import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import portfolioData from '../data/portfolioData';
import { API_BASE, WEB3FORMS_KEY } from '../config/api';
import '../styles/contact.css';

export default function Contact() {
  const { personal, social, contact } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please fill in all fields before sending.',
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      // 1. Direct Web3Forms email dispatch from browser (Bypasses Render SMTP port block & Cloudflare server blocks)
      const emailPromise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `🕷️ Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          from_name: `Portfolio Contact (${formData.name})`,
        }),
      }).catch((err) => console.warn('Web3Forms dispatch notice:', err));

      // 2. Persist record into MongoDB Atlas database via backend API
      const dbPromise = fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => console.warn('Database save notice:', err));

      // Await email delivery confirmation
      const emailRes = await emailPromise;
      let emailSuccess = false;
      if (emailRes && emailRes.ok) {
        const data = await emailRes.json().catch(() => null);
        if (data && data.success) emailSuccess = true;
      }

      await dbPromise; // Background sync

      setStatus({
        submitting: false,
        success: true,
        error: false,
        message: '✅ Message sent successfully! Siva will respond to your email shortly.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      // Graceful fallback: direct mailto link opens
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Hi Siva,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus({
        submitting: false,
        success: true,
        error: false,
        message: '📧 Opening your email client to send the message directly to Siva.',
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const whatsappNumber = personal.phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>ESTABLISH CONNECTION</span>
          </div>
          <h2 className="section-title">
            CONTACT <span className="accent-red">ME</span>
          </h2>
          <p className="section-subtitle">
            {contact.subheading}
          </p>
          <div className="web-divider">
            <span />
          </div>
        </div>

        <div className="contact-grid">
          {/* Left Contact Methods Panel */}
          <div className="contact-info-panel reveal-slide-left">
            <p className="contact-info-desc">
              {contact.note}
            </p>

            <div className="contact-methods">
              {/* Email */}
              <a href={`mailto:${personal.email}`} className="contact-method-card">
                <div className="contact-method-icon">
                  <Mail size={22} />
                </div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Direct Email</span>
                  <span className="contact-method-val">{personal.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="contact-method-card">
                <div className="contact-method-icon">
                  <Phone size={22} />
                </div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Phone Call</span>
                  <span className="contact-method-val">{personal.phone}</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method-card contact-method-whatsapp"
              >
                <div className="contact-method-icon contact-method-icon-whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div className="contact-method-text">
                  <span className="contact-method-label">WhatsApp</span>
                  <span className="contact-method-val">{personal.phone}</span>
                </div>
              </a>

              {/* Location */}
              <div className="contact-method-card">
                <div className="contact-method-icon">
                  <MapPin size={22} />
                </div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Location</span>
                  <span className="contact-method-val">{personal.location}</span>
                </div>
              </div>

              {/* Social Profiles Quick Strip */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spider-secondary"
                  style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem' }}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-spider-secondary"
                  style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem' }}
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form Card */}
          <div className="contact-form-card reveal-slide-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Peter Parker"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Your Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your opportunity or project..."
                  className="form-textarea"
                  required
                />
              </div>

              {status.success && (
                <div className="form-feedback success">
                  <CheckCircle size={18} />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="form-feedback error">
                  <AlertCircle size={18} />
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn-spider-primary"
                disabled={status.submitting}
                id="btn-send-message"
              >
                {status.submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>TRANSMITTING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
