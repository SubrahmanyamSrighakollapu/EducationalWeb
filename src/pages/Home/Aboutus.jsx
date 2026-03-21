import { NavLink } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import aboutImg from '../../assets/about_image.jpg'
import Animate from '../../components/Animate'
import './Aboutus.css'

const features = [
  'Skilled Instructors',
  'Online Classes',
  'International Certificate',
]

export default function Aboutus() {
  return (
    <section className="about">
      <div className="about-inner">
        <Animate type="fade-left" duration="dur-800" className="about-img-wrap">
          <img src={aboutImg} alt="About Pay Bharath Skill Education" />
        </Animate>
        <Animate type="fade-right" duration="dur-800" tag="div" className="about-content">
          <div className="section-tag">
            <span>ABOUT US</span>
            <span className="tag-line" />
          </div>
          <h2>Welcome to Pay Bharath Skill Education</h2>
          <p>We provide quality online education designed to help learners of all ages achieve their goals. Our courses combine expert instruction, practical exercises, and flexible learning to make education accessible anytime, anywhere.</p>
          <p>We are committed to delivering engaging and effective learning experiences that empower students to grow their knowledge, develop new skills, and succeed in their careers.</p>
          <div className="about-features">
            {features.map(f => (
              <div key={f} className="feature-item">
                <FiArrowRight className="feature-icon" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <NavLink to="/about" className="btn-primary">Read More</NavLink>
        </Animate>
      </div>
    </section>
  )
}
