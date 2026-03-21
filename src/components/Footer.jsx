import { NavLink } from 'react-router-dom'
import { BsGrid3X3Gap } from 'react-icons/bs'
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
              <BsGrid3X3Gap />
              <span>Pay Bharath Skill Education</span>
            </NavLink>
            <p className="footer-tagline">
              Empowering learners with industry-ready skills. Join thousands of students building their future with us.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
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
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Data Science</a></li>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">UI/UX Design</a></li>
              <li><a href="#">Cloud Computing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-list">
              <li><MdLocationOn /><span>123 Skill Street, Hyderabad, Telangana 500001</span></li>
              <li><MdPhone /><span>+91 98765 43210</span></li>
              <li><MdEmail /><span>info@paybharathskill.com</span></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-inner">
          <p>&copy; {new Date().getFullYear()} Pay Bharath Skill Education. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
