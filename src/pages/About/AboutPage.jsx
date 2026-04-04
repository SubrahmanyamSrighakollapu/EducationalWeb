import { NavLink } from 'react-router-dom'
import {
  FiArrowRight, FiCheckCircle, FiUsers, FiAward, FiGlobe, FiBookOpen,
  FiTarget, FiZap, FiHeart
} from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Animate from '../../components/Animate'
import aboutImg from '../../assets/about_image.jpg'
import instructor1 from '../../assets/testimonial1.jpg'
import instructor2 from '../../assets/instructor2.jpg'
import instructor3 from '../../assets/instructor3.jpg'
import instructor4 from '../../assets/instructor4.jpg'
import './About.css'

const features = [
  'Skilled Instructors',
  'Online Classes',
  'International Certificate',
  'Flexible Learning',
  'Career Support',
  'Live Projects',
]

const stats = [
  { number: '10,000+', label: 'Students Enrolled' },
  { number: '50+', label: 'Expert Instructors' },
  { number: '100+', label: 'Courses Available' },
  { number: '20+', label: 'Countries Reached' },
]

const values = [
  {
    icon: <FiTarget />,
    color: 'rgba(36, 89, 159, 1)',
    bg: '#e8f7ff',
    title: 'Our Mission',
    desc: 'To make quality education accessible to every learner, empowering them with industry-ready skills that drive real career growth.',
  },
  {
    icon: <FiZap />,
    color: '#6c63ff',
    bg: '#f0eeff',
    title: 'Our Vision',
    desc: 'To become the most trusted online learning platform in India, bridging the gap between education and employment.',
  },
  {
    icon: <FiHeart />,
    color: '#f7b731',
    bg: '#fff8e6',
    title: 'Our Values',
    desc: 'We believe in integrity, innovation, and inclusion — creating a learning environment where every student can thrive.',
  },
  {
    icon: <FiBookOpen />,
    color: '#26de81',
    bg: '#e6faf2',
    title: 'Quality Content',
    desc: 'Every course is crafted by industry experts and updated regularly to reflect the latest trends and technologies.',
  },
  {
    icon: <FiUsers />,
    color: '#ff6b6b',
    bg: '#fff0f0',
    title: 'Community First',
    desc: 'Join a thriving community of learners, mentors, and professionals who support each other every step of the way.',
  },
  {
    icon: <FiAward />,
    color: 'rgba(36, 89, 159, 1)',
    bg: '#e8f7ff',
    title: 'Certified Learning',
    desc: 'Earn internationally recognised certificates that validate your skills and open doors to global opportunities.',
  },
]

const instructors = [
  { img: instructor1, name: 'Dr. Mukesh Jha',   role: 'PHD in IT and Robotics',                tag: 'Technology' },
  { img: instructor2, name: 'Anita Joshi',       role: '25+ years in Marketing',                tag: 'Marketing' },
  { img: instructor3, name: 'Rahul Bose',        role: 'Angel Investor & Coach',                tag: 'Business' },
  { img: instructor4, name: 'Ridhima Patel',     role: 'Startup Founder & Coach',               tag: 'Entrepreneurship' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <Animate type="fade-left" duration="dur-800">
            <div className="about-img-block">
              <div className="about-img-dot" />
              <img src={aboutImg} alt="About Education Web" className="about-img-main" />
              <div className="about-img-badge">
                <strong>8+</strong>
                <span>Years of Excellence</span>
              </div>
            </div>
          </Animate>

          <Animate type="fade-right" duration="dur-800">
            <div>
              <div className="about-tag"><FiGlobe /> ABOUT US</div>
              <h1 className="about-hero-title">
                Empowering Learners to<br />
                <span>Achieve More</span>
              </h1>
              <p className="about-hero-desc">
                Education Web is a premier online learning platform dedicated to delivering
                industry-relevant education. Since 2015, we've helped thousands of students transform
                their careers through expert-led courses and hands-on learning.
              </p>
              <p className="about-hero-desc">
                Our flexible, accessible programs are designed for working professionals, students, and
                anyone eager to grow — anytime, anywhere.
              </p>
              <div className="about-features-list">
                {features.map(f => (
                  <div key={f} className="about-feature-item">
                    <FiCheckCircle /> {f}
                  </div>
                ))}
              </div>
              <div className="about-cta-row">
                <NavLink to="/courses" className="btn-about-primary">
                  Explore Courses <FiArrowRight />
                </NavLink>
                <NavLink to="/contact" className="btn-about-secondary">
                  <FiArrowRight /> Contact Us
                </NavLink>
              </div>
            </div>
          </Animate>
        </div>

        {/* Stats Bar */}
        <div className="about-stats">
          <div className="about-stats-inner">
            {stats.map((s, i) => (
              <Animate key={i} type="fade-up" duration="dur-600" delay={`d-${i + 1}`}>
                <div className="stat-item">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="about-mission">
        <div className="about-mission-inner">
          <Animate type="fade-up" duration="dur-600">
            <div className="about-section-header">
              <div className="about-section-tag"><FiAward /> OUR CORE VALUES</div>
              <h2>What Drives Us Forward</h2>
              <p>Built on a foundation of purpose, passion, and people — here's what makes Education Web different.</p>
            </div>
          </Animate>
          <div className="values-grid">
            {values.map((v, i) => (
              <Animate key={i} type="fade-up" duration="dur-700" delay={`d-${(i % 3) + 1}`}>
                <div className="value-card">
                  <div className="value-icon" style={{ background: v.bg, color: v.color }}>{v.icon}</div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instructors ── */}
      <section className="about-instructors">
        <div className="about-instructors-inner">
          <Animate type="fade-up" duration="dur-600">
            <div className="about-section-header">
              <div className="about-section-tag"><FiUsers /> MEET THE TEAM</div>
              <h2>Expert Instructors</h2>
              <p>Learn from certified professionals with decades of real-world industry experience.</p>
            </div>
          </Animate>
          <div className="instructors-grid-new">
            {instructors.map((ins, i) => (
              <Animate key={i} type="fade-up" duration="dur-700" delay={`d-${i + 1}`}>
                <div className="instructor-card-new">
                  <div className="instructor-img-wrap-new">
                    <img src={ins.img} alt={ins.name} />
                    <div className="instructor-overlay">
                      <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                      <a href="#" aria-label="Twitter"><FaTwitter /></a>
                      <a href="#" aria-label="Instagram"><FaInstagram /></a>
                      <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                  </div>
                  <div className="instructor-info-new">
                    <h4>{ins.name}</h4>
                    <p>{ins.role}</p>
                    <span className="instructor-tag">{ins.tag}</span>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
