import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import instructor1 from '../../assets/testimonial1.jpg'
import instructor2 from '../../assets/instructor2.jpg'
import instructor3 from '../../assets/instructor3.jpg'
import instructor4 from '../../assets/instructor4.jpg'
import Animate from '../../components/Animate'
import './ExpertInstructors.css'

const instructors = [
  { img: instructor1, name: 'Dr. Mukesh Jha',  role: 'PHD in IT and Robotics',       tag: 'Technology' },
  { img: instructor2, name: 'Anita Joshi',      role: '25+ years in Marketing',        tag: 'Marketing' },
  { img: instructor3, name: 'Rahul Bose',       role: 'Angel Investor & Coach',        tag: 'Business' },
  { img: instructor4, name: 'Ridhima Patel',    role: 'Startup Founder & Coach',       tag: 'Entrepreneurship' },
]

export default function ExpertInstructors() {
  return (
    <section className="instructors">
      <div className="instructors-inner">
        <Animate type="fade-up" duration="dur-600">
          <div className="instr-section-header">
            <div className="instr-section-tag"><FiUsers /> MEET THE TEAM</div>
            <h2>Expert Instructors</h2>
            <p>Learn from certified professionals with decades of real-world industry experience.</p>
          </div>
        </Animate>

        <div className="instructors-grid">
          {instructors.map((ins, i) => (
            <Animate key={i} type="fade-up" duration="dur-700" delay={`d-${i + 1}`}>
              <div className="instructor-card">
                <div className="instructor-img-wrap">
                  <img src={ins.img} alt={ins.name} />
                  <div className="instructor-overlay">
                    <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="#" aria-label="Twitter"><FaTwitter /></a>
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  </div>
                </div>
                <div className="instructor-info">
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
  )
}
