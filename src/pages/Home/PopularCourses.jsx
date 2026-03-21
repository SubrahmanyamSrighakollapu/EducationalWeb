import { NavLink } from 'react-router-dom'
import { FaStar, FaUserAlt, FaClock, FaUsers } from 'react-icons/fa'
import course1 from '../../assets/couroses1.jpg'
import course2 from '../../assets/couroses2.jpg'
import course3 from '../../assets/couroses3.png'
import Animate from '../../components/Animate'
import './PopularCourses.css'

const courses = [
  {
    img: course1,
    price: 'INR 20,999/-',
    rating: 4,
    reviews: 187,
    title: 'Machine Learning & AI with Python Course',
    instructor: 'Mukesh',
    hours: '149 Hrs',
    students: '30 Students',
  },
  {
    img: course2,
    price: 'INR 10,999/-',
    rating: 4,
    reviews: 123,
    title: 'Entrepreneurship & Startup Development Certification',
    instructor: 'Anita Joshi',
    hours: '109 Hrs',
    students: '15 Students',
  },
  {
    img: course3,
    price: 'INR 15,999/',
    rating: 5,
    reviews: 287,
    title: 'Japanese Language & Culture Certification',
    instructor: 'Kenny',
    hours: '89 Hrs',
    students: '40 Students',
  },
]

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} className={i < count ? 'star filled' : 'star'} />
      ))}
    </div>
  )
}

export default function PopularCourses() {
  return (
    <section className="popular">
      <div className="popular-inner">
        <Animate type="fade-up" duration="dur-600" className="section-header">
          <div className="section-tag-center">
            <span className="tag-line-h" />
            <span>COURSES</span>
            <span className="tag-line-h" />
          </div>
          <h2>Popular Courses</h2>
        </Animate>

        <div className="courses-grid">
          {courses.map((c, i) => (
            <Animate key={i} type="fade-up" duration="dur-700" delay={`d-${i + 1}`}>
              <div className="course-card">
              <div className="course-img-wrap">
                <img src={c.img} alt={c.title} />
                <div className="course-overlay">
                  <NavLink to="/courses" className="btn-sm-primary">Read More</NavLink>
                  <NavLink to="/enroll" className="btn-sm-primary">Join Now</NavLink>
                </div>
              </div>
              <div className="course-body">
                <div className="course-price">{c.price}</div>
                <div className="course-rating">
                  <Stars count={c.rating} />
                  <span>({c.reviews})</span>
                </div>
                <h4 className="course-title">{c.title}</h4>
              </div>
              <div className="course-meta">
                <span><FaUserAlt /> {c.instructor}</span>
                <span><FaClock /> {c.hours}</span>
                <span><FaUsers /> {c.students}</span>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
