import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import instructor1 from '../../assets/about_image.jpg'
import instructor2 from '../../assets/instructor2.jpg'
import instructor3 from '../../assets/instructor3.jpg'
import instructor4 from '../../assets/instructor4.jpg'
import Animate from '../../components/Animate'
import './ExpertInstructors.css'

const instructors = [
  { img: instructor1, name: 'Dr.Mukesh Jha',   role: 'PHD in IT and Robotics' },
  { img: instructor2, name: 'Anita Joshi',      role: '25+ years of Experience in Marketing' },
  { img: instructor3, name: 'Rahul Bose',       role: 'Angel Investor and Coach' },
  { img: instructor4, name: 'Ridhima Patel',    role: 'Startup Founder and Coach' },
]

export default function ExpertInstructors() {
  return (
    <section className="instructors">
      <div className="instructors-inner">
        <Animate type="fade-up" duration="dur-600" className="section-header">
          <div className="section-tag-center">
            <span className="tag-line-h" />
            <span>INSTRUCTORS</span>
            <span className="tag-line-h" />
          </div>
          <h2>Expert Instructors</h2>
        </Animate>

        <div className="instructors-grid">
          {instructors.map((ins, i) => (
            <Animate key={i} type="fade-up" duration="dur-700" delay={`d-${i + 1}`}>
              <div className="instructor-card">
              <div className="instructor-img-wrap">
                <img src={ins.img} alt={ins.name} />
                <div className="instructor-socials">
                  <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" aria-label="Instagram"><FaInstagram /></a>
                </div>
              </div>
              <div className="instructor-info">
                <h4>{ins.name}</h4>
                <p>{ins.role}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
