import { useState } from 'react'
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdSend } from 'react-icons/md'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import PageBanner from '../../components/PageBanner'
import Animate from '../../components/Animate'
import './Contact.css'

const infoCards = [
  { icon: <MdLocationOn />, title: 'Our Location',   lines: ['123 Skill Street, Hyderabad,', 'Telangana – 500001, India'],       color: '#03adfc' },
  { icon: <MdPhone />,      title: 'Phone Number',   lines: ['+91 98765 43210', '+91 91234 56789'],                               color: '#6c63ff' },
  { icon: <MdEmail />,      title: 'Email Address',  lines: ['info@paybharathskill.com', 'support@paybharathskill.com'],          color: '#ff6b6b' },
  { icon: <MdAccessTime />, title: 'Working Hours',  lines: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'],                  color: '#f7b731' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page">

      <PageBanner
        tag="GET IN TOUCH"
        title="Contact Us"
        desc="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        cards={infoCards}
      />

      {/* Form + Map */}
      <div className="contact-main">
        <div className="contact-inner">

          {/* Query Form */}
          <Animate type="fade-left" duration="dur-800" className="contact-form-wrap">
            <div className="form-header">
              <div className="section-tag">
                <span>SEND A MESSAGE</span>
                <span className="tag-line" />
              </div>
              <h2>Raise Your Query</h2>
              <p>Fill in the form below and our team will get back to you within 24 hours.</p>
            </div>

            {submitted && (
              <div className="form-success">
                ✓ Your message has been sent successfully! We'll get back to you soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject</option>
                    <option>Course Enquiry</option>
                    <option>Enrollment Support</option>
                    <option>Technical Issue</option>
                    <option>Fee & Payment</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={5} required />
              </div>
              <button type="submit" className="submit-btn">
                <MdSend /> Send Message
              </button>
            </form>
          </Animate>

          {/* Map + Social */}
          <Animate type="fade-right" duration="dur-800" delay="d-2" className="contact-map-wrap">
            <div className="form-header">
              <div className="section-tag">
                <span>FIND US</span>
                <span className="tag-line" />
              </div>
              <h2>Our Location</h2>
              <p>Visit us at our campus or connect with us on social media.</p>
            </div>

            <div className="map-frame">
              <iframe
                title="Pay Bharath Skill Education Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3305!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjAiTiA3OMKwMjknMTIuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="social-connect">
              <h4>Connect With Us</h4>
              <div className="contact-socials">
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              </div>
            </div>
          </Animate>

        </div>
      </div>
    </div>
  )
}
