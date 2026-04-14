import { NavLink } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { FaUserGraduate, FaAward, FaStar } from 'react-icons/fa'
import aboutImg from '../../assets/about_image.jpg'
import Animate from '../../components/Animate'
import './Aboutus.css'

const features = [
  'Skilled Instructors',
  'Online Classes',
  'International Certificate',
  'Flexible Learning',
]

const stats = [
  { icon: <FaUserGraduate />, value: '10K+', label: 'Students' },
  { icon: <FaAward />,        value: '50+',  label: 'Courses' },
  { icon: <FaStar />,         value: '4.9',  label: 'Rating' },
]

export default function Aboutus() {
  return (
    <section className="about">
      <div className="about-inner">

        {/* ── Left: Image block ── */}
        <Animate type="fade-left" duration="dur-800" className="about-img-block">
          <div className="about-img-wrap">
            <img src={aboutImg} alt="About Pay Bharath Skill Education" />
            <div className="about-img-overlay" />
          </div>
          {/* Floating stats card */}
          <div className="about-stats-card">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Accent shape */}
          <div className="about-accent-dot" />
          <div className="about-accent-ring" />
        </Animate>

        {/* ── Right: Content ── */}
        <Animate type="fade-right" duration="dur-800" tag="div" className="about-content">
          <div className="section-tag">
            <span className="tag-pill">ABOUT US</span>
          </div>

          <h2>Welcome to <span className="highlight">Pay Bharath</span> Skill Education</h2>

          <p>We provide quality online education designed to help learners of all ages achieve their goals. Our courses combine expert instruction, practical exercises, and flexible learning to make education accessible anytime, anywhere.</p>

          <p>We are committed to delivering engaging and effective learning experiences that empower students to grow their knowledge, develop new skills, and succeed in their careers.</p>

          {/* Feature badges */}
          <div className="about-features">
            {features.map(f => (
              <div key={f} className="feature-badge">
                <FiCheckCircle className="badge-icon" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="about-cta">
            <NavLink to="/about" className="btn-about-primary">
              Read More <FiArrowRight />
            </NavLink>
            <NavLink to="/courses" className="btn-about-ghost">
              Explore Courses
            </NavLink>
          </div>
        </Animate>

      </div>
    </section>
  )
}
