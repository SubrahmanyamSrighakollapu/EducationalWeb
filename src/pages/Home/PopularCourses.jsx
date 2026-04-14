import { Link } from 'react-router-dom'
import { FaStar, FaUserAlt, FaClock, FaUsers } from 'react-icons/fa'
import course1 from '../../assets/couroses1.jpg'
import course2 from '../../assets/couroses2.jpg'
import course3 from '../../assets/couroses3.png'
import Animate from '../../components/Animate'
import './PopularCourses.css'

const courses = [
  {
    slug: 'data-science-python-pandas',
    img: course1,
    price: '₹799',
    rating: 4,
    reviews: 2900,
    title: 'Data Science with Python & Pandas',
    instructor: 'Sarah Jenkins',
    hours: '38 Hrs',
    students: '9,100 Students',
  },
  {
    slug: 'full-stack-web-development-bootcamp',
    img: course2,
    price: '₹799',
    rating: 5,
    reviews: 3920,
    title: 'Full-Stack Web Development: The 2024 Bootcamp',
    instructor: 'Sarah Jenkins',
    hours: '40 Hrs',
    students: '12,540 Students',
  },
  {
    slug: 'complete-uiux-design-essentials',
    img: course3,
    price: '₹799',
    rating: 5,
    reviews: 4240,
    title: 'Complete UI/UX Design Essentials: Figma to Studio',
    instructor: 'Alex Rivera',
    hours: '28 Hrs',
    students: '11,320 Students',
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
                  <Link to={`/courses/${c.slug}`} className="btn-sm-primary">View Course</Link>
                  <Link to="/enroll" className="btn-sm-primary">Join Now</Link>
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
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}
