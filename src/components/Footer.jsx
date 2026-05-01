import { NavLink } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-inner">

          {/* Brand */}
          <div className="footer-brand">
            <NavLink to="/" className="footer-logo">
              <img src={logoImg} alt="Education Web" className="footer-logo-img" />
            </NavLink>
            <p className="footer-tagline">
              Empowering learners with industry-ready skills. Join thousands of students building their future with us.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61589123604776" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://x.com/tutershub" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://www.instagram.com/tutershub/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/tuters-hub-b42b84406/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.youtube.com/@tutershub" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/courses">Courses</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li><NavLink to="/enroll">Enroll Now</NavLink></li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div className="footer-col">
            <h4>Popular Courses</h4>
            <ul>
              <li><NavLink to="/courses/full-stack-web-development-bootcamp">Web Development</NavLink></li>
              <li><NavLink to="/courses/data-science-python-pandas">Data Science</NavLink></li>
              <li><NavLink to="/courses/digital-marketing-seo-masterclass">Digital Marketing</NavLink></li>
              <li><NavLink to="/courses/complete-uiux-design-essentials">UI/UX Design</NavLink></li>
              <li><NavLink to="/courses/aws-cloud-practitioner-certification">Cloud Computing</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li><MdLocationOn /><span>Shop No: 12, MPP Tiruvuru Shopping Complex, Tiruvuru – 521235</span></li>
              <li><MdLocationOn /><span>MIG 151, A-zone, Sujatha Nagar, Pendurthi Mandal, Visakhapatnam – 530051</span></li>
              <li><MdPhone /><span>+91 92814 41011</span></li>
              <li><MdEmail /><span>Tutershub@gmail.com</span></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Education Web. All rights reserved.</p>
          <div className="footer-bottom-links">
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            <NavLink to="/terms-of-service">Terms of Service</NavLink>
            <NavLink to="/refund-policy">Refund Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
