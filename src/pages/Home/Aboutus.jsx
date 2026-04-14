import { NavLink } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiGlobe } from 'react-icons/fi'
import aboutImg from '../../assets/about_image.jpg'
import Animate from '../../components/Animate'
import './Aboutus.css'

const features = [
  'Skilled Instructors',
  'Online Classes',
  'International Certificate',
  'Flexible Learning',
  'Career Support',
  'Live Projects',
]

export default function Aboutus() {
  return (
    <section className="about">
      <div className="about-inner">
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
          <div className="about-content">
            <div className="about-tag"><FiGlobe /> ABOUT US</div>
            <h2>Welcome to Education Web<br /><span>Skill Education</span></h2>
            <p>We provide quality online education designed to help learners of all ages achieve their goals. Our courses combine expert instruction, practical exercises, and flexible learning to make education accessible anytime, anywhere.</p>
            <p>We are committed to delivering engaging and effective learning experiences that empower students to grow their knowledge, develop new skills, and succeed in their careers.</p>
            <div className="about-features-list">
              {features.map(f => (
                <div key={f} className="about-feature-item">
                  <FiCheckCircle /> {f}
                </div>
              ))}
            </div>
            <div className="about-cta-row">
              <NavLink to="/about" className="btn-about-primary">
                Read More <FiArrowRight />
              </NavLink>
              <NavLink to="/courses" className="btn-about-secondary">
                <FiArrowRight /> Explore Courses
              </NavLink>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  )
}